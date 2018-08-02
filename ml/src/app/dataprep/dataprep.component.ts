import { Component, OnInit } from '@angular/core';
import {UploaderService} from '../sidenav/uploader.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {DataprepService} from './dataprep.service';

var variables: any;
var dummyData : any;
 
@Component({
  selector: 'app-dataprep',
  templateUrl: './dataprep.component.html',
  styleUrls: ['./dataprep.component.css'],
  
})
export class DataprepComponent implements OnInit {
dis_dat : any = [];
dis_col : any = [];
col : any = [];
val : any = [];
  interestFormGroup : FormGroup
  interests:any;
  selected: any;
singleArray : any[] = [];
  constructor(private uploaderService : UploaderService, private formBuilder: FormBuilder, private dataprepService : DataprepService
  ) {
  	// this.variables = this.uploaderService.displayedColumn;
  this.variables = this.uploaderService.displayedColumn;
   }
  ngOnInit() {
  	this.variables = this.uploaderService.displayedColumn;
  	this.interestFormGroup = this.formBuilder.group({
      interests: this.formBuilder.array([])
    });
  	setTimeout((res) => {
      this.interests = this.variables;
    });
 	this.dataprepService.findmissing().subscribe(data =>{
 		this.col  = Object.keys(data);
 		this.val = Object.values(data);
 	
 	for (var _i = 0; _i < this.col.length; _i++) {
    this.singleArray.push({
                         cols: this.col[_i],
                         vals: this.val[_i] 
                        });
	}
	})
 	this.dataprepService.senddescription().subscribe(data => {
 		console.log("this is in data description ---->>>");
 		console.log(data);
 		this.dis_dat = data;
 		this.dis_col = ["count" ,"mean" ,"std", "min", "25%", "50%" ,"75%" ,"max"];
 		this.variables = this.uploaderService.displayedColumn;
 		
 		//console.log(Object.keys(data));

 		for (let key of Object.keys(data)) {  
 		 for(let darr of Object.values(data[key])){
  				console.log(darr);

			}
		}
		 debugger;


 		// for(let varr in data){
 		// 	for(let darr of this.dis_col){
 		// 	console.log(varr[darr])	
 		// 	}
 			
 		// } 
 	})

  }

onChange(event) {
    const interests = <FormArray>this.interestFormGroup.get('interests') as FormArray;
    if(event.checked) {
      interests.push(new FormControl(event.source.value))
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      interests.removeAt(i);
    }
}
  submit() {
    console.log(this.interestFormGroup.value);
    console.log("sending data in sendvaribales");	
    this.dataprepService.sendvariables(this.interestFormGroup.value);
  }
  ngDoCheck(){

  	  // this.variables = this.uploaderService.displayedColumn;
  	  // console.log("this is in the data prep component");
  	  this.variables = this.uploaderService.displayedColumn;
  	   console.log(this.variables);

  }
  // getdescription(){
  // 	this.dataprepService.senddescription()
  // }

  // get(){
  // 	console.log(this.dataprepService.findmissing())

  // }

  // ngAfterViewChecked(){
  // 	this.variables = this.uploaderService.displayedColumn;
  	
  // 	console.log(this.variables)
  // }
   variables = this.uploaderService.displayedColumn;
   dummyData = this.uploaderService.dummydata;
  
  getmissing(){

  	console.log(this.dataprepService.findmissing())

  }

  display(){

  	console.log("variables in the data are as follows")
  	console.log(this.uploaderService.displayedColumn)


  }

}
