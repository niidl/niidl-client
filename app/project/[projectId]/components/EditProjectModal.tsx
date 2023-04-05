'use client';
import styles from '../../../../components/NewProjectModal.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  showModal: boolean;
  onClose: Function;
  projectCategories: string[];
  projectTypes: string[];
  projectInfo: SingleProj;
  langOnly: string[];
  tagsOnly: string[];
};

export interface SingleProj {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: string;
  project_image: string;
  project_type: string;
  tags: Array<{ tag_name: string; id: number }>;
  contributors: Array<{ username: string; contributor_id: number }>;
  threads: Array<{
    id: number;
    content: string;
    project_id: number;
    user_id: string;
    creation_time: Date;
    title: string;
    thread_tag: string;
    upvotes_threads: number;
    isPinned: boolean;
    user: {
      user_name: string;
    };
  }>;
  issues: Array<{
    issue_id: number;
    html_url: string;
    title: string;
    created_at: Date;
    issue_author: string;
    author_id: number;
  }>;
  directory: string;
}

export default function EditProjectModal({
  projectInfo,
  showModal,
  onClose,
  projectCategories,
  projectTypes,
  langOnly,
  tagsOnly,
}: Props) {
  const initialTags = projectInfo.tags.map((tagObj) => tagObj.tag_name);
  const fileInput = useRef<any>();
  const router = useRouter();
  const [filename, setFilename] = useState<string>('Select an image file.');

  async function handleFormSubmit(event: any) {
    const isProduction: string = process.env.PRODUCTION
      ? 'https://niidl.net'
      : 'http://localhost:8080';

    event.preventDefault();

    const file = event.target.upload.files[0];
    let projectName: string;
    let fileType;

    const formBody: any = {
      project_name: event.target.elements.projectName.value,
      project_type: event.target.elements.projectType.value,
      description: event.target.elements.projectDescription.value,
    };

    if (file) {
      projectName = event.target.elements.projectName.value
        .split(' ')
        .map((word: string, index: number) => {
          if (index !== 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          } else {
            return word.charAt(0).toLowerCase() + word.slice(1);
          }
        })
        .join('');

      if (file.type === 'image/jpeg') {
        fileType = '.jpeg';
      } else if (file.type === 'image/png') {
        fileType = '.png';
      } else if (file.type === 'image/jpg') {
        fileType = '.jpg';
      }

      const formData = new FormData();
      formData.append('upload', file);

      await fetch(`${isProduction}/projects/upload?newName=${projectName}`, {
        method: 'POST',
        body: formData,
      });

      formBody.project_image = `https://niidl.sgp1.digitaloceanspaces.com/%2F${projectName}%2F${projectName}_image${fileType}`;
    } else {
      formBody.project_image = projectInfo.project_image;
    }

    await fetch(`${isProduction}/projects/${projectInfo.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formBody),
    });

    const allOptions = event.target.elements.projectTags;
    const newTags: any = [];
    for (const option of allOptions[0]) {
      if (option.selected) {
        newTags.push(option.value);
      }
    }

    for (const option of allOptions[1]) {
      if (option.selected) {
        newTags.push(option.value);
      }
    }

    const tagsToDelete = {
      allTagIds: projectInfo.tags
        .filter((tag: any) => !newTags.includes(tag.tag_name))
        .map((tagObj) => tagObj.id),
    };

    const tagsToCreate = newTags
      .filter((tag: string) => !initialTags.includes(tag))
      .map((tag: string) => {
        return { tag_name: tag, github_url: projectInfo.github_url };
      });

    if (tagsToCreate.length) {
      await fetch(isProduction + '/projects/projectId/newTag', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagsToCreate),
      });
    }

    if (tagsToDelete.allTagIds.length) {
      await fetch(isProduction + '/projects/:projectId/tags/:tagId', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagsToDelete),
      });
    }

    router.refresh();
    onClose();
  }

  function handleClick(e: any) {
    e.preventDefault();
    fileInput.current.click();
  }

  function handleFileInputChange(e: any) {
    setFilename(fileInput.current.files[0].name);
  }

  return showModal ? (
    <div className={styles.newProjectModalBackground} onClick={() => onClose()}>
      <div
        className={styles.newProjectModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.headContainer}>
          <h2>Edit Project</h2>
          <AiOutlineCloseCircle
            onClick={() => onClose()}
            className={styles.closeButton}
          />
        </div>

        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div>
            <label htmlFor="project_name">Project Title</label>
            <input
              type={'text'}
              name={'project_name'}
              id={'projectName'}
              defaultValue={projectInfo.project_name}
            />
          </div>

          <div>
            <label htmlFor="project_type">Project Type</label>
            <select
              name="projectType"
              id="projectType"
              defaultValue={projectInfo.project_type}
              className={styles.selectProjectType}
            >
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
              defaultValue={projectInfo.description}
            />
          </div>

          <div>
            <label htmlFor="github_url">Github Repository</label>
            <input
              type={'text'}
              name={'github_url'}
              id={'projectGithubRepo'}
              defaultValue={projectInfo.github_url}
            />
          </div>

          <div className={styles.tagsLanguagesContainer}>
            <div className={styles.tagsContainer}>
              <label htmlFor="tags">Tags</label>
              <select name={'tags'} id={'projectTags'} multiple>
                {tagsOnly.map((category) => {
                  return initialTags.includes(category) ? (
                    <option value={category} key={category} selected>
                      {category}
                    </option>
                  ) : (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.languageContainer}>
              <label htmlFor="tags">Languages</label>
              <select name={'tags'} id={'projectTags'} multiple>
                {langOnly.map((category) => {
                  return initialTags.includes(category) ? (
                    <option value={category} key={category} selected>
                      {category}
                    </option>
                  ) : (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={styles.fileContainer}>
            <label htmlFor="file" className={styles.fileLabel}>
              Upload an image file
            </label>
            <input
              type="file"
              name="upload"
              className={styles.fileInput}
              ref={fileInput}
              onChange={handleFileInputChange}
            />
            <div className={styles.fileButtonContainer}>
              <button className={styles.imageButton} onClick={handleClick}>
                Choose Image...
              </button>
              <div className={styles.fileNameContainer}>{filename}</div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.submitButton} type={'submit'}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
