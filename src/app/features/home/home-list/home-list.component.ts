import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ItemComponent } from '../../../core/components/item/item.component';

@Component({
  selector: 'app-home-list',
  standalone: true,
  imports: [TranslateModule, ItemComponent],
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeListComponent {
  @ViewChild('swiper') swiper!: ElementRef<any>;
  ngAfterViewInit(): void {
    const swiper = {
      // Default parameters
      slidesPerView: 1,
      spaceBetween: 10,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    };
    Object.assign(this.swiper.nativeElement, swiper);
    this.swiper.nativeElement.initialize();
  }
}
