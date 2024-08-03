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
    startDate:Date;
    duration:number;
    endDate:Date;
    summary:string;
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
  export interface Issue{
    ProjectName:string,
    IssueType: string,
    status:string|undefined,
    summary: string,
    description: string|undefined,
    Assign: string|undefined,
    attachment:string|undefined,
    Label: string|undefined,
    Parent: string|undefined,
    sprint: string|undefined,
    Time:string|undefined,
    Reporter:string,
    LinkedIssue:string|undefined,
    CreateAnotherIssue:string|undefined,
  }
 export interface RelevantData {
    status: string;
    summary: string;
    
  }