'use client';
import styles from './EditProjectModal.module.scss';

type Props = {
  setShowModal: any;
};

export default function EditProjectModal({ setShowModal }: Props) {
  function handleFormSubmit(event: any) {
    event.preventDefault();
    console.log('hello');
  }

  return (
    <div className={styles.editProjectModalBackground}>
      <div className={styles.editProjectModalContent}>
        <button
          onClick={setShowModal(false)}
          className={styles.editProjectModalCloseBtn}
        >
          Close
        </button>
      </div>
    </div>
  );
}
/*
        <h2>Edit Message</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor='content'>Message Content</label>
            <input type={'text'} name={'content'} id={'messageContent'} />
          </div>
          <input type={'submit'}></input>
        </form>
      </div>
 */
