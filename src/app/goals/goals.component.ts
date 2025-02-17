import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss',
})
export class GoalsComponent {
  constructor(private router: Router, private ar: ActivatedRoute) {}

  goToGoalForm() {
    this.router.navigate(['goal-form'], { relativeTo: this.ar });
  }
}
