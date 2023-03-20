import moment from 'moment';
import ThreadMessage from './components/ThreadMessage';
import NewMessage from './components/NewMessage';
import styles from './page.module.scss';

interface Message {
  id: number;
  user_id?: number;
  threads_id?: number;
  content: string;
  creation_time: string;
  user: {
    user_name: string;
  };
}

interface ThreadInfo {
  id: number;
  content: string;
  project_id: number;
  project: {
    project_name: string;
  };
  user_id: number;
  user: {
    user_name: string;
  };
  creation_time: string;
  title: string;
}

export default async function ThreadPage() {
  const messages: Message[] = await fetch(
    `https://niidl.net/projects/-1/threads/-1/messages`
  ).then((data) => data.json());

  const threadInfo: ThreadInfo[] = await fetch(
    `https://niidl.net/projects/-1/threads/${-1}`
  ).then((data) => data.json());

  console.log(messages[0]);

  return (
    <div className={styles.threadBody}>
      <div>
        <h4>Back to Project</h4>
      </div>
      <h1>This project needs more quests and puzzles.</h1>
      <h3>General Discussion</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{threadInfo[1].user.user_name}</h2>
        <p>{moment(threadInfo[1].creation_time).fromNow()}</p>
      </div>
      <p>{threadInfo[1].content}</p>
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
      <NewMessage />
    </div>
  );
}
