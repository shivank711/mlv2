import { Component, OnInit, ViewChild } from '@angular/core';
import {DatasourceComponent} from '../datasource/datasource.component';
import {UploaderService} from './uploader.service';
import {Input} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs';
import 'rxjs/add/observable/of';
import {enableProdMode} from '@angular/core';
import {DescriptionService} from './description.service'
enableProdMode();
// export class columns {
//   ColumnDef : string;
//   Header : string;
//   cell : string;
// }
var arr = [];
var col : any = {};
const DATA : any[] = [];
var columns : any = {};
var arry : any[] = [];
var dummyData : any[] = [];
var dataSource : any[] = [];
var displayedColumn : any[] =[];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers : [UploaderService]
})

export class SidenavComponent implements OnInit {
  

  constructor(public uploaderService: UploaderService, public descriptionService : DescriptionService) {
     
 
 this.displayedColumns = this.uploaderService.displayedColumn;
 this.dataSource = new MatTableDataSource(this.uploaderService.dataSource);
     // this.dataSource.paginator = this.paginator;
   }
 @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 col = this.uploaderService.displayedColumn;

ngDoCheck()  {

 this.displayedColumns = this.uploaderService.displayedColumn;
 this.dataSource = new MatTableDataSource(this.uploaderService.dataSource);

 this.dataSource.sort = this.sort;  
}

 displayedColumns = this.uploaderService.displayedColumn;
 dataSource = new MatTableDataSource(this.uploaderService.dataSource);

// dummyData = {

//   columnName : this.displayedColumns,
//   dataSource : this.dataSource,

// }
  ngOnInit() {
 
 this.dataSource.paginator = this.paginator;        
  }

// getDummyData() {
//     console.log(this.dummyData.columnName)
//     return this.dummyData.columnName;
//   }
  onPicked(input: HTMLInputElement) {
    console.log("-----<<<< in to the pick function ");
    const file = input.files[0];
    const data = '';
    if (file) {
      this.uploaderService.upload(file);    
    }

  }


//     getdata(){
//       col = this.uploaderService.displayedColumn;
//       if(col != undefined){
//       for(var i=0; i<this.uploaderService.displayedColumn.length; i++){
//         arr.push({
//           header : col[i],
//           columnDef : col[i],
//           cell : this.uploaderService.results[col[i]]
//         })
//       }
//      console.log(arr)
//      return arr  
//   }


// }

  ds(){
    console.log(this.uploaderService.dataSource)
    return this.uploaderService.dataSource


  }
  dc(){
    console.log(this.uploaderService.displayedColumn)
    return this.uploaderService.displayedColumn
    
  }
  display(){
    // console.log(this.displayedColumns)
    // console.log(this.dataSource)
    // if(this.col != undefined){
    // console.log("data from for each statement")
    // this.col.forEach((item)=>{
    //   console.log(item)
    // });
    // return this.uploaderService.displayedColumn
    //   }
     col = this.uploaderService.displayedColumn
    // console.log(this.uploaderService.displayedColumn)
    // console.log(col)
    // for (let item in col){
    //   arr.push({
    //     Header : col[item],
    //     ColumnDef :  col[item],
    //     cell : this.uploaderService.results[col[item]],
    //   })
    // }
    // console.log(arr)
    var time = 0;
    if(col!=undefined ){
    for( var i =0; i<this.uploaderService.displayedColumn.length; i++){
      arr.push({
        Header : col[i],
        ColumnDef : col[i],
        cell : this.uploaderService.results[col[i]]
      })

    }
    
    // console.log(arr)
    
    return 
  }
  console.log(arr)
  }
}
// export class ExampleDataSource extends DataSource<any> {
//   * Connect function called by the table to retrieve one stream containing the data to render. 
//   connect(): Observable<Element[]> {
//     return of ({
//       data : ,
//     });
//   }

//   disconnect() {}
// }

// getTranslation(lang: string): Observable<any> {
//     return of({
//       lbl_select: 'Select',
//     });
//   }

