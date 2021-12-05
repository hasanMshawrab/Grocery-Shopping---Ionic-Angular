import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { api, clickedCategory } from '../services/api';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


@Injectable({
  providedIn: 'root'  
})

export class HomePage {

  categgory = {} as clickedCategory;

  constructor(private router: Router, private api: api) {}
  show=false;

  public async action(category: string){
    this.categgory.category_name = category;
    this.api.setClickedCategory(this.categgory).subscribe(response=>{
      console.log(response);
    });
    this.show = true;
    await delay(1000);
    this.show = false;
    this.router.navigate(["products"]);
  }
  
  myCart(){
    this.router.navigate(["my-cart"]);
  }
}


function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

