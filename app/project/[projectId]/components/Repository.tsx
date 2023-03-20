'use client';
import { useRef, useState } from 'react';
import Directory from './Directory';

export default function Repository() {
  const [codeShowed, setCodeShowed] = useState<object | null>(null);
  const url = 'https://api.github.com/repos/MrBCendales/PokeDex/contents';
  const codeRef = useRef(null);

  const firstDirectory: object = {
    name: 'PokeDex',
    type: 'dir',
    url: url,
  };

  // setInitialFiles(firstDirectory);

  return (
    <div>
      <Directory files={firstDirectory} />;<div ref={codeRef}></div>
    </div>
  );
}
