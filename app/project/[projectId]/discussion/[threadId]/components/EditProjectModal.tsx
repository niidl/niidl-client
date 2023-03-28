'use client';
import styles from './EditProjectModal.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
  setShowModal: any;
  messageId: number;
  projectId: number;
  threadId: number;
  content: string;
};

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export default function EditProjectModal({
  setShowModal,
  threadId,
  projectId,
  messageId,
  content,
}: Props) {
  const reference: any = useRef();
  const router = useRouter();

  async function handleFormSubmit(event: any) {
    event.preventDefault();

    const editedMessage: any = {
      content: reference.current.value,
    };

    await axios
      .put(
        `${isProduction}/projects/${projectId}/threads/${threadId}/messages/${messageId}`,
        editedMessage,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setShowModal(false);
        router.refresh();
      });
  }

  return (
    <div className={styles.editProjectModalBackground}>
      <div className={styles.editProjectModalContent}>
        <AiOutlineCloseCircle
          className={styles.closeButton}
          onClick={() => setShowModal(false)}
        />
        <div className={styles.editContainer}>
          <h2>Edit Message</h2>
          <form className={styles.formContainer} onSubmit={handleFormSubmit}>
            <textarea
              name={'content'}
              id={'messageContent'}
              ref={reference}
              placeholder={'New message content...'}
              className={styles.textArea}
              defaultValue={content}
            />
            <input className={styles.submitButton} type={'submit'}></input>
          </form>
        </div>
      </div>
    </div>
  );
}
