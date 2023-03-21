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
  issues: Array<object>;
  contributors: Array<{ login: string; id: number }>;
  directory: Array<object>;
  project_name: string;
  description: string;
  id: number;
  threads: Array<object>;
  tags: Array<{ tag_name: string }>;
}

export default async function ProjectPage({ params }: any) {
  const project: SingleProj = {
    issues: [],
    contributors: [],
    directory: [],
    project_name: '',
    description: '',
    id: 0,
    threads: [],
    tags: [],
  };
  //const project = await getProject(params.projectId);

  async function fetchAllProjects(): Promise<void> {
    const response = await fetch(`niidl.net/projects/${params.projectId}`);
    const data: SingleProj = await response.json();
    project.issues = data.issues;
    project.contributors = data.contributors;
    project.directory = data.directory;
    project.project_name = data.project_name;
    project.description = data.description;
    project.id = data.id;
    project.threads = data.threads;
    project.tags = data.tags;
  }

  const tagOnly: Array<string> = project.tags.map((tag) => {
    return tag.tag_name;
  });

  const contributorNames: Array<string> = project.contributors.map(
    (contributor) => {
      return contributor.login;
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
        <h2>Contributors</h2>
        <div>
          <ul>
            {project.contributors.map((contributor) => (
              <li key={contributor.id}>{contributor.login}</li>
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
