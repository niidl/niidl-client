'use client';
import moment from 'moment';
import ThreadMessage from './components/ThreadMessage';
import NewMessage from './components/NewMessage';
import styles from './page.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Message {
  id: number;
  user_id?: number;
  threads_id?: number;
  content: string;
  creation_time: Date;
  user: {
    user_name: string;
  };
}

interface ThreadInfo {
  id: number;
  content: string;
  project_id: number;
  user_id: string;
  creation_time: Date;
  title: string;
  user: {
    user_name: string;
  };
  thread_tag: string;
  upvotes: number;
  isPinned: boolean;
}

export default function ThreadPage({ params }: any) {
  const placeholderThread: ThreadInfo = {
    id: 0,
    content: '',
    project_id: 0,
    user_id: '',
    creation_time: new Date(),
    title: '',
    user: {
      user_name: '',
    },
    thread_tag: '',
    upvotes: 0,
    isPinned: false,
  };

  const [messages, setMessages] = useState<Message[] | Promise<any>>([
    {
      id: 0,
      user_id: 0,
      threads_id: 0,
      content: '',
      creation_time: new Date(),
      user: {
        user_name: '',
      },
    },
  ]);
  const [threadInformation, setThreadInformation] = useState<
    ThreadInfo | Promise<any>
  >(placeholderThread);

  async function getMessages(pId: number, tId: number): Promise<void> {
    const res = await fetch(
      `https://niidl.net/projects/${pId}/threads/${tId}/messages`
    ).then((data) => data.json());
    setMessages(res);
  }

  async function getThreadInfo(pId: number, tId: number): Promise<void> {
    const res = await fetch(
      `https://niidl.net/projects/${pId}/threads/${tId}`
    ).then((data) => data.json());
    setThreadInformation(res);
  }

  useEffect(() => {
    setMessages(getMessages(params.projectId, params.threadId));
    setThreadInformation(getThreadInfo(params.projectId, params.threadId));
  }, []);

  return (
    <div className={styles.threadBody}>
      <div>
        <Link href={`/project/${params.projectId}`}>
          <h4>Back to Project.</h4>
        </Link>
      </div>
      <h1>{threadInformation.title}</h1>
      <h3>Discussion</h3>
      <div className={styles.userInfoContainer}>
        <h3>{threadInformation.user.user_name}</h3>
        <p>{moment(threadInformation.creation_time).fromNow()}</p>
      </div>
      <p>{threadInformation.content}</p>
      <hr />
      {Array.isArray(messages) &&
        messages.map((message, index) => {
          return (
            <div key={index}>
              <ThreadMessage
                content={message.content}
                creation_time={message.creation_time}
                username={message.user.user_name}
              />
            </div>
          );
        })}
      <NewMessage
        thread_id={threadInformation.id}
        project_id={threadInformation.project_id}
      />
    </div>
  );
}
