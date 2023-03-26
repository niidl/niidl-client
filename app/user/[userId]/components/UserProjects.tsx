import Link from 'next/link'
import styles from './UserProjects.module.scss';

interface Props {
  userProjects: Array<{
    id: number,
    project_name: string
  }>
}

export default function UserProjects({ userProjects }: Props) {
  return (
    <div className={styles.userProjectsContainer}>
      {
        userProjects.map(userProject => 
          <div 
            className={styles.userProjectInstance}
            key={userProject.project_name}
          >
            <Link
              href={`/project/${userProject.id}`}
            >
              <div className={styles.userProjectInstanceImageTemp}></div>
              <h3>{userProject.project_name}</h3>
            </Link>
          </div>
        )
      }
    </div>
  )
}