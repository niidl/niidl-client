import Link from 'next/link';
import styles from './UserContributions.module.scss';
import moment from 'moment';

interface Props {
  message: {
    content: string,
    creation_time: string,
    thread: {
      title: string
    }
  }
}

export default function UserDiscussionContributionInstance({ message }: Props) {
  return (
    <div className={styles.userDiscussionContributionInstance}>
      <Link href={`#`}>
        <p className={styles.userDiscussionContributionInstanceContent}>
          {
            message.content.length < 80 
              ? message.content
              : `${message.content.slice(0, 100)}...`
          }
        </p>

        <p className={styles.userDiscussionContributionInstanceThreadTitle}>
          from <span>{`${message.thread.title}`}</span>
        </p>

        <p className={styles.userDiscussionContributionInstanceTimeReference}>
          {moment(message.creation_time).fromNow()}
        </p>
      </Link>
    </div>
  )
}