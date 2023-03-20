import styles from './Discussions.module.scss';
import DiscussionInstance from './DiscussionInstance';

const threadMockData = [
  {
    id: 101,
    title: 'This project needs more quests and puzzles.',
    content: 'Here I\'m going to talk about how this app could have been a quest board, or even a puzzle platform.',
    userId: 101,
    creationTime: 'March 19'
  },
  {
    id: 102,
    title: 'Next.js Routing Question',
    content: 'Hey everyone, I have a question about routing in Next.js 13 that I have been stuck on for a while.',
    userId: 102,
    creationTime: 'March 12'
  },
  {
    id: 103,
    title: 'Kudos to the dev team!',
    content: 'I just wanted to say the dev team for niidl is so awesome! My life trajectory has been significantly better because of niidl.',
    userId: 103,
    creationTime: 'February 19'
  },
  {
    id: 104,
    title: 'Hungry, craving pancakes',
    content: 'Is anyone else hungry or is it just me?',
    userId: 104,
    creationTime: 'January 5'
  },
];

export interface Thread {
  id: number,
  title: string,
  content: string,
  userId: number,
  creationTime: string
}

interface Props {
  projectId: number
}

export default function Discussions({ projectId }: Props) {
  return (
    <div className={styles.discussionsContainer}>
      {
        threadMockData.map(thread => 
          <DiscussionInstance
            projectId={projectId} 
            thread={thread}
            key={thread.title}
          />
        )
      }
    </div>
  )
}