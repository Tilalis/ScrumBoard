import { IterationItem } from './iteration-item';

export class Project {
  public id : number;
  public name: string;
  public backlog: IterationItem[];

  constructor(id : number, name: string, backlog: IterationItem[]) {
    this.id = id;
    this.name = name;
    if (backlog === null ||backlog === undefined) {
      this.backlog = [];
    }
  }
}
