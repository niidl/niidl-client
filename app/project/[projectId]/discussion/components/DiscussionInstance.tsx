'use client';
import Link from 'next/link';
import styles from './Discussions.module.scss';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Thread } from './Discussions';
import { UpvotedThreads } from './GeneralDiscussions';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiUpvote } from 'react-icons/bi'

interface Props {
  thread: Thread;
  hasPin: boolean;
  userUpvotedThreads?: UpvotedThreads[] | null;
}

export default function DiscussionInstance({
  thread,
  hasPin,
  userUpvotedThreads,
}: Props) {
  useEffect(() => {
    checkUpvote();
  }, []);

  const isProduction: string = process.env.PRODUCTION
    ? 'https://niidl.net'
    : 'http://localhost:8080';

  const username = Cookies.get('userName');
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);

  function checkUpvote() {
    const idToString: string = thread.id.toString();
    for (const threadKey in userUpvotedThreads) {
      if (threadKey === idToString) {
        setIsUpvoted(true);
      }
    }
  }

  function upvote() {
    axios.post(
      `${isProduction}/projects/${thread.project_id}/upvotes/${username}`
    );
    setIsUpvoted(true);
  }

  function downvote() {
    axios.delete(
      `${isProduction}/projects/${thread.project_id}/upvotes/${username}`
    );
    setIsUpvoted(false);
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
          <BiUpvote />
        </button>
      </div>
      <Link href={`project/${thread.project_id}/discussion/${thread.id}`}>
        <div className={styles.instanceMessageContainer}>
          <div className={styles.discussionMessageInstanceTitle}>
            <div>{thread.title}</div>
            {hasPin && <div>{thread.isPinned && '📌'}</div>}
          </div>
          <div className={styles.discussionMessageInstanceBottom}>
            {moment(thread.creation_time).fromNow()}
          </div>
        </div>
      </Link>
    </div>
  );
}
