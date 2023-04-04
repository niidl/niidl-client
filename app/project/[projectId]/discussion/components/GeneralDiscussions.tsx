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
  setReset: any;
}

export interface UpvotedThreads {
  thread_id: number;
  isUpvoted: boolean;
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export const GeneralDiscussions = ({
  projectDiscussion,
  projectId,
  setReset,
}: Props) => {
  const username = Cookies.get('userName');
  const [userUpvotedThreads, setUserUpvotedThreads] = useState<
    UpvotedThreads[] | null
  >();
  const [filteredArray, setFilteredArray] = useState<any>(
    filterGeneral().sort((a: Thread, b: Thread) => {
      if (a.isPinned && !b.isPinned) {
        return -1;
      }
      if (!a.isPinned && b.isPinned) {
        return 1;
      }
      return 0;
    })
  );

  console.log(filteredArray);

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

  function filterGeneral(): Thread[] {
    return projectDiscussion.filter((thread: Thread) => {
      return thread.thread_tag === 'general-discussion';
    });
  }

  return (
    <div className={styles.instancesContainer}>
      {filteredArray.map((thread: Thread, index: Key | null | undefined) => {
        return (
          <DiscussionInstance
            key={index}
            thread={thread}
            upvotes={thread.upvotes_threads}
            hasPin={true}
            userUpvotedThreads={userUpvotedThreads}
            setUserUpvotedThreads={setUserUpvotedThreads}
            setReset={setReset}
          />
        );
      })}
    </div>
  );
};
