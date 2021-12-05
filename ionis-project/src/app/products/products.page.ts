import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { api, Product, clickedCategory, AddToMyCart } from '../services/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: [Product];
  clickedCategory: clickedCategory;
  addToMyCart:AddToMyCart;

  constructor(private api: api, private router: Router) { }

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

  onSubmit(form: NgForm, id: string) {
    console.log(id);
    console.log(form.value);
    var cart = {"user_name": "charbel", "product_id": id, "quantity": form.value.qty};
    this.addToMyCart = cart;
    // this.addToMyCart.user_name = "";
    // this.addToMyCart.product_id = id;
    // this.addToMyCart.quantity = form.value.qty;

    this.api.addToMyCart(this.addToMyCart).subscribe(response=>{
      console.log(response);
    });
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
}
function CrossOrigin(arg0: string) {
  throw new Error('Function not implemented.');
}

