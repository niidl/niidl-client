'use client';
import styles from './EditMessageModal.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRef } from 'react';
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

export default function EditMessageModal({
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
    await fetch(
      `${isProduction}/projects/${projectId}/threads/${threadId}/messages/${messageId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMessage),
      }
    ).then((res) => {
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
              rows={6}
              className={styles.textArea}
              defaultValue={content}
            ></textarea>
            <input className={styles.submitButton} type={'submit'}></input>
          </form>
        </div>
      </div>
    </div>
  );
}
