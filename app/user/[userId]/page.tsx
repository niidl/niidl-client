import Link from 'next/link';
import styles from './page.module.scss';
import UserProjects from './components/UserProjects';
import UserContributions from './components/UserContributions';
import { FaGithub, FaTwitter, FaLinkedin, FaMedium } from 'react-icons/fa';

interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  github_url: string;
  user_name: string;
  email: string;
  github_profile_picture: string;
  links: Array<{
    name: string;
    url: string;
  }>;
}

interface UserProject {
  id: number;
  project_name: string;
  project_image: string;
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

async function getUserData(userName: string): Promise<User> {
  const response = await fetch(`${isProduction}/users/data/${userName}`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const allUserInfo: any = await response.json();

  return allUserInfo;
}

async function getUserProjects(userName: string): Promise<UserProject[]> {
  const response = await fetch(`${isProduction}/users/projects/${userName}`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const userProjects: UserProject[] = await response.json();

  return userProjects;
}

async function getUserMessages(userName: string): Promise<any> {
  const response = await fetch(`${isProduction}/users/messages/${userName}`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const userMessages = await response.json();

  return userMessages;
}

export default async function UserDashboard({ params }: any) {
  const userName = params.userId;
  const user = await getUserData(userName);
  const userMessages = await getUserMessages(userName);
  const userProjects = await getUserProjects(userName);

  return (
    <main className={styles.userDashboardMainContainer}>
      <div className={styles.userDashboardBasicInfoContainer}>
        <div className={styles.userDashboardBasicInfoImageContainer}>
          <img
            src={user.github_profile_picture}
            className={styles.userDashboardImage}
            alt={`Profile photo for ${user.user_name}`}
          />
        </div>

        <div className={styles.userDashboardBasicInfoContentContainer}>
          <h1>{user.user_name}</h1>
          <div className={styles.userDashboardBasicInfoDisplayName}>
            {
              `${user.first_name ? user.first_name : ''}
              ${user.last_name ? user.last_name : ''}`
            }
          </div>
          <div className={styles.userDashboardBasicInfoEmail}>{user.email}</div>
          
          <div className={styles.userDashboardUserLinksContainer}>
            <div>
              {
                user.github_url ?
                <Link
                  href={user.github_url}
                  target='_blank'
                >
                  <FaGithub 
                    className={styles.userDashboardUserLinkIcon}
                  />
                </Link> :
                ''
              }

              {
                user.links.filter(link => link.name === 'Twitter').length === 1 ?
                <Link
                  href={user.links.filter(link => link.name === 'Twitter')[0].url}
                  target='_blank'
                >
                  <FaTwitter
                    className={styles.userDashboardUserLinkIcon}
                  />
                </Link> :
                ''
              }
              
              {
                user.links.filter(link => link.name === 'LinkedIn').length === 1 ?
                  <Link
                    href={user.links.filter(link => link.name === 'LinkedIn')[0].url}
                    target='_blank'
                  >
                    <FaLinkedin
                      className={styles.userDashboardUserLinkIcon}
                    />
                  </Link> :
                  ''
              }
              
              {
                user.links.filter(link => link.name === 'Medium').length === 1 ?
                  <Link
                    href={user.links.filter(link => link.name === 'Medium')[0].url}
                    target='_blank'
                  >
                    <FaMedium
                      className={styles.userDashboardUserLinkIcon}
                    />
                  </Link> :
                  ''
              }
            </div>
          </div> 
        </div>
      </div>

      <div>
        <h2>My Projects</h2>
        <UserProjects 
          userProjects={userProjects}
          user_name={user.user_name}
        />
      </div>

      <div>
        <h2>My Discussions</h2>
        <UserContributions 
          userMessages={userMessages}
          user_name={user.user_name}
        />
      </div>
    </main>
  );
}
