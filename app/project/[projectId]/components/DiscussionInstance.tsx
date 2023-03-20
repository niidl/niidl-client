import Link from 'next/link';
import styles from './Discussions.module.scss';
import { Thread } from '@/app/project/[projectId]/components/Discussions';

interface Props {
  projectId: number,
  thread: Thread,
}

export default function DiscussionInstance({ projectId, thread }: Props) {
  return (
    <div className={styles.discussionsMessageInstance}>
      <Link href={`project/${projectId}/discussion/${thread.id}`}>
        <div className={styles.discussionMessageInstanceTitle}>
          {thread.title}
        </div>
      </Link>
          
      <div className={styles.discussionMessageInstanceTimeReference}>
        {thread.creationTime}
      </div>
    </div>
  )
}