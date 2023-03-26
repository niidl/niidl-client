'use client';
import styles from './Discussions.module.scss';
import { Key } from 'react';
import Cookies from 'js-cookie';
import { Thread } from './Discussions';
import DiscussionInstance from './DiscussionInstance';

interface Props {
  projectDiscussion: Thread[] | any;
  projectId?: number;
  projectName?: string;
}

export const HottestDiscussion = ({ projectDiscussion }: Props) => {
 // const username = Cookies.get('userName');
 // const userUpvotedTags: UpvotedThreads  = await getUserUpvotedThreads(params.projectId, username);

/*
async function getUserUpvotedThreads(projectId: number, username: string) Promise<UpvotedThreads> {
  const res = await fetch(`https://niidl.net/projects/${projectId}/upvotes/${username}`, {
    cache: 'no-store',
  });
  return res.json();
}
*/
/*
from above expect:
{
  "-1": true,
  "-2": false,
  "-56": true
}
*/
  function filterHottest(): Thread[] {
    const hotTopics: Thread[] = projectDiscussion;
    hotTopics.sort((a, b) => a.upvotes + b.upvotes);
    return hotTopics;
  }

  return (
    <div className={styles.instancesContainer}>
      {filterHottest().map((thread: Thread, index: Key | null | undefined) => (
        <DiscussionInstance key={index} thread={thread} hasPin={false}/>
      ))}
    </div>
  );
};
/*

  const username = Cookies.get('userName');
  const [userUpvotedThreads, setUserUpvotedThreads] = useState<
    UpvotedThreads | Promise<UpvotedThreads>
  >();

  useEffect(() => {
    setUserUpvotedThreads(getUserUpvotedThreads());
  }, []);

  async function getUserUpvotedThreads(): Promise<UpvotedThreads> {
    const res = await fetch(
      `https://niidl.net/projects/${projectId}/upvotes/${username}`
    );
    return res.json();
  }
*/
