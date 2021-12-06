import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { api, NewAccount } from '../services/api';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  private _storage: Storage | null = null;

  constructor(private storage:Storage,private alertController: AlertController, private api:api, private router:Router) { }


  async ngOnInit() {
    const storage = await this.storage.create();    
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this._storage = storage;
  }

  async showAlert(message: string){
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'Sub header',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    var newAccount = form.value;
    if(form.value.user_name == "" || form.value.password == ""){
      this.showAlert("please fill username and password!")
    }else{
      this.api.setNewAccount(newAccount).subscribe(response=>{
        console.log(response);
        if(response[0] == true){
          this._storage.set('user_name', form.value.user_name);
          this.router.navigate(["home"]);
        }else{
          this.showAlert("username already exist, please choose another one!")
        }
      });
    }

  }

}
