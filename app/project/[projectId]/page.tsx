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
    id: number;
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
    try {
      const response = await fetch(
        //`https://niidl.net/projects/${params.projectId}`
        `https://niidl.net/projects/-1`
      );
      const data = await response.text();

      if (!data) {
        throw new Error('Empty response from server');
      }

      const jsonData: SingleProj = JSON.parse(data);

      project.id = jsonData.id;
      project.project_name = jsonData.project_name;
      project.description = jsonData.description;
      project.github_url = jsonData.github_url;
      project.owner = jsonData.owner;
      project.project_image = jsonData.project_image;
      project.project_type = jsonData.project_type;
      project.tags = jsonData.tags;
      project.contributors = jsonData.contributors;
      project.threads = jsonData.threads;
      project.issues = jsonData.issues;
      project.directory = jsonData.directory;
      console.log(project);
    } catch (error) {
      console.error(error);
    }
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
  const test: string = project.directory;
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
