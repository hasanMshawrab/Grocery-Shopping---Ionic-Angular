import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { api, NewAccount } from '../services/api';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  constructor(private alertController: AlertController, private api:api, private router:Router) { }


  ngOnInit() {
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
          this.router.navigate(["home"]);
        }else{
          this.showAlert("username already exist, please choose another one!")
        }
      });
    }

  }

}
