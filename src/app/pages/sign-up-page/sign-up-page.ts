import { Component} from '@angular/core';
import { Avatar } from '@components/avatar/avatar';
import { ImagePickerService } from '@services/image-picker-service';

@Component({
  selector: 'app-sign-up-page',
  imports: [Avatar],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.scss'
})
export class SignUpPage {
  url:string = ''
  
  updateAvatar(string: string){
    console.log('Avatar updated with:', string)
    this.url = string
  }
}
