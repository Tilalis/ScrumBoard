import { IterationItem } from './iteration-item';

export class Iteration {
  constructor(name: string) {
    this.name = name;
    this.todo = [];
    this.doing = [];
    this.done = [];
  }
  name: string;
  todo: IterationItem[];
  doing: IterationItem[];
  done: IterationItem[];
}
