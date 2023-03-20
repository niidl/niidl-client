import Image from 'next/image';
import styles from './page.module.scss';
import projectCategoryStyles from '../../../components/ProjectCategory.module.scss';
import Discussions from './components/Discussions';
import Issues from './components/Issues';
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
      <div className={styles.projectPageBasicInfoContainer}>
        <div className={styles.projectPageBasicInfoImageContainer}>
          <Image
            src={'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
            width={500}
            height={500} 
            className={styles.projectPageBasicInfoImage}
            alt={'Tokyo skyline on a clear day'}
          />
        </div>
        <div>
          <h1>{project.name}</h1>
          <div>Here goes the project description and everything the organizers want to say.</div>
        </div>
      </div>

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
        <Discussions
          projectId={Number(project.id)}
        />
      </div>

      <div>
        <h2>Issues</h2>
        {/* <div>Here goes all of the issues.</div> */}
        <Issues
        />
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