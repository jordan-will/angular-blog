import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagePickerService {

  private BASE64_PREFIX = 'data:image/jpg;base64,';

  pickImage(inputHtml:HTMLInputElement):Promise<string|null>{
    return new Promise((resolve, reject)=>{
      const listener = () =>{
        const file = inputHtml.files![0]
        if(!file){
          resolve(null)
          return
        }
        const reader = new FileReader()
        
        reader.onload = () => {
          const result = reader.result as string
          const base64 = result.split(',')[1]
          resolve(base64)
        }

        reader.onerror = (error) =>{
          console.log('Error on reading file ', error)
          resolve(null)
        }

        reader.readAsDataURL(file)
      }//END LISTENER

      inputHtml.addEventListener('change', listener)
      inputHtml.click()
    })
  } 

  get Base64Prefix(): string {
    return this.BASE64_PREFIX;
  }
}
