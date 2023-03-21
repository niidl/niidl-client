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
}

export default async function ThreadPage({ params }: any) {
  const messages: Message[] = await fetch(
    `https://niidl.net/projects/${params.projectId}/threads/${params.threadId}/messages`
  ).then((data) => data.json());

  const threadInfo: ThreadInfo = await fetch(
    `https://niidl.net/projects/${params.projectId}/threads/${params.threadId}`
  ).then((data) => data.json());

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
        <h2>{threadInfo.user_id}</h2>
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
