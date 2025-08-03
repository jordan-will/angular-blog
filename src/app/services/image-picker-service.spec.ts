import { TestBed } from '@angular/core/testing';
import { ImagePickerService } from './image-picker-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ImagePickerService', () => {
  let service: ImagePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ImagePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve base64 string when a file is selected', async () => {
    const input = document.createElement('input');
    input.type = 'file';

    // Simula um arquivo de imagem
    const blob = new Blob(['fake image content'], { type: 'image/png' });
    const file = new File([blob], 'test.png', { type: 'image/png' });

    // Simula o evento de seleção de arquivo
    Object.defineProperty(input, 'files', {
      value: [file],
    });

    // Espiona o método click para evitar interação real
    spyOn(input, 'click').and.callFake(() => {
      // Simula o evento 'change' após o click
      input.dispatchEvent(new Event('change'));
    });

    const base64 = await service.pickImage(input);

    expect(base64).toBeTruthy(); // Verifica se retornou algo
    expect(typeof base64).toBe('string');
  });

  it('should resolve null when no file is selected', async () => {
    const input = document.createElement('input');
    input.type = 'file';

    Object.defineProperty(input, 'files', {
      value: [],
    });

    spyOn(input, 'click').and.callFake(() => {
      input.dispatchEvent(new Event('change'));
    });

    const result = await service.pickImage(input);
    expect(result).toBeNull();
  });

});
