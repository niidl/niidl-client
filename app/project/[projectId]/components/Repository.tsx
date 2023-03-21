'use client';
import { useState } from 'react';
import Directory from './Directory';

interface Props {
  projectDirectory: string;
}

export default function Repository({ projectDirectory }: Props) {
  const [currContent, setCurrContent] = useState('');
  const url = 'https://api.github.com/repos/MrBCendales/PokeDex/contents';
  const userRepo = url.split('repos/')[1].split('/content')[0];
  const newUrlFile = 'https://cdn.jsdelivr.net/gh/' + userRepo + '@';

  const firstDirectory: object = {
    name: 'PokeDex',
    type: 'dir',
    url: url,
  };

  return (
    <div>
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
