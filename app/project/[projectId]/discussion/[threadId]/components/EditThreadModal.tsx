'use client';
import styles from './EditThreadModal.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRef } from 'react';
import axios from 'axios';
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

    await axios
      .put(
        `${isProduction}/projects/${thread.project_id}/threads/${thread.id}`,
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
          <h2>Edit Thread</h2>
          <form className={styles.formContainer} onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor='project_name'>Thread Title</label>
              <input
                type={'text'}
                name={'project_name'}
                id={'projectName'}
                ref={titleReference}
                defaultValue={thread.title}
              />
            </div>
            <textarea
              name={'content'}
              id={'messageContent'}
              ref={textReference}
              placeholder={'New thread content...'}
              className={styles.textArea}
              defaultValue={thread.content}
            />
            <input className={styles.submitButton} type={'submit'}></input>
          </form>
        </div>
      </div>
    </div>
  );
}
