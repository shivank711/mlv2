import { Injectable } from '@angular/core';
import {UploaderService} from '../sidenav/uploader.service';
import {DataprepService} from '../dataprep/dataprep.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
rsqr:any;
vars : any ;
dependentvar : any;
selectAlgo : any;
  constructor(private http : HttpClient ,private uploaderService : UploaderService, private dataprepService: DataprepService) {

   }

createmodel(dep, algo, value, depth, leaf, split, n){

console.log("create model")
//this.vars = this.dataprepService.selvars;
var file = this.uploaderService.filename;
this.vars = encodeURIComponent(JSON.stringify(this.dataprepService.selvars));
//this.dependentvar = encodeURIComponent(JSON.stringify(dep));
//this.selectAlgo = encodeURIComponent(JSON.stringify(algo));
this.dependentvar = dep;
this.selectAlgo = algo;
//var url = "http://localhost:5004/algorithm/"+file+"/"+this.vars +"/"+this.selectAlgo ;
//var url = "http://localhost:5004/algorithm/" + file+"/"+this.selectAlgo+"/"+this.dependentvar+"/"+this.vars+"/"+value; 
//this.http.get(url);
// var url = "http://localhost:5004/algorithm/" + file+"/" +this.selectAlgo+"/"+this.dependentvar+"/"+ this.vars+"/"+value; 
var url = "http://localhost:5004/algorithm/" + file
let prams = {
	value : value,
	dependentvar : dep,
	algo : algo,
	variables : this.dataprepService.selvars
}
console.log(prams)

return this.http.post(url, {
	value : value,
	dependentvar : dep,
	algo : algo,
	variables : this.dataprepService.selvars,
	max_depth : depth,
	min_samples_leaf : leaf,
	min_samples_split : split,
	n_estimators: n	
}).subscribe(data =>{
    data = data;
    console.log(data);
    this.rsqr = data;
  });

}

}







