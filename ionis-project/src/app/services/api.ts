import { Injectable } from "@angular/core";
import {HttpClient } from '@angular/common/http'

export interface Product{
    id: string,
    product_name: string,
    category: string,
    inStock: Int32Array,
    sold: Int32Array,
    price: Int32Array,
    visibility: string,
    image: string
}

@Injectable({
  providedIn: 'root'  
})

export class api{

    private base_url = "http://localhost//Grocery-Shopping---Ionic-Angular/APIs/getProductsByCategory.php?category=beverages";

    constructor(private http : HttpClient){}

    getAllproducts(){
        return this.http.get<[Product]>(this.base_url)
    }
}