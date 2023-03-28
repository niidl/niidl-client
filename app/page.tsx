'use client';
import styles from './page.module.scss';
import { useEffect, useState, useRef } from 'react';
import ProjectCategory from '@/components/ProjectCategory';
import ProjectInstance from '@/components/ProjectInstance';
import NewProjectModal from '@/components/NewProjectModal';

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

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export default function Home() {
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
  const searchInputRef = useRef<any>();

  useEffect(() => {
    fetchAllProjects();
    fetchCategories();
    fetchGitHubProjects();
  }, []);

  async function fetchGitHubProjects(): Promise<any> {
    const gitHubProjectsArray: Array<Project> = [];
    const gitHubResponse = await fetch(`${isProduction}/githubProjects`);
    const gitHubData: ProjectData[] = await gitHubResponse.json();
    for (let i = 0; i < gitHubData.length; i++) {
      const singleProj: Project = { id: 0, project_name: '', tags: [] };
      const cleanedTags: Array<string> = [];

      gitHubData[i].tags.forEach((tag) => {
        cleanedTags.push(tag.tag_name);
      });

      singleProj.id = gitHubData[i].id;
      singleProj.project_name = gitHubData[i].project_name;
      singleProj.tags = cleanedTags;
      gitHubProjectsArray.push(singleProj);
    }
    setAllProjects((current) => [...current, ...gitHubProjectsArray]);
  }

  async function fetchAllProjects(): Promise<void> {
    const allProjectsArray: Array<Project> = [];
    const res = await fetch(`${isProduction}/projects`);
    const data: ProjectData[] = await res.json();
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

  async function fetchCategories(): Promise<void> {
    const response = await fetch(`${isProduction}/tagNames`);
    const data: Array<{ tag_name: '' }> = await response.json();
    const cleanedTags: Array<string> = data.map((single) => {
      return single.tag_name;
    });
    setProjectCategories(cleanedTags);
  }

  useEffect(() => {
    setFilteredProjects(filterByTags());
  }, [selectedProjectCategories]);

  function handleProjectCategoryClick(event: any) {
    !selectedProjectCategories.includes(event.target.innerText)
      ? setSelectedProjectCategories((selectedProjectCategories) => [
          ...selectedProjectCategories,
          event.target.innerText,
        ])
      : setSelectedProjectCategories((selectedProjectCategories) =>
          selectedProjectCategories.filter(
            (category) => category !== event.target.innerText
          )
        );
  }

  function filterByTags() {
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
    return uniqueprojectsUnderTag;
  }

  function handleSubmit(event: any): void {
    event.preventDefault();
    if (filteredProjects.length) {
      const newFilter = filteredProjects.filter((project) => {
        return project.project_name
          .toLowerCase()
          .includes(searchInputRef.current.value.toLowerCase());
      });
      if (newFilter.length) {
        setFilteredProjects(newFilter);
      } else {
        window.alert('There is no projects under this filters.');
      }
    } else {
      setFilteredProjects(() => {
        return allProjects.filter((project) => {
          return project.project_name
            .toLowerCase()
            .includes(searchInputRef.current.value.toLowerCase());
        });
      });
    }
    searchInputRef.current.value = '';
  }

  return (
    <main className={styles.main}>
      <div>
        <h1>Projects</h1>
        <div className={styles.addOrSearchContainer}>
          <button onClick={() => setShowModal(true)}>+ Add Project</button>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                ref={searchInputRef}
                className="searchInput"
                placeholder="Search for your project..."
                required
              />
              <button type="submit" className="searchButton">
                Search
              </button>
            </div>
          </form>
        </div>
        <NewProjectModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          projectCategories={projectCategories}
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
            {filteredProjects.length
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
