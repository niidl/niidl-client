import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/app/page';
import styles from './ProjectInstance.module.scss';

type Props = {
  project: Project;
};

const ProjectInstance: React.FC<Props> = ({ project }) => {
  return (
    <Link href={`/project/${project.id}`} key={project.project_name}>
      <div className={styles.projectInstanceContainer}>
        <div className={styles.projectInstanceImageContainer}>
          <Image
            className={styles.projectInstanceImage}
            src={project.project_image}
            fill
            sizes="33vw"
            priority={true}
            alt={`Image for ${project.project_name}`}
          />
        </div>
        <div className={styles.projectInstanceInfoContainer}>
          <div className={styles.projectInstanceInfoTagContainer}>
            {project.tags.map((tag) => (
              <div className={styles.projectInstanceInfoTag} key={tag}>
                {tag}
              </div>
            ))}
          </div>
          <h3 className={styles.projectInstanceInfoTitle}>
            {project.project_name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ProjectInstance;
