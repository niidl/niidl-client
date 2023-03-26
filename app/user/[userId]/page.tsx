import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import UserProjects from './components/UserProjects';
import UserContributions from './components/UserContributions';

const userMockData = [
  {
    id: -1,
    first_name: 'Bryan',
    last_name: 'Cendales',
    github_url: 'https://github.com/MrBCendales',
    user_name: 'MrBCendales',
    email: 'bryan@bryancendales.com',
    github_profile_picture: 'https://avatars.githubusercontent.com/u/114232631?v=4',
    links: [
      {
        name: 'Twitter',
        url: 'https://twitter.com/mcdonalds'
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com',
      },
      {
        name: 'Website',
        url: 'https://codechrysalis.io',
      }
    ],
    user_projects: [
      {
        id: -2,
        project_name: 'Pokedex'
      },
      {
        id: -3,
        project_name: 'The super noodle recipe'
      }
    ]
  }
];

interface User {
  id: number,
  first_name: string | null,
  last_name: string | null,
  github_url: string,
  user_name: string,
  email: string,
  github_profile_picture: string,
  links: Array<{
    name: string,
    url: string
  }>,
  user_projects: Array<{
    id: number,
    project_name: string
  }>
}

function getUserData(userId: string): User {
  const res = userMockData.filter(user => String(user.id) === userId)[0];

  return res;
}

async function getUserMessages(userId: string): Promise<any> {
  const res = await fetch(`https://niidl.net/users/456/messages`);
  const data = await res.json();
  
  return data;
}

export default async function UserDashboard({ params }: any) {
  const user = await getUserData(params.userId);
  const userMessages = await getUserMessages(params.userId);

  return (
    <main className={styles.userDashboardMainContainer}>
      <div className={styles.userDashboardBasicInfoContainer}>
        <div className={styles.userDashboardBasicInfoImageContainer}>
          <Image 
            src={'https://avatars.githubusercontent.com/u/114232631?v=4'}
            width={1000}
            height={1000}
            className={styles.userDashboardImage}
            alt={'Profile photo'}
          >
          </Image>
        </div>

        <div>
          <h2>{user.user_name}</h2>
          <h3>{`${user.first_name ? user.first_name : ''} ${user.last_name ? user.last_name : ''}`}</h3>
          <h3>{user.email}</h3>
          
          <div className={styles.userDashboardUserLinksContainer}>
            <h3>Links</h3>
            <div>
              <Link 
                href={user.github_url}
                target='_blank'  
              >
                <p>Github</p>
              </Link>

              <Link
                href={user.links.filter(link => link.name === 'Twitter')[0].url}
                target='_blank'
              >
                <p>Twitter</p>
              </Link>

              <Link
                href={user.links.filter(link => link.name === 'LinkedIn')[0].url}
                target='_blank'
              >
                <p>LinkedIn</p>
              </Link>

              <Link
                href={user.links.filter(link => link.name === 'Website')[0].url}
                target='_blank'
              >
                <p>Website</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2>My Projects</h2>
        <UserProjects 
          userProjects={user.user_projects}
        />
      </div>

      <div>
        <h2>My Contributions</h2>
        <UserContributions 
          userMessages={userMessages}
        />
      </div>
    </main>
  )
}