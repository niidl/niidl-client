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

export const NewestDiscussion = ({
  projectDiscussion,
  projectId,
  setReset,
}: Props) => {
  const username = Cookies.get('userName');
  const [userUpvotedThreads, setUserUpvotedThreads] = useState<
    UpvotedThreads[] | null
  >();
  const [newestArray, setNewestArray] = useState(filterNewest());

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

  function filterNewest(): Thread[] {
    const newest: Thread[] = projectDiscussion;
    newest.sort((a, b) => {
      return (
        new Date(b.creation_time).getTime() -
        new Date(a.creation_time).getTime()
      );
    });
    return newest;
  }

  return (
    <div className={styles.instancesContainer}>
      {newestArray.map((thread: Thread, index: Key | null | undefined) => (
        <DiscussionInstance
          key={index}
          thread={thread}
          upvotes={thread.upvotes_threads}
          hasPin={false}
          userUpvotedThreads={userUpvotedThreads}
          setUserUpvotedThreads={setUserUpvotedThreads}
          setReset={setReset}
        />
      ))}
    </div>
  );
};
