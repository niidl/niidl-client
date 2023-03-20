'use client';
import { useState } from 'react';

interface Props {
  files: any;
  codeRef: any;
}

const handleFiles = async (url: string, codeRef: any) => {
  const filesJson = await fetch(url);
  const filesContent = await filesJson.json();

  codeRef.current = Buffer.from(filesContent.content, 'base64').toString(
    'utf8'
  );
};

const Directory = ({ files, codeRef }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (files.type === 'file') {
    return (
      <>
        <h3 onClick={() => handleFiles(files.url, codeRef)}>{files.name}</h3>
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
          return <Directory files={file} codeRef={codeRef} key={files.name} />;
        })}
    </div>
  );
};

export default Directory;
