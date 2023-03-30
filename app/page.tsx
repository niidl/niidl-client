'use client';
import styles from './page.module.scss';
import { useEffect, useState, useRef } from 'react';
import ProjectCategory from '@/components/ProjectCategory';
import ProjectInstance from '@/components/ProjectInstance';
import NewProjectModal from '@/components/NewProjectModal';
import CookieModal from '@/components/CookieModal';
import Cookies from 'js-cookie';

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

const userName: string | undefined = Cookies.get('userName');
const sessionId: string | undefined = Cookies.get('sessionToken');

export default function Home() {
  const [projectCategories, setProjectCategories] = useState<Array<string>>([]);
  const [projectTypes, setProjectTypes] = useState<Array<string>>([]);
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(false)
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
  const [allGHProjects, setAllGHProjects] = useState<Project[]>([
    {
      id: 0,
      project_name: '',
      tags: [],
    },
  ]);

  //////////////////////function//////////////////////////////////////////
  const [showVim, setShowVim] = useState<Boolean>(false);
  const [demoGHProjects, setdemoGHProjects] = useState<Project[]>([
    {
      id: 0,
      project_name: '',
      tags: [],
    },
  ]);
  //////////////////////function//////////////////////////////////////////

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [tagsOnly, setTagsOnly] = useState<Array<string>>([]);
  const [langOnly, setLangOnly] = useState<Array<string>>([])
  const [showModal, setShowModal] = useState<boolean>(false);
  const searchInputRef = useRef<any>();

  let acceptedAllCookies:string|undefined = 'base'
  acceptedAllCookies = Cookies.get('AcceptedCookies')

  useEffect(() => {
    fetchAllProjects();
    fetchCategories();
    fetchGitHubProjects();
    fetchProjectTypes();
    fetchLanguage();
    fetchTags();
    fetchDemoGitHubProjects();
  }, []);

  useEffect(() => {
    cookieAcceptCheck();
  }, [acceptedCookies])

  //////////////////////FetchingDemo//////////////////////////////////////////
  async function fetchDemoGitHubProjects(): Promise<any> {
    const gitHubProjectsArray: Array<Project> = [];
    const gitHubResponse = await fetch(`${isProduction}/githubProjectsDemo`);
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
    setdemoGHProjects(gitHubProjectsArray);
  }
  /////////////////////////////^^^ FetchingDemo ^^^///////////////////////////////

  async function cookieAcceptCheck(){
    if (acceptedAllCookies === 'Accepted' || acceptedAllCookies === 'Declined')
    return setAcceptedCookies(true)
  }

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
    setAllGHProjects(gitHubProjectsArray);
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

  async function fetchTags(): Promise<void>{
    const response = await fetch(`${isProduction}/tagNames/tagOnly`);
    const data: Array<{tag_name:''}> = await response.json();
    const cleanedTags: Array<string> = data.map((single)=>{
      return single.tag_name
    })
    setTagsOnly(cleanedTags)
  }

  async function fetchLanguage(): Promise<void>{
    const response = await fetch(`${isProduction}/tagNames/langOnly`);
    const data: Array<{tag_name:''}> = await response.json();
    const cleanedTags: Array<string> = data.map((single)=>{
      return single.tag_name
    })
    setLangOnly(cleanedTags)
  }

  async function fetchProjectTypes(): Promise<void> {
    const response = await fetch(`${isProduction}/projectTypes`);
    const data: Array<{ type: '' }> = await response.json();
    const cleanedTypes: Array<string> = data.map((single) => {
      return single.type;
    });
    setProjectTypes(cleanedTypes);
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
    let uniqueProjectsUnderTag: Project[] = [];
    let currentProjects: Project[] = [];
    setShowVim(false); //DemoVar

    if (selectedProjectCategories.includes('Based on Github')) {
      currentProjects = allGHProjects;
      setShowVim(true); //DemoVar
    } else {
      currentProjects = allProjects;
    }
    for (let i = 0; i < selectedProjectCategories.length; i++) {
      if (i === 0) {
        currentProjects.map((project) => {
          if (project.tags.includes(selectedProjectCategories[i])) {
            projectsUnderTag.push(project);
          }
        });
        uniqueProjectsUnderTag = projectsUnderTag;
      } else {
        uniqueProjectsUnderTag = [];
        projectsUnderTag.map((project) => {
          if (project.tags.includes(selectedProjectCategories[i])) {
            uniqueProjectsUnderTag.push(project);
          }
        });
        projectsUnderTag = uniqueProjectsUnderTag;
      }
    }
    return uniqueProjectsUnderTag;
  }

  function handleSubmit(event: any): void {
    event.preventDefault();
    ///Demo if
    if (
      searchInputRef.current.value.toLowerCase() === 'vim' &&
      showVim === true
    ) {
      setFilteredProjects(demoGHProjects);
      //Demo if
    } else {
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
  }

  return (
    <main className={styles.main}>
      <div>
      <div> {!acceptedCookies  && (<CookieModal SetAcceptedCookies={setAcceptedCookies}/>)} </div>
        <h1>Projects</h1>
        <div className={styles.addOrSearchContainer}>
          <button onClick={() => setShowModal(true)}>+ Add Project</button>

          <form onSubmit={handleSubmit}>
            <div className='relative'>
              <input
                type='search'
                id='default-search'
                ref={searchInputRef}
                className='searchInput'
                placeholder='Search for your project...'
                required
              />
              <button type='submit' className='searchButton'>
                Search
              </button>
            </div>
          </form>
        </div>
        <NewProjectModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          projectCategories={projectCategories}
          tagsOnly={tagsOnly}
          langOnly={langOnly}
          projectTypes={projectTypes}
          userName={userName}
          sessionId={sessionId}
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
