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
  url = input<string>()
  imagePicker = inject(ImagePickerService)
  fileIput = viewChild<ElementRef<HTMLInputElement>>('fileInput')
  selectedImageEmitter = output<string>()

  async onSelectImage() {
    const file = await this.imagePicker.pickImage(this.fileIput()?.nativeElement as HTMLInputElement)
    if (!file) return;
    this.selectedImageEmitter.emit(this.imagePicker.Base64Prefix + file);
  }

}
