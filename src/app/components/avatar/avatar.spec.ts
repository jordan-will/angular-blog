import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Avatar } from './avatar';
import { provideZonelessChangeDetection } from '@angular/core';
import { ImagePickerService } from '@services/image-picker-service';
import { Component } from '@angular/core'

@Component({
  selector: 'host-avatar',
  template: `<app-avatar [url]="url" (selectedImageEmitter)="onImageSelected($event)"></app-avatar>`,
  standalone: true,
  imports: [Avatar]
})
class HostAvatarComponent {
  url = 'images/avatar.png';
  selectedImage: string | null = null

  onImageSelected(image: string) {
    this.selectedImage = image
  }
}

fdescribe('Avatar', () => {
  let component: HostAvatarComponent;
  let fixture: ComponentFixture<HostAvatarComponent>;
  let mockImagePicker: jasmine.SpyObj<ImagePickerService>

  beforeEach(async () => {

    mockImagePicker = jasmine.createSpyObj('ImagePickerService', ['pickImage'], { Base64Prefix: 'data:image/png;base64,' })

    await TestBed.configureTestingModule({
      imports: [Avatar],
      providers: [
        { provider: ImagePickerService, useValue: mockImagePicker },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HostAvatarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render image when url is set', () => {
    fixture.detectChanges();
    const imageDiv = fixture.nativeElement.querySelector('.avatar__image')
    expect(imageDiv).toBeTruthy()
    expect(imageDiv.style.backgroundImage).toContain('images/avatar.png')
  })

  it('should render default icon when url is not set', async () => {
    component.url = '';
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 0)); // aguarda próxima microtask
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.material-icons');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toContain('person');
  });

  it('should emit selected image when image is picked', async () => {
    const avatarComponent = fixture.debugElement.children[0].componentInstance as Avatar

    spyOn(avatarComponent.imagePicker, 'pickImage').and.returnValue(Promise.resolve('base64Image'))
    spyOnProperty(avatarComponent.imagePicker, 'Base64Prefix', 'get').and.returnValue('data:image/png;base64,')    

    await avatarComponent.onSelectImage()
    fixture.detectChanges()
    expect(component.selectedImage).toBe('data:image/png;base64,base64Image');
  })

});
