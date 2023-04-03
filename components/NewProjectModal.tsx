import styles from './NewProjectModal.module.scss';
import { useRouter } from 'next/navigation';

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

    await fetch(isProduction + '/projects/newProject', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formBody),
    });

    const allOptions = event.target.elements.projectTags;
    const tags = [];
    for (const option of allOptions) {
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
    })

    const response = await fetch(`${isProduction}/projects/followUp?projectGithubRepo=${encodeURIComponent(event.target.elements.projectGithubRepo.value)}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`Error creating project: ${response.status}`);
      return;
    }
    
    try {
      const  {projectNum}  = await response.json();
      console.log(projectNum)
      const projectRoute = projectNum;
      router.push(`/project/${projectRoute}`);
      onClose();
    } catch (error: any) {
      console.error(`Failing here Unique Message Error parsing response: ${error.message}`);
    }
  }
  //   const response = await fetch(isProduction + '/projects/projectId/newTag', {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(tagArray),
  //   })
    
  //   if (!response.ok) {
  //     throw new Error('Error creating project'); // handle errors if needed
  //   }

  //   const { projectNum } = await response.json();
  //   console.log(projectNum)
  //   const projectRoute = projectNum.id

  //   router.push(`/project/${projectRoute}`);
  //   onClose();
  // }

    
    // .then((res) => res.json()).then((projectNum) => router.push(`project/${projectNum}`));
    // onClose();
  





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
