export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  lastDate: string;
  type: string;
  description?: string;
}

export interface State {
  code: string;
  name: string;
}

export interface NavigationLink {
  path: string;
  label: string;
}