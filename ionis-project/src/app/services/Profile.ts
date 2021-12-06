import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
  

@Injectable({
    providedIn: 'root'  
  })
  

export class Profile{

    private _storage: Storage | null = null;

    constructor(public actionSheetController: ActionSheetController, private storage:Storage, private router:Router){
        this.init();
    }

    async init() {
        const storage = await this.storage.create();    
        await this.storage.defineDriver(CordovaSQLiteDriver);
        this._storage = storage;
      }

    async presentActionSheet() {
        const user_name = await this._storage.get('user_name');
        const actionSheet = await this.actionSheetController.create({
          header: 'Hey ' + user_name.toLowerCase(),
          cssClass: 'my-custom-class',
          buttons: [{
            text: 'Account page',
            icon: 'person-outline',
            role:'go-to-account-page',
            handler: () => {
              console.log('Account-page clicked');
            }
          }, {
            text: 'Settings',
            icon: 'settings-outline',
            role:'go-to-setting',
            handler: () => {
              console.log('Settings clicked');
            }
          }, {
            text: 'Log out',
            icon: 'log-out-outline',
            role: 'Log-out',
            handler: () => {
              console.log('Log-out clicked');
              this.router.navigate(['login']);
            }
          }, {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
        });
        await actionSheet.present();
    
        const { role } = await actionSheet.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
      }
}