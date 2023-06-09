'use client';
import styles from './Discussions.module.scss';
import NewDiscussionModal from './NewDiscussionModal';
import { useState, useEffect } from 'react';
import { GeneralDiscussions } from './GeneralDiscussions';
import { NewIdeasDiscussion } from './NewIdeasDiscussion';
import { NewestDiscussion } from './NewestDiscussion';
import { HottestDiscussion } from './HottestDiscussion';

export interface Thread {
  upvotes: number;
  id: number;
  content: string;
  project_id: number;
  user_id: string;
  creation_time: Date;
  title: string;
  thread_tag: string;
  upvotes_threads: number;
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

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export default function Discussions({
  projectDiscussion,
  projectId,
  projectName,
}: Props) {
  const [projectThreads, setProjectThreads] =
    useState<Thread[]>(projectDiscussion);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>('general-discussion');
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    fetchThreads();
  }, [reset]);

  async function fetchThreads(): Promise<void> {
    const response = await fetch(
      `${isProduction}/projects/${projectId}/threads`
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
            setReset={setReset}
          />
        );
      case 'new-ideas':
        return (
          <NewIdeasDiscussion
            projectDiscussion={projectThreads}
            projectId={projectId}
            setReset={setReset}
          />
        );
      case 'newest':
        return (
          <NewestDiscussion
            projectDiscussion={projectThreads}
            projectId={projectId}
            setReset={setReset}
          />
        );
      case 'hot-topics':
        return (
          <HottestDiscussion
            projectDiscussion={projectThreads}
            projectId={projectId}
            setReset={setReset}
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
    <div className={styles.discussionsBodyContainer}>
      <NewDiscussionModal
        showModal={showModal}
        projectId={projectId}
        projectName={projectName}
        setShowModal={setShowModal}
      />
      <div className={styles.discussionsContainer}>
        <div className={styles.discussionsTabs}>
          <div className={styles.discussionsTags}>
            <button
              className={`${
                currentTab === 'general-discussion'
                  ? styles.currentTab
                  : styles.defaultButton
              }`}
              type="button"
              value="general-discussion"
              onClick={handleClick}
            >
              General
            </button>
            <button
              className={`${
                currentTab === 'new-ideas'
                  ? styles.currentTab
                  : styles.defaultButton
              }`}
              type="button"
              value="new-ideas"
              onClick={handleClick}
            >
              New Ideas
            </button>
            <button
              className={`${
                currentTab === 'newest'
                  ? styles.currentTab
                  : styles.defaultButton
              }`}
              type="button"
              value="newest"
              onClick={handleClick}
            >
              Newest
            </button>
            <button
              className={`${
                currentTab === 'hot-topics'
                  ? styles.currentTab
                  : styles.defaultButton
              }`}
              type="button"
              value="hot-topics"
              onClick={handleClick}
            >
              Hot Topics
            </button>
          </div>
          <div className={styles.addThreadContainer}>
            <button
              className={styles.addThreadBtn}
              onClick={() => setShowModal(true)}
            >
              + Add Thread
            </button>
          </div>
        </div>
        {renderSwitch(currentTab)}
      </div>
    </div>
  );
}
