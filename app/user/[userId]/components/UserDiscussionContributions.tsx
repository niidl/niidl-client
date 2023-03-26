import styles from './UserContributions.module.scss';
import UserDiscussionContributionInstance
  from './UserDiscussionContributionInstance';

interface UserMessage {
  content: string,
  creation_time: string,
  thread: {
    title: string
  }
}

interface Props {
  userMessages: Array<UserMessage>
}

export default function UserDiscussionContributions({ userMessages }: Props) {
  return (
    <div className={styles.userDiscussionContributionsContainer}>
      {
        userMessages.map(message => 
          <UserDiscussionContributionInstance
            message={message}
            key={message.creation_time}
          />  
        )
      }
    </div>
  )
}