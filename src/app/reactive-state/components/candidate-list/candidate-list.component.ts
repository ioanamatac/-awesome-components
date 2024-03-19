import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush //modifier une donnée dans le component TypeScript, et de voir le résultat dans le DOM
})
export class CandidateListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
