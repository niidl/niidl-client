'use client';
import { useState } from 'react';

interface Props {
  files: any;
}

const handleFiles = (url: string) => {};

const Directory = ({ files }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (files.type === 'file') {
    return (
      <>
        <h3 onClick={() => handleFiles(files.url)}>{files.name}</h3>
        <br />
      </>
    );
  }

  (async () => {
    const filesJson = await fetch(files.url);
    const filesData = await filesJson.json();

    files.items = filesData;
  })();

  return (
    <div>
      <h2 onClick={() => setIsExpanded(!isExpanded)}>{files.name}</h2>
      {isExpanded &&
        files.items.map((file: object) => {
          <Directory files={file} />;
        })}
    </div>
  );
};

export default Directory;
