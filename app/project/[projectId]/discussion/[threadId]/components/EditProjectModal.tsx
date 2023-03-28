'use client';
import styles from '../../../../../../components/NewProjectModal.module.scss';

type Props = {
  showModal: boolean;
  onClose: Function;
};

export default function EditProjectModal({ showModal, onClose }: Props) {
  function handleFormSubmit(event: any) {
    event.preventDefault();

    const formBody: any = {
      project_name: event.target.elements.projectName.value,
      project_type: event.target.elements.projectType.value,
      description: event.target.elements.projectDescription.value,
      github_url: event.target.elements.projectGithubRepo.value,
      owner: JSON.parse(localStorage.getItem('currentUser') || '').ghuid,
      project_image: event.target.elements.projectImage.value,
    };

    const allOptions = event.target.elements.projectTags;
    const tags = [];
    for (const option of allOptions) {
      if (option.selected) {
        tags.push(option.name);
      }
    }
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
            <label htmlFor='project_name'>Project Title</label>
            <input type={'text'} name={'project_name'} id={'projectName'} />
          </div>

          <div>
            <label htmlFor='project_type'>Project Type</label>
            <input type={'text'} name={'project_type'} id={'projectType'} />
          </div>

          <div>
            <label htmlFor='description'>Description</label>
            <input
              type={'text'}
              name={'description'}
              id={'projectDescription'}
            />
          </div>

          <div>
            <label htmlFor='github_url'>Github Repository</label>
            <input type={'text'} name={'github_url'} id={'projectGithubRepo'} />
          </div>

          <div>
            <label htmlFor='tags'>Tags</label>
            <select name={'tags'} id={'projectTags'} multiple>
              {projectCategories.map((category) => {
                return (
                  <option value={category} key={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor='project_image'>Project Image</label>
            <input type={'text'} name={'project_image'} id={'projectImage'} />
          </div>

          <input type={'submit'}></input>
        </form>
      </div>
    </div>
  ) : null;
}
