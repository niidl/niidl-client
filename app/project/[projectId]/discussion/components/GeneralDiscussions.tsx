'use client';
import styles from './Discussions.module.scss';
import { Key, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import DiscussionInstance from './DiscussionInstance';
import { Thread } from './Discussions';

interface Props {
  projectDiscussion: Thread[] | any;
  projectId?: number;
  projectName?: string;
}

export interface UpvotedThreads {
  thread_id: number;
  isUpvoted: boolean;
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export const GeneralDiscussions = ({ projectDiscussion, projectId }: Props) => {
  // const username = Cookies.get('userName');
  const username = 'amandajones10'
  const [userUpvotedThreads, setUserUpvotedThreads] =
    useState<UpvotedThreads[] | null>();

  useEffect(() => {
    getUserUpvotedThreads();
  }, []);

  async function getUserUpvotedThreads(): Promise<void> {
    const res = await fetch(
      `${isProduction}/projects/${projectId}/upvotes/${username}`
    );
    const data: UpvotedThreads[] = await res.json();
    setUserUpvotedThreads(data);
  }

  console.log(userUpvotedThreads)

  function filterGeneral(): Thread[] {
    return projectDiscussion.filter((thread: Thread) => {
      return thread.thread_tag === 'general-discussion';
    });
  }

  return (
    <div className={styles.instancesContainer}>
      {filterGeneral()
        .sort((a: Thread, b: Thread) => {
          if (a.isPinned && !b.isPinned) {
            return -1;
          }
          if (!a.isPinned && b.isPinned) {
            return 1;
          }
          return 0;
        })
        .map((thread: Thread, index: Key | null | undefined) => (
          <DiscussionInstance
            key={index}
            thread={thread}
            hasPin={true}
            userUpvotedThreads={userUpvotedThreads}
          />
        ))}
    </div>
  );
};
/*

            userUpvotedThreads={userUpvotedThreads}
*/
