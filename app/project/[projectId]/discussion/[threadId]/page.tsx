import Cookies from 'js-cookie';
import ThreadMessage from './components/ThreadMessage';
import NewMessage from './components/NewMessage';
import styles from './page.module.scss';
import Link from 'next/link';
import ThreadHead from './components/ThreadHead';
import { GetServerSideProps } from 'next';

interface Message {
  id: number;
  user_id?: number;
  threads_id?: number;
  content: string;
  creation_time: Date;
  user: {
    user_name: string;
  };
  upvotes: number;
}

export interface ThreadInfo {
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

export interface UpvotedMessages {
  thread_id: number;
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

async function getUsername() {
  const myGod = Cookies.get('userName')
  return myGod
}

// async function getUpvotes(
//   projectId: number,
//   threadId: number
// ): Promise<UpvotedMessages[]> {
//   const res = await fetch(
//     `${isProduction}/projects/${projectId}/threads/${threadId}/upvotes/${username}`,
//     { cache: 'no-store' }
//   );
//   return res.json();
// }

// async function getOwner(projectId: number): Promise<string> {
//   const res = await fetch(`${isProduction}/projects/${projectId}/owner/${username}`);
//   return res.json();
// }

export default async function ThreadPage({ params }: any) {
  const messages: Message[] = await getMessages(
    params.projectId,
    params.threadId
  );

  // const checkProjectOwner: string = await getOwner(params.projectId, );

  const threadInfo: ThreadInfo = await getThreadInfo(
    params.projectId,
    params.threadId
  );

  const getMy = await getUsername()
  console.log(getMy)

  // const allUpvotes: UpvotedMessages[] = await getUpvotes(
  //   params.projectId,
  //   params.threadId
  // );

  return (
    <div className={styles.threadBody}>
      <div>
        <Link href={`/project/${threadInfo.project_id}`}>
          <h4>Back to Project.</h4>
        </Link>
        <ThreadHead threadInfo={threadInfo} />
      </div>
      {Array.isArray(messages) &&
        messages.map((message, index) => {
          return (
            <div key={index}>
              <ThreadMessage
                content={message.content}
                creation_time={message.creation_time}
                username={message.user.user_name}
                projectOwner={threadInfo.user.user_name}
                projectId={threadInfo.project_id}
                threadId={threadInfo.id}
                messageId={message.id}
                upvotes={message.upvotes}
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

