'use client';

import styles from './Discussions.module.scss';
import DiscussionInstance from './DiscussionInstance';
import NewDiscussionModal from './NewDiscussionModal';
import { useState, Key } from 'react';

export interface Thread {
  id: number;
  content: string;
  project_id: number;
  user_id: string;
  creation_time: Date;
  title: string;
  thread_tag: string;
  upvotes: number;
  isPinned?: boolean;
  user?: {
    user_name: string;
  };
}

interface Props {
  projectDiscussion: Thread[];
  projectId: number;
  projectName: string;
}

export default function Discussions({
  projectDiscussion,
  projectId,
  projectName,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<[string, Thread[]]>([
    'general-discussion',
    filterGeneral(),
  ]);

  function filterGeneral(): Thread[] {
    return projectDiscussion.filter((thread: Thread) => {
      thread.thread_tag === 'general-discussion';
    });
  }

  function filterNewIdeas(): Thread[] {
    return projectDiscussion.filter((thread: Thread) => {
      thread.thread_tag === 'new-ideas';
    });
  }

  function filterHottest(): Thread[] {
    const hotTopics: Thread[] = projectDiscussion;
    hotTopics.sort((a, b) => a.upvotes - b.upvotes);
    return hotTopics;
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

  function handleClick(e: any): any {
    if (e.target.value === 'general-discussion') {
      setCurrentTab(['general-discussion', filterGeneral()]);
    }
    if (e.target.value === 'new-ideas') {
      setCurrentTab(['new-ideas', filterNewIdeas()]);
    }
    if (e.target.value === 'newest') {
      setCurrentTab(['newest', filterNewest()]);
    }
    if (e.target.value === 'hot-topics') {
      setCurrentTab(['hot-topics', filterHottest()]);
    }
  }

  return (
    <>
      <button
        className={styles.addThreadBtn}
        onClick={() => setShowModal(true)}
      >
        + Add Thread
      </button>
      <NewDiscussionModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        projectId={projectId}
        projectName={projectName}
      />
      <div className={styles.discussionsContainer}>
        <div className={styles.discussionsTabs}>
          <ul className={styles.ulContainer}>
            <li className={styles.liContainer} role='presentation'>
              <button
                className={`${
                  currentTab[0] === 'general-discussion'
                    ? styles.btnContainer
                    : styles.buttonContainer
                }`}
                type='button'
                value='general-discussion'
                onClick={handleClick}
              >
                General Discussions 📢
              </button>
            </li>
            <li className={styles.liContainer} role='presentation'>
              <button
                className={`${
                  currentTab[0] === 'new-ideas'
                    ? styles.btnContainer
                    : styles.buttonContainer
                }`}
                type='button'
                value='new-ideas'
                onClick={handleClick}
              >
                New Ideas 💡
              </button>
            </li>
            <li className={styles.liContainer} role='presentation'>
              <button
                className={`${
                  currentTab[0] === 'newest'
                    ? styles.btnContainer
                    : styles.buttonContainer
                }`}
                type='button'
                value='newest'
                onClick={handleClick}
              >
                Newest ⏫
              </button>
            </li>
            <li className={styles.liContainer} role='presentation'>
              <button
                className={`${
                  currentTab[0] === 'hot-topics'
                    ? styles.btnContainer
                    : styles.buttonContainer
                }`}
                type='button'
                value='hot-topics'
                onClick={handleClick}
              >
                Hot Topics 🔥
              </button>
            </li>
          </ul>
        </div>
        {projectDiscussion.map(
          (thread: Thread, index: Key | null | undefined) => (
            <DiscussionInstance key={index} thread={thread} />
          )
        )}
      </div>
    </>
  );
}
