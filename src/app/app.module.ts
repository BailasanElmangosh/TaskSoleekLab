import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CRUDComponent } from './components/crud/crud.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes = [
  { path: '',component:ViewProductComponent },
  {path:'CRUD',component:CRUDComponent},
  {path:'product',component:ViewProductComponent}


]

@NgModule({
  declarations: [
    AppComponent,
    CRUDComponent,
    ViewProductComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
