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

export const NewestDiscussion = ({ projectDiscussion }: Props) => {
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
