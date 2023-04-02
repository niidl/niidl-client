import Link from 'next/link';
import { Project } from '@/app/page';
import styles from './ProjectInstance.module.scss';
import { motion } from 'framer-motion';

type Props = {
  project: Project;
};

const ProjectInstance: React.FC<Props> = ({ project }) => {
  return (
    <Link href={`/project/${project.id}`} key={project.project_name}>
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles.projectInstanceContainer}
      >
        <div className={styles.projectInstanceImageContainer}>
          <div className={styles.projectInstanceImage}></div>
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
      </motion.div>
    </Link>
  );
};

export default ProjectInstance;
