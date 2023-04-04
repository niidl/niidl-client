'use client';
import styles from './Discussions.module.scss';
import { Key, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Thread } from './Discussions';
import DiscussionInstance from './DiscussionInstance';
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

export const HottestDiscussion = ({
  projectDiscussion,
  projectId,
  setReset,
}: Props) => {
  const username = Cookies.get('userName');
  const [userUpvotedThreads, setUserUpvotedThreads] = useState<
    UpvotedThreads[] | null
  >();
  const [filterHottestArray, setFilterHottestArray] = useState(filterHottest());

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

  function filterHottest(): Thread[] {
    const hotTopics: Thread[] = projectDiscussion;
    hotTopics.sort((a, b) => {
      return b.upvotes_threads - a.upvotes_threads;
    });
    return hotTopics;
  }

  return (
    <div className={styles.instancesContainer}>
      {filterHottestArray.map(
        (thread: Thread, index: Key | null | undefined) => (
          <DiscussionInstance
            key={index}
            thread={thread}
            upvotes={thread.upvotes_threads}
            setReset={setReset}
            hasPin={false}
            userUpvotedThreads={userUpvotedThreads}
            setUserUpvotedThreads={setUserUpvotedThreads}
          />
        )
      )}
    </div>
  );
};
