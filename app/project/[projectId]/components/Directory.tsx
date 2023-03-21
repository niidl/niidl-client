'use client';
import { useState } from 'react';

interface Props {
  files: any;
  setCurrContent: any;
}

const handleFiles = async (url: string, setCurrContent: any) => {
  const filesContent = await fetch(
    'https://cdn.jsdelivr.net/gh/MrBCendales/PokeDex@main/client/src/App.js'
  );
  const filesData = await filesContent.text();

  console.log(filesData, url);

  setCurrContent(filesData);
};

const Directory = ({ files, setCurrContent }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (files.type === 'file') {
    return (
      <>
        <h3 onClick={() => handleFiles(files.url, setCurrContent)}>
          {files.name}
        </h3>
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
          return (
            <Directory
              files={file}
              setCurrContent={setCurrContent}
              key={files.name}
            />
          );
        })}
    </div>
  );
};

export default Directory;
