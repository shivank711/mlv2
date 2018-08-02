import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';

import {Response} from '@angular/http';
import {Input} from '@angular/core'


@Injectable()

export class DescriptionService {

miss: any;

col : any[] =[];
val : any[] = [];

  constructor(private http : HttpClient) { }

getmissing(file:File){
	console.log("in the missing service")
	console.log(file);
	 var filename = file.name
    // var url = "http://localhost:5004/missing/" + `$(filename)`;
    //var url = `http://localhost:5004/missing/$(filename)`;
     var url = "http://localhost:5004/missing/"+filename;
    console.log(url);

    return this.http.get(url).subscribe(data =>{

    	this.miss = data;
    	//for(let i in Object.keys(this.miss)
    	this.col = Object.keys(this.miss)
    	this.val = Object.values(this.miss)
    	console.log(this.miss)
    })
}




}
