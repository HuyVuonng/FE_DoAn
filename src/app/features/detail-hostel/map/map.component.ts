import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, AfterContentChecked {
  @Input() source: string;
  @Input() height: number = 300;
  iframe: string;
  constructor(public sanitizer: DomSanitizer) {}
  ngAfterContentChecked(): void {
    this.iframe = `<div style="width: 100%"><iframe width="100%" height=${this.height} frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${this.source}"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>`;
  }
  ngOnInit(): void {
    this.iframe = `<div style="width: 100%"><iframe width="100%" height=${this.height} frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${this.source}"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>`;
  }
}
