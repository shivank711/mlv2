import { Component, OnInit } from '@angular/core';
import {UploaderService} from '../sidenav/uploader.service';
import {Input} from '@angular/core';
import {SidenavComponent} from '../sidenav/sidenav.component';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css'],
  providers:[UploaderService]

})
export class DragdropComponent implements OnInit {

  constructor(private uploaderservice : UploaderService) { 

  }
  
  ngOnInit() {

  	}
  //@Input(): UploaderService 
  
}

