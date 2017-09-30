import { Iteration } from './iteration';
import { IterationItem } from './iteration-item';

export class Project {
  public id : number;
  public name: string;
  public backlog: IterationItem[];
  public iterations: Iteration[];

  constructor(id : number, name: string, backlog: IterationItem[], iterations: Iteration[]) {
    this.id = id;
    this.name = name;
    if (backlog === null || backlog === undefined) {
      this.backlog = [];
    }
    if (iterations === null || iterations === undefined) {
      this.iterations = [];
    }
  }
}
