import { Component, OnInit } from '@angular/core';
import {DataprepService} from '../dataprep/dataprep.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import {AlgorithmService} from './algorithm.service';
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
	value : any;
  max_depth : any;
  min_samples_leaf:any;
  min_samples_split:any;
  n_estimators : any;
  bootstrap : any;
  min_weight_fraction_leaf: any;
  max_leaf_nodes:any;
  imgsrc :any;

  imageToShow: any;
  isImageLoading: boolean;


  constructor(private dataprepSerice : DataprepService, private algorithmService: AlgorithmService) { }

  ngOnInit() {
  	this.value = 60;
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
"Random Forest Regressor",
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
  createModel(){
  this.algorithmService.createmodel(this.dependent_var, this.algo, this.value, this.max_depth, this.min_samples_leaf, this.min_samples_split, this.n_estimators, this.min_weight_fraction_leaf, this.max_leaf_nodes)
  }

createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
  }


  createplot(){
    this.algorithmService.plot().subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
        

  }
   
  
}
