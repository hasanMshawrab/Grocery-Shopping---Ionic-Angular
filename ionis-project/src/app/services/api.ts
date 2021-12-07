import { Injectable } from "@angular/core";
import {HttpClient } from '@angular/common/http'

export interface Product{
    product_id: string,
    product_name: string,
    category: string,
    inStock: Int32Array,
    sold: Int32Array,
    price: Int32Array,
    final_price: Int32Array,
    discount: Int32Array,
    // discount_price: Int32Array,
    visibility: string,
    image: string
}

export interface clickedCategory{
    category_name: string
}

export interface NewAccount{
    first_name: string,
    last_name: string,
    email: string,
    user_name: string,
    password: string
}

export interface LoginInfo{
    user_name: string,
    password: string
}

export interface AddToMyCart{
    user_name: string,
    product_id: string,
    final_price: string,
    quantity: string
}

export interface MyCart{
    user_name: string,
    product_id: string,
    product_name: string,
    final_price: string,
    quantity: string,
    image: string
}
  

@Injectable({
  providedIn: 'root'  
})

export class api{

    private base_url = "http://localhost//Grocery-Shopping---Ionic-Angular/APIs/";

    done = "done";

    constructor(private http : HttpClient){}

    getAllproducts(category: string){
        return this.http.get<[Product]>(this.base_url + "getProductsByCategory.php?category=" + category);
    }

    setClickedCategory(categgory: clickedCategory){
        return this.http.post(this.base_url + "setClickedCategory.php", categgory);
    }

    getClickedCategory(){
        return this.http.get<clickedCategory>(this.base_url + "getClickedCategory.php")
    }

    getDiscountedProducts(category: string){
        return this.http.get<[Product]>(this.base_url + "getDiscountedProducts.php?category=" + category);
    }

    getHighPriceProducts(category: string){
        return this.http.get<[Product]>(this.base_url + "getHighPriceProducts.php?category=" + category);
    }

    getLowPriceProducts(category: string){
        return this.http.get<[Product]>(this.base_url + "getLowPriceProducts.php?category=" + category);
    }

    search(category: string, word:string){
        return this.http.get<[Product]>(this.base_url + "search.php?category=" + category + "&word=" + word);
    }

    setNewAccount(newAccount: NewAccount){
        return this.http.post(this.base_url + "setNewAccount.php", newAccount);
    }

    login(loginInfo: LoginInfo){
        return this.http.post(this.base_url + "Login.php", loginInfo);
    }

    addToMyCart(addToMyCart:AddToMyCart){
        return this.http.post(this.base_url + "addToMyCart.php", addToMyCart);
    }

    getMyCart(user_name:string){
        return this.http.get<[MyCart]>(this.base_url + "myCart.php?user_name=" + user_name);
    }

    clearMyCart(user_name:string){
        return this.http.get(this.base_url + "clearMyCart.php?user_name=" + user_name);
    }
}