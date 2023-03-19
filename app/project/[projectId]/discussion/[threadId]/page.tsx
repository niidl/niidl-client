import moment from 'moment';
import Message from './components/Message';
import NewMessage from './components/NewMessage';
import styles from './page.module.scss';

/*id	-3
content	"one more message about project"
user_id	-5
threads_id	-1
creation_time	""
user	
user_name	"robertwillson"*/
interface Message {
  id: number;
  user_id?: number;
  threads_id?: number;
  content: string;
  creation_time: string;
  user: {
    user_name: string;
  };
}

const messages: Message[] = [
  {
    id: -3,
    content: 'one more message about project',
    creation_time: '2023-03-19T02:57:50.304Z',
    user: {
      user_name: 'Adrian',
    },
  },
  {
    id: -3,
    content:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    creation_time: '2023-03-19T02:57:50.304Z',
    user: {
      user_name: 'Carlo',
    },
  },
  {
    id: -3,
    content:
      'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
    creation_time: '2023-03-19T02:57:50.304Z',
    user: {
      user_name: 'Johny',
    },
  },
];

const time: string = '2023-03-19T02:57:50.304Z';

export default function ThreadPage() {
  return (
    <div className={styles.threadBody}>
      <h1>This project needs more quests and puzzles.</h1>
      <h3>General Discussion</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Username</h2>
        <p>{moment(time).fromNow()}</p>
      </div>
      <p>
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
        enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
        exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit
        nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor
        minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure
      </p>
      <hr />
      {messages.map((message: any): JSX.Element => {
        return (
          <div>
            <Message
              key={message.id}
              content={message.content}
              creation_time={message.creation_time}
              username={message.user.user_name}
            />
            <hr />
          </div>
        );
      })}
      <NewMessage />
    </div>
  );
}
