'use client';
import { useRef } from 'react';
import Directory from './Directory';

export default function Repository() {
  const url = 'https://api.github.com/repos/MrBCendales/PokeDex/contents';
  const codeRef = useRef(null);

  const firstDirectory: object = {
    name: 'PokeDex',
    type: 'dir',
    url: url,
  };

  return (
    <div>
      <Directory files={firstDirectory} codeRef={codeRef} />;
      <div ref={codeRef}></div>
    </div>
  );
}
