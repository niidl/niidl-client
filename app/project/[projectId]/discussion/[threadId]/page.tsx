import ThreadMessage from './components/ThreadMessage';
import NewMessage from './components/NewMessage';
import styles from './page.module.scss';
import Link from 'next/link';
import ThreadHead from './components/ThreadHead';
import LoginToMessage from './components/LoginToMessage';
import { cookies } from 'next/headers';
import { UpvotedThreads } from '../components/GeneralDiscussions';
import { HiOutlineArrowLongLeft } from 'react-icons/hi2';

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
  user_name: string;
  message_id: number;
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

async function getThreadsUpvotes(
  projectId: number,
  username: string
): Promise<UpvotedThreads[]> {
  const res = await fetch(
    `${isProduction}/projects/${projectId}/upvotes/${username}`,
    { cache: 'no-store' }
  );
  return res.json();
}

async function getMessagesUpvotes(
  projectId: number,
  threadId: number,
  username: string
): Promise<UpvotedMessages[]> {
  const res = await fetch(
    `${isProduction}/projects/${projectId}/threads/${threadId}/upvotes/${username}`,
    { cache: 'no-store' }
  );
  return res.json();
}

async function getOwner(projectId: number, username: string): Promise<boolean> {
  const res = await fetch(
    `${isProduction}/projects/${projectId}/owner/${username}`
  );
  return res.json();
}

export default async function ThreadPage({ params }: any) {
  const username: any = cookies().get('userName');
  const messages: Message[] = await getMessages(
    params.projectId,
    params.threadId
  );

  const threadInfo: ThreadInfo = await getThreadInfo(
    params.projectId,
    params.threadId
  );

  const isOwner: boolean = username
    ? await getOwner(params.projectId, username.value)
    : false;

  const allMessagesUpvotes: UpvotedMessages[] = username
    ? await getMessagesUpvotes(
        params.projectId,
        params.threadId,
        username.value
      )
    : [];

  const allThreadsUpvotes: UpvotedThreads[] = username
    ? await getThreadsUpvotes(params.projectId, username.value)
    : [];

  return (
    <div className={styles.threadBody}>
      <div>
        <div className={styles.backContainer}>
          <Link href={`/project/${threadInfo.project_id}`}>
            <h4>
              <HiOutlineArrowLongLeft />
              Back to Project.
            </h4>
          </Link>
        </div>

        <ThreadHead
          threadInfo={threadInfo}
          isOwner={isOwner}
          allThreadsUpvotes={allThreadsUpvotes}
        />
      </div>
      {Array.isArray(messages) &&
        messages
          .sort(
            (a, b) =>
              new Date(a.creation_time).getDate() -
              new Date(b.creation_time).getDate()
          )
          .map((message, index) => {
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
                  allUpvotes={allMessagesUpvotes}
                  isOwner={isOwner}
                />
              </div>
            );
          })}
      {username ? (
        <NewMessage
          thread_id={threadInfo.id}
          project_id={threadInfo.project_id}
        />
      ) : (
        <LoginToMessage />
      )}
    </div>
  );
}
