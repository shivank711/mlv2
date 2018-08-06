import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UploaderService} from '../sidenav/uploader.service';
@Injectable({
  providedIn: 'root'
})
export class DataprepService {
variables : any = [];
 val : any = [];
 col : any = [];
  selvars : any = [];
  constructor(private http : HttpClient, private uploaderService : UploaderService) { }


sendvariables(args: any[]){

	console.log(args);
	this.selvars = args;
	this.variables = encodeURI(JSON.stringify(args));
	var file = this.uploaderService.filename;
	var url = "http://localhost:5004/selectvariable/" + file + "/" + this.variables;
	console.log(this.variables)
}

findmissing(){

	var url = "http://localhost:5004/missing/" + this.uploaderService.filename;
	//console.log(url);
	return this.http.get(url)
	

}

senddescription(){
	var url = "http://localhost:5004/descriptive/" + this.uploaderService.filename;
	return this.http.get(url)

}

findnumeric(){
	var url = "http://localhost:5004/getnumericcol/" + this.uploaderService.filename;
	return this.http.get(url)
}
findcorr(){
	var url = "http://localhost:5004/corr/" + this.uploaderService.filename;
	return this.http.get(url)
}	

}
