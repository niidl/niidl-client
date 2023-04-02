'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import styles from './NewMessage.module.scss';

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
  const textInputRef: any = useRef();

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();

    const textValue: any = textInputRef.current.value;
    textInputRef.current.value = '';

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
          id='message'
          rows={4}
          name='textarea'
          placeholder='Leave a comment...'
          ref={textInputRef}
          className={styles.textInput}
          required
        ></textarea>
        <button className={styles.newMessageButton}>Post</button>
      </form>
    </div>
  );
}
/*

*/
