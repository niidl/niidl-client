'use client';
import styles from '../page.module.scss';

export default function NewMessage() {
  // function handleSubmit(e: any): void {
  //   e.preventDefault();
  //   const textValue = e.target.textarea.value;
  // }

  return (
    <div className={styles.newMessageContainer}>
      <form>
        <textarea
          id='message'
          rows={4}
          name='textarea'
          placeholder='Leave a comment...'
          className='text-area'
          style={{ resize: 'vertical', margin: '20px', width: '600px' }}
        ></textarea>
        <button className={styles.newMessageButton}>
          Post
        </button>
      </form>
    </div>
  );
}
