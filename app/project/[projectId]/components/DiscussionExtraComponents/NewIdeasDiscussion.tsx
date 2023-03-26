'use client';
import styles from '../Discussions.module.scss';
import DiscussionInstance from '../DiscussionInstance';
import { Thread } from '../Discussions';
import { Key } from 'react';

interface Props {
  projectDiscussion: Thread[];
  projectId?: number;
  projectName?: string;
}

export const NewIdeasDiscussion = ({ projectDiscussion }: Props) => {
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
