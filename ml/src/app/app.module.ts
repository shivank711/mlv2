import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule} from'@angular/platform-browser/animations'; 
import { FormsModule} from '@angular/forms';
import { MatInputModule} from '@angular/material';
import { CommonModule } from '@angular/common';
import { MatDividerModule} from '@angular/material/divider';
import { ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { DatasourceComponent } from './datasource/datasource.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { DragdropComponent } from './dragdrop/dragdrop.component';
import { BodyComponent } from './body/body.component';
import {MatProgressBarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { PapaParseModule } from 'ngx-papaparse';
import {UploaderService} from './sidenav/uploader.service';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DescriptionService} from './sidenav/description.service';
import 'hammerjs';
import {enableProdMode} from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import {DataprepService} from './dataprep/dataprep.service';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { DataprepComponent } from './dataprep/dataprep.component';

const appRoutes: Routes = [
{path :'dataprep.component.html', component : DataprepComponent}
];




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SidenavComponent,
    DatasourceComponent,
    DragdropComponent,
    BodyComponent,
    DataprepComponent
    
  ],
  imports: [
  
  CdkTableModule,
    MatIconModule,    
    BrowserModule,
    FlexLayoutModule,
    MatToolbarModule,
    HttpClientModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatDialogModule,
    CommonModule,
    PapaParseModule,
    MatTableModule,
    MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule,
  RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [ 
    UploaderService,
    DescriptionService,
    DataprepService,
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
