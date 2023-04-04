'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Thread } from './Discussions';
import styles from './NewDiscussionModal.module.scss';

type Props = {
  showModal: boolean;
  projectId: number;
  projectName: string;
  setShowModal: any;
};
export default function NewDiscussionModal({
  showModal,
  projectId,
  projectName,
  setShowModal,
}: Props) {
  const router = useRouter();

  const isProduction: string = process.env.PRODUCTION
    ? 'https://niidl.net'
    : 'http://localhost:8080';

  const projectTypes: Array<string> = ['general-discussion', 'new-ideas'];

  async function handleFormSubmit(event: any) {
    event.preventDefault();

    const formBody: any = {
      title: event.target.elements.discussionTitle.value,
      content: event.target.elements.discussionContent.value,
      project_id: projectId,
      thread_tag: event.target.elements.projectType.value,
    };

    setShowModal(false);

    const id = await axios.post(
      `${isProduction}/projects/${projectId}/newThread`,
      formBody,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    router.push(`/project/${projectId}/discussion/${id.data.id}`);
    // .then((res) => {
    //   console.log(res);
    //   setShowModal(false);
    // });
  }

  return showModal ? (
    <div
      className={styles.newDiscussionModalBackground}
      onClick={() => setShowModal(false)}
    >
      <div
        className={styles.newDiscussionModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowModal(false)}
          className={styles.newDiscussionModalCloseBtn}
        >
          Close
        </button>
        <h2>Create New Discussion</h2>
        <form
          onSubmit={(e) => {
            handleFormSubmit(e);
            router.refresh();
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input type={'text'} name={'title'} id={'discussionTitle'} />
          </div>

          <div>
            <label htmlFor="content">Description</label>
            <textarea name={'content'} id={'discussionContent'} />
          </div>

          <div>
            <label htmlFor="project_type">Project Type</label>
            <select
              name="projectType"
              id="projectType"
              defaultValue={'General Discussion'}
            >
              {projectTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <input type={'submit'}></input>
        </form>
      </div>
    </div>
  ) : null;
}
