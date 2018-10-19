import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase , AngularFireList } from '@angular/fire/database';
import {Router} from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {
   
  data=
  { sku:'',
    name:'',
    category:'',
    price:'',
    date:'',
    image:'',
    path:''
  }
  folder:any;
  itemList:AngularFireList<any>;
  selectFile=null;
  itemArray=[];
  imageUrl:any;
   index:any;
   key:any;
  constructor(public af:AngularFireDatabase ,public route:Router ,private storage: AngularFireStorage) 
  {

    this.itemList=af.list('products');
    this.folder="images";
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
    //add prouct
    insertProduct()
    { 
      let newProduct=
      { sku:this.data.sku,
       name:this.data.name,
        category:this.data.category,
        price:this.data.price,
        date:this.data.date,
        image:this.data.image,
        path:this.data.path
      }
    
      let storgeRef=firebase.storage().ref();
     for(let selectFile of[(<HTMLInputElement>document.getElementById('image')).files[0]] )
     {
       let path ='/images/'+selectFile.name;
       let iRef = storgeRef.child(path);
       iRef.put(selectFile).then((snapshot)=>{
         newProduct.image=selectFile.name;
         newProduct.path=path;
        this.itemList.push(newProduct)
       })
       
     }
     this.data.sku='';
     this.data.name='';
      this.data.category='';
     this.data.price='';
      this.data.date='';
     this.data.image='';
     this.data.path='';
    this.itemArray=[];
      this.route.navigate(['/CRUD']);
    }

    editForm($key)
    {
      for(let value of this.itemArray)
      {
        if(value['$key']==$key)
        {
           this.data.sku=value['sku'];
          this.data.name= value['name'];
          this.data.category= value['category'];
          this.data.price= value['price'];
          this.data.date= value['date'];
          this.data.image= value['image'];
          this.data.path= value['path'];
          this.key=$key
        }
      }
    }
  //edit product
  editProduct()
  {
    this.itemList.set(this.key,{
      sku:this.data.sku,
      name:this.data.name,
      category:this.data.category,
      price:this.data.price,
      date:this.data.date,
      image:this.data.image,
      path:this.data.path
      
    })
    document.getElementById('editModal').classList.remove('.show');
    
    this.route.navigate['/CRUD']
  }

  //delete product
  delete(key)
  {
   this.itemList.remove(key);
   alert('Deleted')
   this.itemArray=[];
   this.route.navigate(['/CRUD']);

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