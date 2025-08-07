import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideQuillConfig, QuillModules } from 'ngx-quill/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // botões de estilo
          ['blockquote', 'code-block'],                     // bloco de citação e código
          [{ header: 1 }, { header: 2 }],                   // títulos
          [{ list: 'ordered' }, { list: 'bullet' }],        // listas
          [{ script: 'sub' }, { script: 'super' }],         // subscrito/sobrescrito
          [{ indent: '-1' }, { indent: '+1' }],             // recuo
          [{ direction: 'rtl' }],                           // direção do texto
          [{ size: ['small', false, 'large', 'huge'] }],    // tamanhos
          [{ header: [1, 2, 3, 4, 5, 6, false] }],          // cabeçalhos
          [{ color: [] }, { background: [] }],              // cores
          [{ font: [] }],                                   // fontes
          [{ align: [] }],                                  // alinhamento
          ['clean'],                                        // limpar formatação
          ['link', 'image']                                 // mídias
        ]
      },
      theme: 'bubble'
    }
    )
  ]
};
