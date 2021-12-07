import { Component, OnInit } from '@angular/core';
import { api, MyCart } from '../services/api';
import { Profile } from '../services/profile';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  private _storage: Storage | null = null;
  private _myCart : MyCart[];
  private _total: number = 0;
  private _bool: boolean = true;

  constructor(private router:Router,private profile:Profile, private alertController: AlertController,private api:api, private storage:Storage) {
  }

  presentActionSheet(){
    this.profile.presentActionSheet();
  }

  async ngOnInit() {
    const storage = await this.storage.create();    
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this._storage = storage;

    const user_name = await this._storage.get('user_name');
    console.log(user_name);
    
    this.api.getMyCart(user_name).subscribe(async response=>{
      this._myCart = response;
      // console.log(this._myCart[0].user_name);
      var total = 0;
      this._myCart.forEach(function (value) {
        total += (parseInt(value.final_price)*parseInt(value.quantity));
        console.log(value.image);
      });

      this._total = total;
      if(total == 0){
        this._bool = false;
      }
      await this._storage.set('total', total);
      console.log("total: " + total);
    });
  }
  

  async showAlert(){
    const user_name = await this._storage.get('user_name');
    this.api.clearMyCart(user_name).subscribe(response=>{
      console.log(response);
      
    })
    const alert = await this.alertController.create({
      header: 'Confirmed',
      // subHeader: 'Sub header',
      message: "Thank you " + user_name + " for buying from our groccery!\nYour order is on the way, Stay safe!",
      buttons: ['OK']
    });
    await alert.present();
    this.ngOnInit();
    this.router.navigate(['home']);
  }

}
