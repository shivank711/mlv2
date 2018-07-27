import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  constructor(private http : HttpClient) { }

getdescrip(file:File){

    const url = "http://localhost:5004/missing/`$(file.name)`";

    return this.http.get(url).subscribe(data =>{

    	data = data;
    	console.log(data);
    })
}




}
