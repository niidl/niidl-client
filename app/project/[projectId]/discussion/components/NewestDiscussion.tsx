'use client';
import styles from './Discussions.module.scss';
import { Key } from 'react';
import Cookies from 'js-cookie';
import DiscussionInstance from './DiscussionInstance';
import { Thread } from './Discussions';

interface Props {
  projectDiscussion: Thread[] | any;
  projectId?: number;
  projectName?: string;
}

export const NewestDiscussion = ({ projectDiscussion }: Props) => {
 // const username = Cookies.get('userName');
 // const userUpvotedTags: UpvotedThreads  = await getUserUpvotedThreads(params.projectId, username);

/*
async function getUserUpvotedThreads(projectId: number, username: string) Promise<UpvotedThreads> {
  const res = await fetch(`https://niidl.net/projects/${projectId}/upvotes/${username}`, {
    cache: 'no-store',
  });
  return res.json();
}
*/
/*
from above expect:
{
  "-1": true,
  "-2": false,
  "-56": true
}
*/
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
        <DiscussionInstance key={index} thread={thread} hasPin={false}/>
      ))}
    </div>
  );
};
/*

*/
