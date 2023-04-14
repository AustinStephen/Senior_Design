import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent implements OnInit {
  sigmoidFunc: string;

  constructor() {
    this.sigmoidFunc = '$Pr(d) = \\frac{1}{0.84 + 1.05^{(d-40)}}$';
  }

  ngOnInit(): void {}
}
