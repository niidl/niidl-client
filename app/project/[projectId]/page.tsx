import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import projectCategoryStyles from '../../../components/ProjectCategory.module.scss';
import Issues from './components/Issues';
import Repository from './components/Repository';
import Discussions from './discussion/components/Discussions';

export interface SingleProj {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: string;
  project_image: string;
  project_type: string;
  tags: Array<{ tag_name: string }>;
  contributors: Array<{ username: string; contributor_id: number }>;
  threads: Array<{
    id: number;
    content: string;
    project_id: number;
    user_id: string;
    creation_time: Date;
    title: string;
    thread_tag: string;
    upvotes: number;
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

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

async function getProjectInfo(projectId: number): Promise<SingleProj> {
  if (projectId < -5000) {
    const client = `${isProduction}/githubProjects/${projectId}`;
    const response = await fetch(client, { cache: 'no-store' });
    const githubInfo = await response.json();
    return githubInfo;
  } else {
    const res = await fetch(`${isProduction}/projects/${projectId}`, {
      cache: 'no-store',
    });
    const info = await res.json();
    return info;
  }
}

export default async function ProjectPage({ params }: any) {
  const project: SingleProj = await getProjectInfo(params.projectId);
  const tagOnly: Array<string> = project.tags.map((tag) => {
    return tag.tag_name;
  });

  return (
    <div className={styles.projectPageInfoContainer}>
      <div className={styles.projectPageBasicInfoContainer}>
        <div className={styles.projectPageBasicInfoImageContainer}>
          <Image
            src={
              'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
            }
            width={500}
            height={500}
            className={styles.projectPageBasicInfoImage}
            alt={'Tokyo skyline on a clear day'}
          />
        </div>
        <div>
          <h1>{project.project_name}</h1>
          <div>{project.description}</div>
        </div>
      </div>

      <div>
        <h2>Technologies</h2>
        <div className={styles.projectTechnologiesContainer}>
          {tagOnly.map((keyword) => (
            <div
              className={projectCategoryStyles.projectCategoryInstance}
              key={keyword}
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>

      <div>
        {project.contributors ? (
          <>
            <h2>Discussion</h2>
            <Discussions
              projectDiscussion={project.threads}
              projectId={project.id}
              projectName={project.project_name}
            />
          </>
        ) : (
          <></>
        )}
      </div>

      <div>
        {project.issues ? (
          <>
            <h2>Issues</h2>
            <Issues projectIssues={project.issues} />
          </>
        ) : (
          <></>
        )}
      </div>

      <div>
        {project.contributors ? (
          <>
            <h2>Contributor</h2>
            <div>
              <ul>
                {project.contributors.map((contributor) => (
                  <li key={contributor.contributor_id}>
                    {contributor.username}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div>
        {project.github_url ? (
          <>
            <h2>Repository</h2>
            <Repository projectDirectory={project.directory} />
          </>
        ) : (
          <h2>Repository</h2>
        )}
      </div>
    </div>
  );
}
/*
 */
