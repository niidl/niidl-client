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

export const HottestDiscussion = ({ projectDiscussion }: Props) => {
  function filterHottest(): Thread[] {
    const hotTopics: Thread[] = projectDiscussion;
    hotTopics.sort((a, b) => a.upvotes + b.upvotes);
    return hotTopics;
  }

  return (
    <div className={styles.instancesContainer}>
      {filterHottest().map((thread: Thread, index: Key | null | undefined) => (
        <DiscussionInstance key={index} thread={thread} hasPin={false}/>
      ))}
    </div>
  );
};
/*

*/
