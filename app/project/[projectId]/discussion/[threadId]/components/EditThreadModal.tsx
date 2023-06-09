'use client';
import styles from './EditThreadModal.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Thread } from '../../components/Discussions';

type Props = {
  setShowModal: any;
  thread: Thread;
};

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export default function EditMessageModal({ setShowModal, thread }: Props) {
  const titleReference: any = useRef();
  const textReference: any = useRef();
  const router = useRouter();

  async function handleFormSubmit(event: any) {
    event.preventDefault();

    const editedMessage: any = {
      title: titleReference.current.value,
      content: textReference.current.value,
    };
    setShowModal(false);
    await fetch(
      `${isProduction}/projects/${thread.project_id}/threads/${thread.id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMessage),
      }
    );
  }

  return (
    <div className={styles.editProjectModalBackground}>
      <div className={styles.editProjectModalContent}>
        <AiOutlineCloseCircle
          className={styles.closeButton}
          onClick={() => setShowModal(false)}
        />
        <div className={styles.editContainer}>
          <h2>Edit Thread</h2>
          <form
            className={styles.formContainer}
            onSubmit={(e) => {
              handleFormSubmit(e);
              router.refresh();
            }}
          >
            <div>
              <p>thread title</p>
              <input
                type={'text'}
                name={'project_name'}
                className={styles.threadTitle}
                ref={titleReference}
                defaultValue={thread.title}
              />
            </div>
            <p>Thread Content</p>
            <textarea
              name={'content'}
              id={'messageContent'}
              ref={textReference}
              placeholder={'New thread content...'}
              className={styles.textArea}
              defaultValue={thread.content}
            />
            <button className={styles.submitButton} type={'submit'}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
