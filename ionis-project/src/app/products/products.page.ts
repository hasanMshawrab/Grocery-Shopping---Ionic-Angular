import { Component, OnInit } from '@angular/core';
import { api, Product } from '../services/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: [Product];

  constructor(private api: api) { }

  ngOnInit() {
    this.api.getAllproducts().subscribe(response=>{
      this.products = response;
      console.log(this.products);
      
    });
  }

}
