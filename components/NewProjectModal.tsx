import styles from './NewProjectModal.module.scss';

type Props = {
  showModal: boolean,
  onClose: Function
}

export default function NewProjectModal({ showModal, onClose }: Props) {
  if (!showModal) return null;

  function handleFormSubmit(event: any) {
    event.preventDefault();

    const formBody: any = {
      project_name: event.target.elements.projectName.value,
      project_type: event.target.elements.projectType.value,
      description: event.target.elements.projectDescription.value,
      github_url: event.target.elements.projectGithubRepo.value,
      owner: JSON.parse(localStorage.getItem('currentUser') || '').ghuid,
      project_image: event.target.elements.projectImage.value
    }

    fetch('https://niidl.net/projects/newProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formBody)
    });

    onClose();
  }

  return (
    <div 
      className={styles.newProjectModalBackground}
      onClick={() => onClose()}
    >
      <div 
        className={styles.newProjectModalContent}
        onClick={e => e.stopPropagation()}
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
            <label htmlFor='project_name'>Project Title</label>
            <input type={'text'} 
              name={'project_name'} 
              id={'projectName'} />
          </div>

          <div>
            <label htmlFor='project_type'>Project Type</label>
            <input type={'text'} 
              name={'project_type'}
              id={'projectType'} />
          </div>

          <div>
            <label htmlFor='description'>Description</label>
            <input type={'text'} 
              name={'description'}
              id={'projectDescription'} />
          </div>

          <div>
            <label htmlFor='github_url'>Github Repository</label>
            <input type={'text'}
              name={'github_url'}
              id={'projectGithubRepo'} />
          </div>

          <div>
            <label htmlFor='project_image'>Project Image</label>
            <input type={'text'}
              name={'project_image'}
              id={'projectImage'} />
          </div>

          <input type={'submit'}></input>
        </form>
      </div>
    </div>
  )
}