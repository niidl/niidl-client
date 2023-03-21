'use client';
import axios from 'axios';
import styles from '../page.module.scss';

interface MessageObject {
  content: string;
  creation_time: Date;
  user_id: number;
  thread_id: number;
}

interface Props {
  thread_id: number;
  project_id: number;
}

export default function NewMessage({ thread_id, project_id }: Props) {
  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const textValue: string = e.target.textarea.value;
    const date: Date = new Date();
    let userId: any = localStorage.getItem('currentUser');
    userId = JSON.parse(userId);

    const newMessageObject: MessageObject = {
      content: textValue,
      creation_time: date,
      user_id: userId.ghuid,
      thread_id: thread_id,
    };

    console.log(newMessageObject, project_id);

    await axios.post(
      `https://niidl.net/projects/${project_id}/threads/${thread_id}/newMessage`,
      newMessageObject
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.newMessageContainer}>
        <textarea
          id='message'
          rows={4}
          name='textarea'
          placeholder='Leave a comment...'
          className='text-area'
          style={{ resize: 'vertical', margin: '20px', width: '600px' }}
        ></textarea>
        <button className={styles.newMessageButton}>Post</button>
      </form>
    </div>
  );
}
