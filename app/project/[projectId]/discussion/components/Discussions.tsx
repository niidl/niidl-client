'use client';
import styles from './Discussions.module.scss';
import NewDiscussionModal from './NewDiscussionModal';
import { useState, Key, useEffect } from 'react';
import { GeneralDiscussions } from './GeneralDiscussions';
import { NewIdeasDiscussion } from './NewIdeasDiscussion';
import { NewestDiscussion } from './NewestDiscussion';
import { HottestDiscussion } from './HottestDiscussion';

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
  const [projectThreads, setProjectThreads] =
    useState<Thread[]>(projectDiscussion);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>('general-discussion');
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    fetchThreads();
    refresh && setRefresh(false)
  }, []);

  async function fetchThreads(): Promise<void> {
    const response = await fetch(
      `https://niidl.net/projects/${projectId}/threads`
    );
    const data: Thread[] = await response.json();
    setProjectThreads(data);
  }

  function renderSwitch(component: string) {
    switch (component) {
      case 'general-discussion':
        return (
          <GeneralDiscussions
            projectDiscussion={projectThreads}
            projectId={projectId}
          />
        );
      case 'new-ideas':
        return (
          <NewIdeasDiscussion
            projectDiscussion={projectThreads}
            projectId={projectId}
          />
        );
      case 'newest':
        return (
          <NewestDiscussion
            projectDiscussion={projectThreads}
            projectId={projectId}
          />
        );
      case 'hot-topics':
        return (
          <HottestDiscussion
            projectDiscussion={projectThreads}
            projectId={projectId}
          />
        );
    }
  }
  function handleClick(e: any): any {
    if (e.target.value === 'general-discussion') {
      setCurrentTab('general-discussion');
    }
    if (e.target.value === 'new-ideas') {
      setCurrentTab('new-ideas');
    }
    if (e.target.value === 'newest') {
      setCurrentTab('newest');
    }
    if (e.target.value === 'hot-topics') {
      setCurrentTab('hot-topics');
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
        setRefresh={setRefresh}
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
                Newest 🆕
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
        {renderSwitch(currentTab)}
      </div>
    </>
  );
}
