import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,

    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  isCollapsed: boolean = false;
  language: string = 'vi';
  isReverseArrow = false;
  width = 280;
  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {}
  handleLogout() {}
  changeLanguage(e: any) {
    this.language = e;
    this.translate.use(this.language);
    this.cdr.detectChanges();
  }
}
