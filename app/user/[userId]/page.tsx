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
    username: 'MrBCendales',
    email: 'bryan@bryancendales.com',
    github_profile_picture: 'https://avatars.githubusercontent.com/u/114232631?v=4',
    links: {
      twitter: 'https://twitter.com/mcdonalds',
      linkedin: 'https://linkedin.com',
      website: 'https://codechrysalis.io'
    },
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
  first_name: string,
  last_name: string,
  github_url: string,
  username: string,
  email: string,
  github_profile_picture: string,
  links: {
    twitter: string,
    linkedin: string,
    website: string
  },
  user_projects: Array<{
    id: number,
    project_name: string
  }>
}

interface UserMessages {
  userMessages: Array<{
    content: string,
    creation_time: Date,
    thread: {
      title: string
    }
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
          <h2>{user.username}</h2>
          <h3>{`${user.first_name} ${user.last_name}`}</h3>
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
                href={user.links.twitter}
                target='_blank'
              >
                <p>Twitter</p>
              </Link>

              <Link
                href={user.links.linkedin}
                target='_blank'
              >
                <p>LinkedIn</p>
              </Link>

              <Link
                href={user.links.website}
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