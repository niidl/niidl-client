'use client';
import styles from './Discussions.module.scss';
import { Key, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import DiscussionInstance from './DiscussionInstance';
import { Thread } from './Discussions';
import { UpvotedThreads } from './GeneralDiscussions';

interface Props {
  projectDiscussion: Thread[] | any;
  projectId?: number;
  projectName?: string;
  setReset: any;
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export const NewIdeasDiscussion = ({
  projectDiscussion,
  projectId,
  setReset,
}: Props) => {
  const username = Cookies.get('userName');
  const [userUpvotedThreads, setUserUpvotedThreads] = useState<
    UpvotedThreads[] | null
  >();

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

  function filterNewIdeas(): Thread[] {
    return projectDiscussion.filter((thread: Thread) => {
      return thread.thread_tag === 'new-ideas';
    });
  }

  return (
    <div className={styles.instancesContainer}>
      {filterNewIdeas()
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
            upvotes={thread.upvotes_threads}
            hasPin={true}
            userUpvotedThreads={userUpvotedThreads}
            setUserUpvotedThreads={setUserUpvotedThreads}
            setReset={setReset}
          />
        ))}
    </div>
  );
};
/*

*/
