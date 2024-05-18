import { Component, inject } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../../../environments/environment';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  storage = inject(Storage);
  ChangeImage(e: any) {
    const file = e.target.files[0];
    console.log(file);
    const imgRef = ref(this.storage, `images/${new Date().getTime()}`);
    uploadBytes(imgRef, file).then((res) => {
      getDownloadURL(res.ref).then((url) => {
        console.log(url);
      });
    });
  }
}
