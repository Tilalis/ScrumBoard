import { IterationItem } from './iteration-item';

export class Backlog {
  project_id: number;
  items: IterationItem[];

  constructor(project_id: number) {
    this.project_id = project_id;
  }
}
