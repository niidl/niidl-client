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
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export const HottestDiscussion = ({ projectDiscussion, projectId }: Props) => {
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

  function filterHottest(): Thread[] {
    const hotTopics: Thread[] = projectDiscussion;
    hotTopics.sort((a, b) => a.upvotes + b.upvotes);
    return hotTopics;
  }

  return (
    <div className={styles.instancesContainer}>
      {filterHottest().map((thread: Thread, index: Key | null | undefined) => (
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
/*

  const username = Cookies.get('userName');
  const [userUpvotedThreads, setUserUpvotedThreads] = useState<
    UpvotedThreads | Promise<UpvotedThreads>
  >();

  useEffect(() => {
    setUserUpvotedThreads(getUserUpvotedThreads());
  }, []);

  async function getUserUpvotedThreads(): Promise<UpvotedThreads> {
    const res = await fetch(
      `https://niidl.net/projects/${projectId}/upvotes/${username}`
    );
    return res.json();
  }
*/
