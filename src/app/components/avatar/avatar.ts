import { CommonModule } from '@angular/common';
import { Component, inject, input, viewChild, ElementRef, output } from '@angular/core';
import { ImagePickerService } from '@services/image-picker-service';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss'
})
export class Avatar {
  fileIput = viewChild<ElementRef<HTMLInputElement>>('fileInput')

  url = input<string>()
  typeMedia = input<'avatar' | 'cover'>('avatar')
  imagePicker = inject(ImagePickerService)
  selectedImageEmitter = output<string>()

  async onSelectImage() {
    const file = await this.imagePicker.pickImage(this.fileIput()?.nativeElement as HTMLInputElement)
    if (!file) return;
    this.selectedImageEmitter.emit(this.imagePicker.Base64Prefix + file);
  }

}
