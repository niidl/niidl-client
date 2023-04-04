import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import projectCategoryStyles from '../../../components/ProjectCategory.module.scss';
import Issues from './components/Issues';
import Repository from './components/Repository';
import Discussions from './discussion/components/Discussions';
import EditProjectButton from './components/EditProjectButton';
import { cookies } from 'next/headers';

export interface SingleProj {
  id: number;
  project_name: string;
  description: string;
  github_url: string;
  owner: string;
  project_image: string;
  project_type: string;
  tags: Array<{ tag_name: string; id: number }>;
  contributors: Array<{
    username: string;
    contributor_id: number;
    image: string;
  }>;
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
    upvotes: number;
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
  const demoArray = [
    '-16408992',
    '-13807606',
    '-110058856',
    '-12732573',
    '-40997482',
    '-4484451',
    '-4037197',
    '-995750',
    '-7212645',
    '-131770422',
    '-268424739',
    '-312262',
    '-77358263',
    '-3282',
    '-331603',
  ];
  if (demoArray.includes(String(projectId))) {
    const client = `${isProduction}/githubProjectsDemo/${projectId}`;
    const response = await fetch(client, { cache: 'no-store' });
    const demoInfo = await response.json();
    return demoInfo;
  } else if (projectId < -2000) {
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

async function getOwner(projectId: number, username: string): Promise<boolean> {
  const res = await fetch(
    `${isProduction}/projects/${projectId}/owner/${username}`
  );
  return res.json();
}

export default async function ProjectPage({ params }: any) {
  const username: any = cookies().get('userName');
  const project: SingleProj = await getProjectInfo(params.projectId);
  const tagOnly: Array<string> = project.tags.map((tag) => {
    return tag.tag_name;
  });

  const isOwner: boolean = username
    ? await getOwner(params.projectId, username.value)
    : false;

  return (
    <div className={styles.projectPageInfoContainer}>
      <div className={styles.projectPageBasicInfoContainer}>
        <div className={styles.projectPageBasicInfoImageContainer}>
          <Image
            src={project.project_image}
            width={500}
            height={500}
            className={styles.projectPageBasicInfoImage}
            alt={'Tokyo skyline on a clear day'}
          />
        </div>
        <div className={styles.projectPageBasicInfoContentContainer}>
          <Link href={project.github_url} target="_blank">
            <h1>{project.project_name}</h1>
          </Link>
          <div className={styles.projectBasicInfoProjectType}>
            {project.project_type}
          </div>
          <div>{project.description}</div>
          <div>
            <div className={styles.projectTechnologiesContainer}>
              {tagOnly.map((keyword) => (
                <div
                  className={styles.projectTags}
                  key={keyword}
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isOwner && <EditProjectButton projectInfo={project}></EditProjectButton>}

      <div>
        {project.contributors && (
          <>
            <h2>Discussion</h2>
            <Discussions
              projectDiscussion={project.threads}
              projectId={project.id}
              projectName={project.project_name}
            />
          </>
        )}
      </div>

      <div>
        {project.issues && (
          <>
            <h2>Issues</h2>
            <Issues projectIssues={project.issues} />
          </>
        )}
      </div>

      <div>
        {project.contributors && (
          <>
            <h2>Contributors</h2>
            <div className={styles.projectContributorsContainer}>
              {project.contributors.map((contributor) => (
                <Link
                  key={contributor.contributor_id}
                  href={`https://github.com/${contributor.username}`}
                  target="_blank"
                >
                  <div
                    className={styles.projectContributorInstanceContainer}
                    key={contributor.contributor_id}
                  >
                    <div className={styles.projectContributorImageContainer}>
                      <Image
                        src={contributor.image}
                        className={styles.projectContributorImage}
                        alt={`Photo of ${contributor.username}`}
                        width={200}
                        height={200}
                      />
                    </div>

                    <span className={styles.projectContributorUsername}>
                      {contributor.username}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div>
        {project.contributors ? (
          <>
            <h2>Repository</h2>
            <Repository projectDirectory={project.directory} />
          </>
        ) : (
          <>
            <h2>Repository</h2>
            <Link href={`${project.github_url}`} key={project.id}>
              {project.github_url}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
