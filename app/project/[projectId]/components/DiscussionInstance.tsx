import Link from 'next/link';
import styles from './Discussions.module.scss';
import { Thread } from '@/app/project/[projectId]/components/Discussions';
import moment from 'moment';

interface Props {
  thread: Thread;
  hasPin: boolean;
}

export default function DiscussionInstance({ thread, hasPin }: Props) {
  return (
    <div className={styles.discussionsMessageInstance}>
      <div className={styles.upvoteContainer}>
        <button className={styles.upvoteButton}>⏫</button>
      </div>
      <Link href={`project/${thread.project_id}/discussion/${thread.id}`}>
        <div className={styles.instanceMessageContainer}>
          <div className={styles.discussionMessageInstanceTitle}>
            <div>{thread.title}</div>
            {hasPin && <div>{thread.isPinned && '📌'}</div>}
          </div>
          <div className={styles.discussionMessageInstanceBottom}>
            {moment(thread.creation_time).fromNow()}
          </div>
        </div>
      </Link>
    </div>
  );
}
