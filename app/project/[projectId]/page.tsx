import styles from './page.module.scss'
import projectCategoryStyles from '../../../components/ProjectCategory.module.scss'
import Repository from './components/Repository';

const allProjectsMockData = [
  {
    id: '101',
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

async function getProject(projectId: number) {
  const res = await allProjectsMockData[0];
  return res;
}

export default async function ProjectPage({ params }: any) {
  const project = await getProject(params.id);

  return (
    <div className={styles.projectPageInfoContainer}>
      <h1>{project.name}</h1>
      <div>Here goes the project description and everything the organizers want to say.</div>

      <div>
        <h2>Technologies</h2>
        <div className={styles.projectTechnologiesContainer}>
          {
            project.keywords.map(keyword => 
              <div
                className={projectCategoryStyles.projectCategoryInstance}
                key={keyword}
              >
                {keyword}
              </div>
            )
          }
        </div>
      </div>

      <div>
        <h2>Discussion</h2>
        <div>Here goes all the discussion posts.</div>
      </div>

      <div>
        <h2>Issues</h2>
        <div>Here goes all of the issues.</div>
      </div>

      <div>
        <h2>Contibutors</h2>
        <div>Here goes all of the contributors.</div>
      </div>

      <div>
        <h2>Repository</h2>
        <Repository />
      </div>
    </div>
  );
}