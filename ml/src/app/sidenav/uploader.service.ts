import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import {Response} from '@angular/http';
import {Input} from '@angular/core'
import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { PapaParseService } from 'ngx-papaparse';


@Injectable()
export class UploaderService {
  data: any = {};
  csvData: any[] = [];
  parseData : any;
  dataArray : any;
  dataSource : any;
  displayedColumn: any;
  results :any[] = [];
  constructor(
    private http: HttpClient,
    private papa: PapaParseService
    ) {
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }


  private extractData(data){

    let Data = data;
    console.log("in the extract function ")
    
    let allTextLines = Data.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    //console.log(headers);
    let lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
               
            }
            lines.push(tarr);
            
            //console.log(tarr);
        }
    }
    Data = lines;
    this.csvData = Data;
    console.log("this........csvdata--->>>>>>>>>>>>>>>>>>>>");
    console.log(this.csvData);
    

  }

  upload(file: File) {
// csv file should not contain spaces in header names;
    if (!file) { return; }
    const vm = this;
    console.log(file.name)
    
     const formData = new FormData();

      formData.append('file',file);
    
    console.log(formData);
    
    const url = "http://localhost:5004/upload";
    console.log("after urll post");
    
    console.log("in the upload service");
    
    const httpOptions = {
      reportProgress: true,
      responseType: 'text' as 'text'
    };
         
         return this.http.post(url, formData, httpOptions).subscribe(data => {
           console.log("subscribe data ---->>")
           console.log(data);
           this.parseData = data;
           
           this.papa.parse(data,{
             header : true,
             delimiter : ',',
             skipEmptyLines : true,
             complete : (results) => {
                this.parseData = results;
             }

           })
           this.dataSource = this.parseData.data;
           this.displayedColumn = this.parseData.meta.fields;
           console.log("DATA")
           console.log(this.displayedColumn)
           console.log("this.parsedata.fields[0]----------====== - >")
           console.log(this.parseData.meta.fields[0])
           err => this.handleError(err);          
           console.log(this.parseData.data)

           function getFields(input, field){
             var output= [];
             for(var i = 0; i<input.length; i++){
               output.push(input[i][field]);
             }
             return output;
           }
           
           for( var i =0; i< this.parseData.meta.fields.length; i++){
           this.results[this.parseData.meta.fields[i]] = getFields(this.parseData.data, this.parseData.meta.fields[i])           
           
           }
           console.log("data array from service")
           console.log(this.results)

  })
         
  }
}



