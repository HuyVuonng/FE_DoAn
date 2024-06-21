import {
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
export class MapComponent implements OnInit {
  @Input() source: string;
  iframe: string;
  constructor(public sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.iframe = `<div style="width: 100%"><iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${this.source}"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>`;
  }
}
