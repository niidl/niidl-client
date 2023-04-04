import Link from 'next/link';
import styles from './UserContributions.module.scss';
import moment from 'moment';

interface Props {
  message: {
    content: string,
    creation_time: string,
    thread: {
      id: number,
      project_id: number,
      title: string
    }
  }
}

export default function UserDiscussionContributionInstance({ message }: Props) {
  return (
    <Link 
      href={`/project/${message.thread.project_id}/discussion/${message.thread.id}`}
    >
      <div className={styles.userDiscussionContributionInstance}>
        <div>
          <div className={styles.userDiscussionContributionInstanceContent}>
            {
              message.content.length < 80 
                ? message.content
                : `${message.content.slice(0, 100)}...`
            }
          </div>

          <div className={styles.userDiscussionContributionInstanceThreadTitle}>
            from <span>{`${message.thread.title}`}</span>
          </div>
        </div>

        <p className={styles.userDiscussionContributionInstanceTimeReference}>
          {moment(message.creation_time).fromNow()}
        </p>
      </div>
    </Link>
  )
}