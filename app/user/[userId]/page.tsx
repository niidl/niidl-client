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

interface BioLink {
  name: string,
  url: string
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

async function getUserData(): Promise<any> {
  const response = await fetch(`${isProduction}/users/data`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  })
  const allUserInfo = await response.json();

  return allUserInfo;
}

async function getUserMessages(): Promise<any> {
  const response = await fetch(`${isProduction}/users/messages`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  });
  const userMessages = await response.json();
  
  return userMessages;
}

export default async function UserDashboard({ params }: any) {
  const user = await getUserData();
  const userMessages = await getUserMessages();

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
                href={user.links.filter((link:BioLink) => link.name === 'Twitter')[0].url}
                target='_blank'
              >
                <p>Twitter</p>
              </Link>

              <Link
                href={user.links.filter((link:BioLink) => link.name === 'LinkedIn')[0].url}
                target='_blank'
              >
                <p>LinkedIn</p>
              </Link>

              <Link
                href={user.links.filter((link:BioLink) => link.name === 'Website')[0].url}
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