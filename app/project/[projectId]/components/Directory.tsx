'use client';
import React, { useState, useMemo } from 'react';

interface Props {
  files: any;
  setCurrContent: any;
  newUrlFile: string;
  userRepo: string;
}

const Directory = ({ files, setCurrContent, newUrlFile, userRepo }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isProduction: string = process.env.PRODUCTION
    ? 'https://niidl.net'
    : 'http://localhost:8080';

  const handleFiles = async (url: string) => {
    const fileInfo = {
      newUrlFile,
      url,
      userRepo,
    };

    const filesJson = await fetch(isProduction + '/repository/file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fileInfo),
    });

    const filesData = await filesJson.text();

    setCurrContent(filesData);
  };

  const getData = async () => {
    const folderJson = await fetch(`${isProduction}/repository/folder`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: files.url }),
    });
    const folderData = await folderJson.json();

    files.items = folderData;
  };

  if (files.type !== 'file') {
    getData();
  }

  return useMemo(
    () =>
      files.type !== 'file' ? (
        <div>
          <h2 onClick={() => setIsExpanded(!isExpanded)}>{files.name}</h2>
          {isExpanded &&
            files.items &&
            files.items.map((file: any) => {
              return (
                <Directory
                  files={file}
                  setCurrContent={setCurrContent}
                  newUrlFile={newUrlFile}
                  userRepo={userRepo}
                  key={file.name}
                />
              );
            })}
        </div>
      ) : (
        <>
          <h3 onClick={() => handleFiles(files.download_url)}>{files.name}</h3>
          <br />
        </>
      ),
    [isExpanded]
  );
};

export default Directory;
