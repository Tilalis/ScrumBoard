import { Iteration } from './iteration';
import { IterationItem } from './iteration-item';

export class Project {
  public _id : string;
  public name: string;
  public backlog: IterationItem[];
  public iterations: Iteration[];

  constructor(_id : string, name: string, backlog: IterationItem[], iterations: Iteration[]) {
    this._id = _id;
    this.name = name;
    if (backlog === null || backlog === undefined) {
      this.backlog = [];
    }
    if (iterations === null || iterations === undefined) {
      this.iterations = [];
    }
  }
}
