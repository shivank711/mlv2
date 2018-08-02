import { Component, OnInit } from '@angular/core';
import {DataprepService} from '../dataprep/dataprep.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.css']
})
export class AlgorithmComponent implements OnInit {
	dependent_var:any;
	interests : any = [] ;
	selvarr : any[] = [];
	val : any = [];
	algorithm : string[] = [];
	algo : any;
	selAlgo : string;
  constructor(private dataprepSerice : DataprepService) { }

  ngOnInit() {

  	this.interests = this.dataprepSerice.selvars;
 	console.log(this.interests);
 	var len = this.interests.interests.length;
 	for(var i= 0; i<len; i++){
 		this.selvarr.push({
 			val : this.interests.interests[i],
 		})	
 	}
 	this.algorithm = ["Linear Regression",
"Logistics Regression",
"Random Forest",
"Decision Trees",
"Naïve Bayes",
"SVM",
"Deep Learning",
"Kmeans"
]

}
onChange(event){

console.log(event)
this.dependent_var = event.value;

}
onAlgoChange(event){
	console.log("the algo event object ------===== >>>>>")
console.log(event)
this.algo = event.value;

}
  showinterests(){

  	console.log(this.selvarr)
  }
}
