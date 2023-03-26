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

export const NewIdeasDiscussion = ({ projectDiscussion }: Props) => {
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
        <DiscussionInstance key={index} thread={thread} hasPin={true}/>
        ))}
    </div>
  );
};
/*

*/
