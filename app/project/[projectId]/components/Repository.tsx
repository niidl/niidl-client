'use client';
import { useState } from 'react';
import Directory from './Directory';

export default function Repository(projectDirectory: string) {
  const url = 'https://api.github.com/repos/MrBCendales/PokeDex/contents';
  const [currContent, setCurrContent] = useState('');

  const firstDirectory: object = {
    name: 'PokeDex',
    type: 'dir',
    url: url,
  };

  return (
    <div>
      <Directory files={firstDirectory} setCurrContent={setCurrContent} />;
      <div>{currContent}</div>
    </div>
  );
}
