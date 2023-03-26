import axios from 'axios';
import { Thread } from './Discussions';
import styles from './NewDiscussionModal.module.scss';

type Props = {
  showModal: boolean;
  onClose: Function;
  projectId: number;
  projectName: string;
  setProjectThreads: any;
  projectThreads: Thread[] | Promise<Thread[]>;
};
export default function NewDiscussionModal({
  showModal,
  onClose,
  projectId,
  projectName,
  setProjectThreads,
  projectThreads,
}: Props) {
  if (!showModal) return null;

  function handleFormSubmit(event: any) {
    event.preventDefault();

    const formBody: any = {
      title: event.target.elements.discussionTitle.value,
      content: event.target.elements.discussionContent.value,
      project_id: projectId,
    };

    axios.post(`https://niidl.net/projects/${projectId}/newThread`, formBody,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
    });

    const newProjectThread: any = projectThreads
    setProjectThreads(newProjectThread.push(formBody))
    onClose();
  }

  return (
    <div
      className={styles.newDiscussionModalBackground}
      onClick={() => onClose()}
    >
      <div
        className={styles.newDiscussionModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onClose()}
          className={styles.newDiscussionModalCloseBtn}
        >
          Close
        </button>
        <h2>Create New Discussion</h2>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div>
            <label htmlFor='title'>Title</label>
            <input type={'text'} name={'title'} id={'discussionTitle'} />
          </div>

          <div>
            <label htmlFor='content'>Description</label>
            <textarea name={'content'} id={'discussionContent'} />
          </div>

          <input type={'submit'}></input>
        </form>
      </div>
    </div>
  );
}
