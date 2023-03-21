import moment from 'moment';
import ThreadMessage from './components/ThreadMessage';
import NewMessage from './components/NewMessage';
import styles from './page.module.scss';
import Link from 'next/link';
import { use } from 'react';

interface Message {
  id: number;
  user_id?: string;
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
}

async function getMessages(_projectId: number, _threadId: number) {
  return await fetch(`https://niidl.net/projects/-1/threads/-1/messages`).then(
    (data) => data.json()
  );
}

async function getThread(_projectId: number, _threadId: number) {
  return await fetch(`https://niidl.net/projects/-1/threads/-1`).then((data) =>
    data.json()
  );
}

export default async function ThreadPage({ params }: any) {
  const messages: Message[] = use(
    getMessages(params.projectId, params.threadId)
  );
  const threadInfo: ThreadInfo = use(
    getThread(params.projectId, params.threadId)
  );
  return (
    <div className={styles.threadBody}>
      <div>
        <Link href={`/projects/${params.projectId}`}>
          <h4>Back to Project</h4>
        </Link>
      </div>
      <h1>{threadInfo.title}</h1>
      <h3>Discussion</h3>
      <div className={styles.userInfoContainer}>
        <h2>{threadInfo.user_id /*threadInfo.user.user_id*/}</h2>
        <p>{moment(threadInfo.creation_time).fromNow()}</p>
      </div>
      <p>{threadInfo.content}</p>
      <hr />
      {messages.map((message, index) => {
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
        thread_id={threadInfo.id}
        project_id={threadInfo.project_id}
      />
    </div>
  );
}
