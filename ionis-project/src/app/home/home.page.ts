import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { api, clickedCategory } from '../services/api';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { Profile } from '../services/profile';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


@Injectable({
  providedIn: 'root'  
})

export class HomePage {

  private _storage: Storage | null = null;

  categgory = {} as clickedCategory;

  constructor(private storage:Storage ,private router: Router, private api: api, private profile:Profile) {
    this.init();
  }
  show=false;

  async init() {
    const storage = await this.storage.create();    
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this._storage = storage;
  }

  presentActionSheet(){
    this.profile.presentActionSheet();
  }

  public async action(category: string){
    const user_name = await this._storage.get('user_name');
    // console.log(name);
    
    this.categgory.category_name = category;
    this.api.setClickedCategory(this.categgory).subscribe(response=>{
      // console.log(response);
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

