import Link from 'next/link'
import styles from './UserProjects.module.scss';

interface Props {
  userProjects: Array<{
    id: number,
    project_name: string,
    project_image: string
  }>,
  user_name: string
}

export default function UserProjects({ userProjects, user_name }: Props) {
  return (
    <>
    {
      userProjects.length > 0 ?
      (
        <div className={styles.userProjectsContainer}>
          {
            userProjects.map(userProject => 
              <Link
                href={`/project/${userProject.id}`}
                key={userProject.id}
              >
                <div 
                  className={styles.userProjectInstance}
                  key={userProject.project_name}
                >
                  <div className={styles.userProjectInstanceImageContainer}>
                    <img 
                      src={userProject.project_image}
                      className={styles.userProjectInstanceImage}
                      alt={`Picture for ${userProject.project_name}`}
                    />
                  </div>
                  
                  <div className={styles.userProjectInstanceInfoContainer}>
                    <h3>{userProject.project_name}</h3>
                  </div>
                </div>
              </Link>
            )
          }
        </div>
      ) :
      (
        <div className={styles.emptyUserContributionContainer}>
          {`${user_name} has not created any projects on niidl yet.`}
        </div>
      )
    }
  </>
  );
}