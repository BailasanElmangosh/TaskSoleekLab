import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase , AngularFireList } from '@angular/fire/database';
import {Router} from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {


   
  itemList:AngularFireList<any>;
  selectFile=null;
  itemArray=[];
  imageUrl:any;
  index:any;
  constructor(public af:AngularFireDatabase ,public route:Router) {
    this.itemList=af.list('products');
         
      //get all product
      this.itemList.snapshotChanges().subscribe(actions=>{
      this.itemArray=[];
      actions.forEach(action=>{
        let y =action.payload.toJSON()
        y['$key']=action.key;
        this.itemArray.push(y as ListItemClass)
        this.index=this.itemArray.length;
        //get image url
        let storgeRef=firebase.storage().ref();
        let spaceRef=storgeRef.child(this.itemArray[this.itemArray.length-1].path);
        spaceRef.getDownloadURL().then((url)=>{
          for(let i=0; i<this.itemArray.length;i++)
          {
            if(this.itemArray[i].$key==y['$key'])
            {
              this.itemArray[i].image=url
            }
          }
    
        }).catch((error)=>
        {
          console.log(error);
        })
      })

    })
   }

  ngOnInit() {
  }

}
export class ListItemClass
{
  name:string;
  category:string;
  date:string;
  image:string;
  price:string; 
  path:string; 

}