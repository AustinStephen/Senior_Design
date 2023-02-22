import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  isMobileView: boolean;

  constructor()
  {
    const mql = window.matchMedia('(max-width: 550px)');
    this.isMobileView = mql.matches;
  }

  ngOnInit(): void 
  {
    window.onresize = () => this.isMobileView = window.innerWidth <= 550;
  }
}
