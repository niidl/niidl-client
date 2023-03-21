import Image from 'next/image';
import styles from './page.module.scss';
import projectCategoryStyles from '../../../components/ProjectCategory.module.scss';
import Discussions from './components/Discussions';
import Issues from './components/Issues';
import Repository from './components/Repository';

const allProjectsMockData = [
  {
    id: 101,
    name: 'mymizu',
    keywords: ['Education', 'JavaScript', 'Beginner-friendly'],
  },
  {
    id: 102,
    name: 'Honeycomb',
    keywords: ['Science', 'JavaScript', 'Beginner-friendly'],
  },
  {
    id: 103,
    name: 'pURANIUM',
    keywords: ['Science', 'Environment', 'Python'],
  },
  {
    id: 105,
    name: 'CodeLegion',
    keywords: ['Education', 'Science', 'JavaScript', 'C#'],
  },
  {
    id: 106,
    name: 'RuddyRex',
    keywords: ['Travel', 'JavaScript', 'Beginner-friendly'],
  },
  {
    id: 107,
    name: 'impact training',
    keywords: ['Fitness', 'Health', 'Ruby'],
  },
];

async function getProject(projectId: string) {
  const res = await allProjectsMockData.filter(
    (project) => String(project.id) === projectId
  )[0];
  return res;
}

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
    id: string;
    content: string;
    project_id: number;
    user_id: string;
    creation_time: Date;
    title: string;
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

export default async function ProjectPage({ params }: any) {
  const project: SingleProj = {
    id: 0,
    project_name: '',
    description: '',
    github_url: '',
    owner: '',
    project_image: '',
    project_type: '',
    tags: [],
    contributors: [],
    threads: [],
    issues: [],
    directory: '',
  };
  //const project = await getProject(params.projectId);

  async function fetchAllProjects(): Promise<void> {
    const response = await fetch(`https://niidl.net/projects/${params.projectId}`);
    const data: SingleProj = await response.json();
    project.id = data.id;
    project.project_name = data.project_name;
    project.description = data.description;
    project.github_url = data.github_url;
    project.owner = data.owner;
    project.project_image = data.project_image;
    project.project_type = data.project_type;
    project.tags = data.tags;
    project.contributors = data.contributors;
    project.threads = data.threads;
    project.issues = data.issues;
    project.directory = data.directory;
  }

  const tagOnly: Array<string> = project.tags.map((tag) => {
    return tag.tag_name;
  });

  const contributorNames: Array<string> = project.contributors.map(
    (contributor) => {
      return contributor.username;
    }
  );

  await fetchAllProjects();

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
        <h2>Discussion</h2>
        <Discussions projectDiscussion={project.threads} />
      </div>

      <div>
        <h2>Issues</h2>
        <Issues projectIssues={project.issues} />
      </div>

      <div>
        <h2>Contributor</h2>
        <div>
          <ul>
            {project.contributors.map((contributor) => (
              <li key={contributor.contributor_id}>{contributor.username}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2>Repository</h2>
        <Repository projectDirectory={project.directory} />
      </div>
    </div>
  );
}
