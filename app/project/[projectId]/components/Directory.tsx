'use client';
import { useState } from 'react';

interface Props {
  files: any;
  setCurrContent: any;
  newUrlFile: string;
  userRepo: string;
}

const Directory = ({ files, setCurrContent, newUrlFile, userRepo }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFiles = async (url: string) => {
    const newUrl = newUrlFile + url.split(userRepo + '/')[1];

    const filesContent = await fetch(newUrl);
    const filesData = await filesContent.text();

    setCurrContent(filesData);
  };

  if (files.type === 'file') {
    return (
      <>
        <h3 onClick={() => handleFiles(files.download_url)}>{files.name}</h3>
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
        files.items &&
        files.items.map((file: object) => {
          return (
            <Directory
              files={file}
              setCurrContent={setCurrContent}
              newUrlFile={newUrlFile}
              userRepo={userRepo}
              key={files.name}
            />
          );
        })}
    </div>
  );
};

export default Directory;
