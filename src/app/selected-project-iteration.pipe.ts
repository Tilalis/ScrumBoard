import { Pipe, PipeTransform } from '@angular/core';

import { SelectedService } from './selected.service';
import { Project } from './project';
import { Iteration } from './iteration';

@Pipe({
  name: 'selectedProjectIteration',
  pure: false
})
export class SelectedProjectIterationPipe implements PipeTransform {
  constructor(private selectedService: SelectedService) {}

  transform(value: Iteration[], project_id: number): Iteration[] {
    if (value === undefined || project_id < 0 || project_id === undefined) {
      return [];
    }

    let result: Iteration[] = value.filter(
      iteration => iteration.project_id === project_id
    )
    return result;
  }

}
