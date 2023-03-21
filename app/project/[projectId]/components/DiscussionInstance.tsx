import Link from 'next/link';
import styles from './Discussions.module.scss';
import { Thread } from '@/app/project/[projectId]/components/Discussions';
import moment from 'moment';

interface Props {
  thread: Thread
}

export default function DiscussionInstance({ thread }: Props) {
  return (
    <div className={styles.discussionsMessageInstance}>
      <Link href={`project/${thread.project_id}/discussion/${thread.id}`}>
        <div className={styles.discussionMessageInstanceTitle}>
          {thread.title}
        </div>
      </Link>
          
      <div className={styles.discussionMessageInstanceTimeReference}>
        {moment(thread.creation_time).fromNow()}
      </div>
    </div>
  )
}
