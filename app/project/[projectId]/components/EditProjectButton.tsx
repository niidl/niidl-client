'use client';
import { useState, useEffect } from 'react';
import EditProjectModal from './EditProjectModal';
import styles from './EditProjectButton.module.scss';

export interface SingleProj {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: string;
  project_image: string;
  project_type: string;
  tags: Array<{ tag_name: string; id: number }>;
  contributors: Array<{ username: string; contributor_id: number }>;
  threads: Array<{
    id: number;
    content: string;
    project_id: number;
    user_id: string;
    creation_time: Date;
    title: string;
    thread_tag: string;
    upvotes_threads: number;
    isPinned: boolean;
    user: {
      user_name: string;
    };
  }>;
  issues: Array<{
    issue_id: number;
    html_url: string;
    title: string;
    created_at: Date;
    issue_author: string;
    author_id: number;
  }>;
  directory: string;
}

interface Props {
  projectInfo: SingleProj;
}

export default function EditProjectButton({ projectInfo }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [projectCategories, setProjectCategories] = useState<Array<string>>([]);
  const [projectTypes, setProjectTypes] = useState<Array<string>>([]);

  const isProduction: string = process.env.PRODUCTION
    ? 'https://niidl.net'
    : 'http://localhost:8080';

  useEffect(() => {
    fetchCategories();
    fetchProjectTypes();
  }, []);

  async function fetchCategories(): Promise<void> {
    const response = await fetch(`${isProduction}/tagNames`);
    const data: Array<{ tag_name: '' }> = await response.json();
    const cleanedTags: Array<string> = data.map((single) => {
      return single.tag_name;
    });
    setProjectCategories(cleanedTags);
  }

  async function fetchProjectTypes(): Promise<void> {
    const response = await fetch(`${isProduction}/projectTypes`);
    const data: Array<{ type: '' }> = await response.json();
    const cleanedTypes: Array<string> = data.map((single) => {
      return single.type;
    });
    setProjectTypes(cleanedTypes);
  }

  return (
    <div>
      <button onClick={() => setShowModal(true)} className={styles.editProjectButton} >Edit Project</button>
      <EditProjectModal
        showModal={showModal}
        projectCategories={projectCategories}
        projectTypes={projectTypes}
        projectInfo={projectInfo}
        onClose={() => setShowModal(false)}
      ></EditProjectModal>
    </div>
  );
}
