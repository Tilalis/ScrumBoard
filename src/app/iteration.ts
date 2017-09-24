import { IterationItem } from './iteration-item';

export class Iteration {
  constructor(project_id: number, name: string) {
    this.project_id = project_id;
    this.name = name;
    this.todo = [];
    this.doing = [];
    this.done = [];
  }
  project_id: number;
  name: string;
  todo: IterationItem[];
  doing: IterationItem[];
  done: IterationItem[];
}
