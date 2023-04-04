'use client';
import Link from 'next/link';
import styles from './Discussions.module.scss';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Thread } from './Discussions';
import { UpvotedThreads } from './GeneralDiscussions';
import axios from 'axios';
import Cookies from 'js-cookie';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';
import { AiOutlinePushpin } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

interface Props {
  thread: Thread;
  hasPin: boolean;
  userUpvotedThreads?: UpvotedThreads[] | null;
  setUserUpvotedThreads: any;
}

export default function DiscussionInstance({
  thread,
  hasPin,
  userUpvotedThreads,
  setUserUpvotedThreads,
}: Props) {
  const isProduction: string = process.env.PRODUCTION
    ? 'https://niidl.net'
    : 'http://localhost:8080';

  const username = Cookies.get('userName');
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    checkUpvote();
  }, [userUpvotedThreads]);

  function checkUpvote() {
    if (userUpvotedThreads) {
      for (const threadKey of userUpvotedThreads) {
        if (threadKey.thread_id === thread.id) {
          setIsUpvoted(true);
        }
      }
    }
  }

  async function upvote() {
    await axios
      .post(
        `${isProduction}/projects/${thread.project_id}/threads/${thread.id}/upvotes/${username}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setIsUpvoted(true);
        const newUpvotes: any = userUpvotedThreads;
        newUpvotes.push({
          user_name: username,
          thread_id: thread.id,
        });
        setUserUpvotedThreads(newUpvotes);
        router.refresh();
      });
  }

  async function downvote() {
    await axios
      .delete(
        `${isProduction}/projects/${thread.project_id}/threads/${thread.id}/upvotes/${username}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setIsUpvoted(false);
        if (userUpvotedThreads) {
          const newUpvotes: UpvotedThreads[] = userUpvotedThreads.filter(
            (thr) => thr.thread_id !== thread.id
          );
          setUserUpvotedThreads(newUpvotes);
        }
        router.refresh();
      });
  }

  function handleClick() {
    isUpvoted ? downvote() : upvote();
  }

  return (
    <div className={styles.discussionsMessageInstance}>
      <div className={styles.upvoteContainer}>
        <button
          className={`${
            isUpvoted ? styles.upvoteButtonAfter : styles.upvoteButton
          }`}
          onClick={handleClick}
        >
          {<HiOutlineArrowCircleUp />}
        </button>
        <p>{thread.upvotes}</p>
      </div>
      <Link
        href={`project/${thread.project_id}/discussion/${thread.id}`}
        className={styles.instanceMessageContainer}
      >
        <div className={styles.discussionInstanceContent}>
          <div className={styles.discussionInstanceTitle}>{thread.title}</div>
          <div className={styles.discussionInstanceUser}>
            by {thread.user?.user_name}
          </div>
        </div>

        <div className={styles.discussionMessageInstanceRight}>
          {hasPin && (
            <div className={styles.pinContainer}>
              {thread.isPinned && <AiOutlinePushpin />}
            </div>
          )}
          <div className={styles.timeContainer}>
            {moment(thread.creation_time).fromNow()}
          </div>
        </div>
      </Link>
    </div>
  );
}
