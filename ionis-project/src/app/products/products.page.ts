import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { api, Product, clickedCategory, AddToMyCart } from '../services/api';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { Profile } from '../services/profile';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: [Product];
  clickedCategory: clickedCategory;
  addToMyCart:AddToMyCart;

  private _storage: Storage | null = null;

  constructor(private storage:Storage,private api: api, private router: Router, private profile:Profile) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();    
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this._storage = storage;
  }

  presentActionSheet(){
    this.profile.presentActionSheet();
  }

  ngOnInit() {
    var category = "";

    this.api.getClickedCategory().subscribe(response => {
      this.clickedCategory = response;
      category = this.clickedCategory[0].category_name;

      this.api.getAllproducts(category).subscribe(response => {
        this.products = response;
      });

    });

  }

  

  async onSubmit(form: NgForm, id: string, final_price:string) {
    const user_name = await this._storage.get('user_name');
    var cart = {"user_name": user_name, "product_id": id, "final_price": final_price,"quantity": form.value.qty};
    this.addToMyCart = cart;

    this.api.addToMyCart(this.addToMyCart).subscribe(response=>{
      console.log(response);
    });

    if(form.value.qty == 0 || form.value.qty == null){
      document.getElementById(id).innerHTML = "";
    }else{
       document.getElementById(id).innerHTML = "qty: " + form.value.qty;
    }
   

  }

  myCart(){
    this.router.navigate(["my-cart"]);
  }

  selected($event) {
    console.log($event.target.value);
    const value = $event.target.value;
    var category = "";

    this.api.getClickedCategory().subscribe(response => {
      this.clickedCategory = response;
      category = this.clickedCategory[0].category_name;
      console.log(category);
      switch (value) {
        case "lowPrice": {
          this.api.getLowPriceProducts(category).subscribe(response => {
            this.products = response;
          });
          break;
        }
        case "highPrice": {
          this.api.getHighPriceProducts(category).subscribe(response => {
            this.products = response;
          });
          break;
        }
        case "discounts": {
          this.api.getDiscountedProducts(category).subscribe(response => {
            this.products = response;
          });

          break;
        }
        default: {
          this.api.getAllproducts(category).subscribe(response => {
            this.products = response;
          });
          break;
        }
      }
    });
  }

  serchValue($event){
    console.log($event.target.value);
    var word = $event.target.value;
    var category = "";
    this.api.getClickedCategory().subscribe(response => {
      this.clickedCategory = response;
      category = this.clickedCategory[0].category_name;

      this.api.search(category, word).subscribe(response => {
        this.products = response;
      });

    });
  }

  // async checkQty(id:string){
  //   console.log("am here");
    
  //   var val = await this._storage.get('1');
  //   console.log("I am the value: " + val);
  //   // if(val == null || val == '0'){
  //   //   return false;
  //   // }else{
  //   //   return true;
  //   // }
  // }
}
function CrossOrigin(arg0: string) {
  throw new Error('Function not implemented.');
}

