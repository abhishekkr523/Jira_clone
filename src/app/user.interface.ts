export interface Task {
    taskId: number;
    taskName: string;
    description: string;
    assignee: string;
    status: string;
    storyPoints: string;
  }
  
  export interface Sprint {
    sprintId: number;
    sprintName: string;
    tasks: Task[];
  }
  
  export interface Project {
    projectId: number;
    projectName: string;
    projectKey: string;
    isStar: boolean;
    sprints: Sprint[];
  }
  
  export interface ProjectList {
    projects: Project[];
  }
  