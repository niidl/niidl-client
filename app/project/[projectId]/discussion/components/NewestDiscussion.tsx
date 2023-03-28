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
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export const NewestDiscussion = ({ projectDiscussion, projectId }: Props) => {
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

  function filterNewest(): Thread[] {
    const newest: Thread[] = projectDiscussion;
    newest.sort(
      (a, b) =>
        new Date(b.creation_time).getDate() -
        new Date(a.creation_time).getDate()
    );
    return newest;
  }

  return (
    <div className={styles.instancesContainer}>
      {filterNewest().map((thread: Thread, index: Key | null | undefined) => (
        <DiscussionInstance
          key={index}
          thread={thread}
          hasPin={false}
          userUpvotedThreads={userUpvotedThreads}
            setUserUpvotedThreads={setUserUpvotedThreads}
        />
      ))}
    </div>
  );
};
