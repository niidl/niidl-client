import styles from './ProjectCategory.module.scss';
import { useState } from 'react';

type Props = {
  projectCategory: string;
  handleProjectCategoryClick: Function;
};

const ProjectCategory: React.FC<Props> = ({
  projectCategory,
  handleProjectCategoryClick,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  function handleClick(event: any) {
    setIsSelected(!isSelected);
    handleProjectCategoryClick(event);
  }

  return (
    <div
      className={
        isSelected
          ? `${styles.projectCategoryInstance} ${styles.selectedInstance}`
          : styles.projectCategoryInstance
      }
      onClick={(e) => handleClick(e)}
    >
      {projectCategory}
    </div>
  );
};

export default ProjectCategory;
