'use client';
import Link from 'next/link';
import styles from './Discussions.module.scss';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Thread } from './Discussions';
import { UpvotedThreads } from './GeneralDiscussions';
import axios from 'axios';
import Cookies from 'js-cookie';

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
      `https://niidl.net/projects/${thread.project_id}/upvotes/${username}`
    );
    setIsUpvoted(true);
  }

  function downvote() {
    axios.delete(
      `https://niidl.net/projects/${thread.project_id}/upvotes/${username}`
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
          ⏫
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
