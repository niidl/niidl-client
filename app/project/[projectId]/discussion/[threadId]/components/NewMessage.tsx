'use client';
import axios from 'axios';
import styles from '../page.module.scss';
import moment from 'moment';

interface MessageObject {
  content: string;
  creation_time: string;
  user_id: number;
  thread_id: number;
}

export default function NewMessage() {
  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const textValue: string = e.target.textarea.value;
    const date: Date = new Date()
    const postDate: string = moment(date).format('YYYY-MM-DD')

    console.log(postDate)

    const newMessageObject: MessageObject = {
      content: textValue,
      creation_time: postDate,
      user_id: 3,
      thread_id: 5,
    };
    // await axios.post('https://niidl.net/NewMessage', newMessageObject);
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
