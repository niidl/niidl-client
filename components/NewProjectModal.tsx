'use client';
import styles from './NewProjectModal.module.scss';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Props = {
  showModal: boolean;
  onClose: Function;
  projectCategories: string[];
  tagsOnly: string[];
  langOnly: string[];
  projectTypes: string[];
  userName: string | undefined;
  sessionId: string | undefined;
};

export default function NewProjectModal({
  showModal,
  onClose,
  tagsOnly,
  langOnly,
  projectTypes,
  userName,
  sessionId,
}: Props) {
  const isProduction: string = process.env.PRODUCTION
    ? 'https://niidl.net'
    : 'http://localhost:8080';

  const router = useRouter();

  async function handleFormSubmit(event: any) {
    event.preventDefault();

    const formBody: any = {
      project_name: event.target.elements.projectName.value,
      project_type: event.target.elements.projectType.value,
      description: event.target.elements.projectDescription.value,
      github_url: event.target.elements.projectGithubRepo.value,
      owner: userName,
      project_image: event.target.elements.projectImage.value,
    };

    const response = await fetch(isProduction + '/projects/newProject', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formBody),
    });

    const id = await response.json();

    const allOptions = event.target.elements.projectTags;

    const tags = [];

    for (const option of allOptions[0]) {
      if (option.selected) {
        tags.push(option.value);
      }
    }

    for (const option of allOptions[1]) {
      if (option.selected) {
        tags.push(option.value);
      }
    }

    const tagArray: any = tags.map((tag) => {
      return {
        tag_name: tag,
        github_url: formBody.github_url,
      };
    });

    await fetch(isProduction + '/projects/projectId/newTag', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagArray),
    });

    router.push(`/project/${id.id}`);

    onClose();
  }

  return showModal ? (
    <div className={styles.newProjectModalBackground} onClick={() => onClose()}>
      <div
        className={styles.newProjectModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onClose()}
          className={styles.newProjectModalCloseBtn}
        >
          Close
        </button>
        <h2>Create New Project</h2>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div>
            <label htmlFor="project_name">Project Title</label>
            <input type={'text'} name={'project_name'} id={'projectName'} />
          </div>

          <div>
            <label htmlFor="project_type">Project Type</label>
            <select name="projectType" id="projectType">
              {projectTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              type={'text'}
              name={'description'}
              id={'projectDescription'}
            />
          </div>

          <div>
            <label htmlFor="github_url">Github Repository</label>
            <input type={'text'} name={'github_url'} id={'projectGithubRepo'} />
          </div>

          <div>
            <label htmlFor="tags">Tags</label>
            <select name={'tags'} id={'projectTags'} multiple>
              {tagsOnly.map((category) => {
                return (
                  <option value={category} key={category}>
                    {category}
                  </option>
                );
              })}
            </select>
            <label htmlFor="tags">Langugages</label>
            <select name={'tags'} id={'projectTags'} multiple>
              {langOnly.map((category) => {
                return (
                  <option value={category} key={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="project_image">Project Image</label>
            <input type={'text'} name={'project_image'} id={'projectImage'} />
          </div>

          <input type={'submit'}></input>
        </form>
      </div>
    </div>
  ) : null;
}
