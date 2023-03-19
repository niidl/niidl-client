'use client';

import styles from './page.module.scss';
import { useEffect, useState, useRef } from 'react';
import ProjectCategory from '@/components/ProjectCategory';
import ProjectInstance from '@/components/ProjectInstance';

const projectCategoriesMockData = [
  'Beginner-friendly',
  'Education',
  'Environment',
  'Health',
  'Fitness',
  'Food',
  'Entertainment',
  'Travel',
  'Science',
  'Business',
  'JavaScript',
  'Python',
  'Ruby',
  'C#',
];

const allProjectsMockData = [
  {
    id: 101,
    name: 'mymizu',
    keywords: ['Education', 'JavaScript', 'Beginner-friendly'],
  },
  {
    id: 102,
    name: 'Honeycomb',
    keywords: ['Science', 'JavaScript', 'Beginner-friendly'],
  },
  {
    id: 103,
    name: 'pURANIUM',
    keywords: ['Science', 'Environment', 'Python'],
  },
  {
    id: 105,
    name: 'CodeLegion',
    keywords: ['Education', 'Science', 'JavaScript', 'C#'],
  },
  {
    id: 106,
    name: 'RuddyRex',
    keywords: ['Travel', 'JavaScript', 'Beginner-friendly'],
  },
  {
    id: 107,
    name: 'impact training',
    keywords: ['Fitness', 'Health', 'Ruby'],
  },
];

export interface Project {
  id: number;
  name: string;
  keywords: string[];
}

export default function Home() {
  const [projectCategories, setProjectCategories] = 
    useState<string[]>(projectCategoriesMockData);
  const [selectedProjectCategories, setSelectedProjectCategories] =
    useState<string[]>(['All Projects']);
  const [allProjects, setAllProjects] =
    useState<Project[]>(allProjectsMockData);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const selectedProjectCategoriesLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!selectedProjectCategoriesLoadedRef.current) {
      selectedProjectCategoriesLoadedRef.current = true;
    } else {
      let projectsUnderKeyword: Project[] = [];
      let uniqueProjectsUnderKeyword: Project[] = [];

      for (let i = 0; i < selectedProjectCategories.length; i++) {
        projectsUnderKeyword = [
          ...projectsUnderKeyword,
          ...allProjects.filter((project) =>
            project.keywords.includes(selectedProjectCategories[i])
          ),
        ];

        uniqueProjectsUnderKeyword = projectsUnderKeyword.filter(
          (project, index) => projectsUnderKeyword.indexOf(project) === index
        );
      }

      setFilteredProjects(() => uniqueProjectsUnderKeyword);
    }
  }, [selectedProjectCategories, allProjects]);

  function handleProjectCategoryClick(event: any) {
    if (!selectedProjectCategories.includes(event.target.innerText)) {
      setSelectedProjectCategories((selectedProjectCategories) => [
        ...selectedProjectCategories,
        event.target.innerText,
      ]);
    }

    if (selectedProjectCategories.includes(event.target.innerText)) {
      setSelectedProjectCategories((selectedProjectCategories) =>
        selectedProjectCategories.filter(
          (category) => category !== event.target.innerText
        )
      );
    }
  }

  return (
    <main className={styles.main}>
      <div>
        <h1>Projects</h1>

        <div>
          <h2>Project Categories</h2>
          <div className={styles.projectCategoriesContainer}>
            {projectCategories.map((projectCategory) => (
              <ProjectCategory
                projectCategory={projectCategory}
                key={projectCategory}
                handleProjectCategoryClick={handleProjectCategoryClick}
              />
            ))}
          </div>
        </div>

        <div>
          <h2>Filtered Projects</h2>
          <div className={styles.filteredProjectsContainer}>
            {selectedProjectCategoriesLoadedRef.current
              ? filteredProjects.map((filteredProject) => (
                  <ProjectInstance
                    project={filteredProject}
                    key={filteredProject.id}
                  />
                ))
              : allProjects.map((project) => (
                  <ProjectInstance project={project} key={project.id} />
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
