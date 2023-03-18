import Link from 'next/link';
import { Project } from '@/app/page';
import styles from './ProjectInstance.module.scss';

type Props = {
  project: Project;
};

const ProjectInstance: React.FC<Props> = ({ project }) => {
  return (
    <Link
      href={`/project/${project.id}`}
      className={styles.filteredProjectInstance}
      key={project.name}
    >
      <div>{project.name}</div>
    </Link>
  );
};

export default ProjectInstance;
