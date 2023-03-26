import moment from 'moment';
import ThreadMessage from './components/ThreadMessage';
import NewMessage from './components/NewMessage';
import styles from './page.module.scss';
import Link from 'next/link';

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

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

async function getMessages(
  projectId: number,
  threadId: number
): Promise<Message[]> {
  const res = await fetch(
    `${isProduction}/projects/${projectId}/threads/${threadId}/messages`,
    { cache: 'no-store' }
  );
  return res.json();
}

async function getThreadInfo(
  projectId: number,
  threadId: number
): Promise<ThreadInfo> {
  const res = await fetch(
    `${isProduction}/projects/${projectId}/threads/${threadId}`,
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function ThreadPage({ params }: any) {
  const messages: Message[] = await getMessages(
    params.projectId,
    params.threadId
  );

  const threadInfo: ThreadInfo = await getThreadInfo(
    params.projectId,
    params.threadId
  );

  return (
    <div className={styles.threadBody}>
      <div>
        <Link href={`/project/${threadInfo.project_id}`}>
          <h4>Back to Project.</h4>
        </Link>
      </div>
      <h1>{threadInfo.title}</h1>
      <h3>Discussion</h3>
      <div className={styles.userInfoContainer}>
        <h3>{threadInfo.user.user_name}</h3>
        <p>{moment(threadInfo.creation_time).fromNow()}</p>
      </div>
      <p>{threadInfo.content}</p>
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
        thread_id={threadInfo.id}
        project_id={threadInfo.project_id}
      />
    </div>
  );
}
