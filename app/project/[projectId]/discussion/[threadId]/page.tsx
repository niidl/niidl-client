import moment from 'moment';
import Message from './components/ThreadMessage';
import NewMessage from './components/NewMessage';
import styles from './page.module.scss';
import axios from 'axios';

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
/*
{
    "id": -4,
    "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "user_id": -2,
    "thread_id": -1,
    "creation_time": "2023-03-19T14:06:40.756Z",
    "user": {
      "user_name": "maryjohnson10"
    }
  },
*/
/*
 {
    "id": -1,
    "content": "Once upon a time...",
    "project_id": -1,
    "project": {
      "project_name": "hikeable"
    },
    "user_id": -1,
    "user": {
      "user_name": "johnsmith2"
    },
    "creation_time": "2023-03-19T14:06:40.726Z",
    "title": "Title1"
  },
*/

interface Props {
  threadId?: number;
}

interface ThreadInfo {
  id: number;
  content: string;
  project_id: number;
  project: {
    project_name: string;
  };
  user_id: number;
  user: {
    user_name: string;
  };
  creation_time: string;
  title: string;
}

export default async function ThreadPage({}: Props): Promise<JSX.Element> {

  const threadInfo: ThreadInfo = await axios.get(
    `https://niidl.net/threads/${-1}`
  );
  console.log(threadInfo);

  const messages: Message = await axios.get(`https://niidl.net/messages/${-1}`);

  return (
    <div className={styles.threadBody}>
      <div>
        <h4>Back to Project</h4>
      </div>
      <h1>This project needs more quests and puzzles.</h1>
      <h3>General Discussion</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Username</h2>
        <p>{moment(threadInfo.creation_time).fromNow()}</p>
      </div>
      <p>
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
        enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
        exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit
        nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor
        minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure
      </p>
      <hr />
      {Array.isArray(messages) &&
        messages.map((message: Message): JSX.Element => {
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
