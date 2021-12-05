import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { api } from '../services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private api:api) {}

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
    var loginInfo = form.value;
    if(form.value.user_name == "" || form.value.password == ""){
      this.showAlert("please fill username and password!")
    }else{
      this.api.login(loginInfo).subscribe(response=>{
        console.log(response);
        if(response[0] == true){
          // this.storage.setItem("user_name", form.value.user_name);
          this.router.navigate(["home"]);
        }else{
          this.showAlert("Username or password is wrong!")
        }
      });
    }

  }

  public signUp(){
    this.router.navigate(["create-account"]);
  }
}
