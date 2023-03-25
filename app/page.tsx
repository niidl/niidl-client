'use client';

import styles from './page.module.scss';
import { useEffect, useState, useRef } from 'react';
import ProjectCategory from '@/components/ProjectCategory';
import ProjectInstance from '@/components/ProjectInstance';
import NewProjectModal from '@/components/NewProjectModal';

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
    project_name: 'mymizu',
    tags: ['Education', 'JavaScript', 'Beginner-friendly'],
  },
  {
    id: 102,
    project_name: 'Honeycomb',
    tags: ['Science', 'JavaScript', 'Beginner-friendly'],
  },
  {
    id: 103,
    project_name: 'pURANIUM',
    tags: ['Science', 'Environment', 'Python'],
  },
  {
    id: 105,
    project_name: 'CodeLegion',
    tags: ['Education', 'Science', 'JavaScript', 'C#'],
  },
  {
    id: 106,
    project_name: 'RuddyRex',
    tags: ['Travel', 'JavaScript', 'Beginner-friendly'],
  },
  {
    id: 107,
    project_name: 'impact training',
    tags: ['Fitness', 'Health', 'Ruby'],
  },
];

export interface Project {
  id: number;
  project_name: string;
  tags: string[];
}

export interface ProjectData {
  id: number;
  project_name: string;
  tags: Array<{ id: number; tag_name: string; project_id: number }>;
}

export default function Home() {
  // const [projectCategories, setProjectCategories] = useState<string[]>(
  //   projectCategoriesMockData
  // );
  const [projectCategories, setProjectCategories] = useState<Array<string>>([]);
  const [selectedProjectCategories, setSelectedProjectCategories] = useState<
    string[]
  >([]);

  const [allProjects, setAllProjects] = useState<Project[]>([
    {
      id: 0,
      project_name: '',
      tags: [],
    },
  ]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const selectedProjectCategoriesLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    async function fetchCategories(): Promise<void> {
      const response = await fetch('https://niidl.net/tagNames');
      const data: Array<{ tag_name: '' }> = await response.json();
      const cleanedTags: Array<string> = data.map((single) => {
        return single.tag_name;
      });
      console.log('in fetchCategories useEffect', cleanedTags);
      setProjectCategories(cleanedTags);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchAllProjects(): Promise<void> {
      const allProjectsArray: Array<Project> = [];
      const response = await fetch('https://niidl.net/projects');
      const data: Array<ProjectData> = await response.json();

      for (let i = 0; i < data.length; i++) {
        const singleProj: Project = { id: 0, project_name: '', tags: [] };
        const cleanedTags: Array<string> = [];

        data[i].tags.forEach((tag) => {
          cleanedTags.push(tag.tag_name);
        });

        singleProj.id = data[i].id;
        singleProj.project_name = data[i].project_name;
        singleProj.tags = cleanedTags;
        allProjectsArray.push(singleProj);
      }
      setAllProjects(allProjectsArray);
    }
    fetchAllProjects();
  }, []);

  useEffect(() => {
    if (!selectedProjectCategoriesLoadedRef.current) {
      selectedProjectCategoriesLoadedRef.current = true;
    } else {
      let projectsUnderTag: Project[] = [];
      let uniqueprojectsUnderTag: Project[] = [];

      for (let i = 0; i < selectedProjectCategories.length; i++) {
        projectsUnderTag = [
          ...projectsUnderTag,
          ...allProjects.filter((project) =>
            project.tags.includes(selectedProjectCategories[i])
          ),
        ];

        uniqueprojectsUnderTag = projectsUnderTag.filter(
          (project, index) => projectsUnderTag.indexOf(project) === index
        );
      }

      setFilteredProjects(() => uniqueprojectsUnderTag);
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
        <button onClick={() => setShowModal(true)}>+ Add Project</button>
        <NewProjectModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
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
            {selectedProjectCategories.length > 0
              ? //selectedProjectCategoriesLoadedRef.current
                filteredProjects.map((filteredProject) => (
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
