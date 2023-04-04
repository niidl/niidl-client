import styles from './UserContributions.module.scss';
import UserDiscussionContributionInstance from './UserDiscussionContributionInstance';

interface UserMessage {
  content: string;
  creation_time: string;
  thread: {
    title: string;
    id: number;
    project_id: number;
  };
}

interface Props {
  userMessages: Array<UserMessage>;
  user_name: string;
}

export default function UserDiscussionContributions({
  userMessages,
  user_name,
}: Props) {
  return (
    <div className={styles.userDiscussionContributionsContainer}>
      {userMessages.map((message) => (
        <UserDiscussionContributionInstance
          message={message}
          key={message.creation_time}
        />
      ))}
    </div>
  );
}
