import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../models/blog-image.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: ''
  });

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`https://nerdommicro-001-site1.ctempurl.com/api/images`);
  }


  //These local variables are exact case as the API variables
  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<BlogImage>(`https://nerdommicro-001-site1.ctempurl.com/api/images`, formData);
  }

  selectImage(image: BlogImage): void {
    this.selectedImage.next(image); //emits the new value on select
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable(); //this is the method that other components will subscribe to in order to access the url in the parent component
  }

}
