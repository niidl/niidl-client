'use client';
import React, { useState, useMemo } from 'react';
import styles from './Repository.module.scss';
import Directory from './Directory';

interface Props {
  projectDirectory: string;
}

export default function Repository({ projectDirectory }: Props) {
  const [currContent, setCurrContent] = useState('');

  const userRepo = projectDirectory.split('repos/')[1].split('/content')[0];
  const newUrlFile = 'https://cdn.jsdelivr.net/gh/' + userRepo + '@';
  const nameRepo = userRepo.split('/')[1];

  const firstDirectory: object = {
    name: nameRepo,
    type: 'dir',
    url: projectDirectory,
  };

  return (
    <div className={styles.projectRepositoryContainer}>
      <Directory
        files={firstDirectory}
        setCurrContent={setCurrContent}
        newUrlFile={newUrlFile}
        userRepo={userRepo}
      />
      <div>
        <pre>{currContent}</pre>
      </div>
    </div>
  );
}
