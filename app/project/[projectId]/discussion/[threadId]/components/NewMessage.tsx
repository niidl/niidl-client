'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../page.module.scss';

interface MessageObject {
  content: string;
  thread_id: number;
}

interface Props {
  thread_id: number;
  project_id: number;
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export default function NewMessage({ thread_id, project_id }: Props) {
  const router = useRouter();

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const textValue: string = e.target.textarea.value;
    e.target.textarea.value = '';

    const newMessageObject: MessageObject = {
      content: textValue,
      thread_id: thread_id,
    };

    await axios
      .post(
        `${isProduction}/projects/${project_id}/threads/${thread_id}/newMessage`,
        newMessageObject,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        router.refresh();
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.newMessageContainer}>
        <textarea
          id="message"
          rows={4}
          name="textarea"
          placeholder="Leave a comment..."
          className="text-area"
          style={{ resize: 'vertical', margin: '20px', width: '600px' }}
        ></textarea>
        <button className={styles.newMessageButton}>Post</button>
      </form>
    </div>
  );
}
