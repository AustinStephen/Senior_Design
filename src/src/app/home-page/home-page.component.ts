import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  @ViewChild('formStart', { static: false }) formStart!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  scrollToForm(): void {
    this.formStart.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
