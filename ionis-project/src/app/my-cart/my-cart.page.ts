import { Component, OnInit } from '@angular/core';
import { Profile } from '../services/profile';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  constructor(private profile:Profile) { }

  presentActionSheet(){
    this.profile.presentActionSheet();
  }

  ngOnInit() {
  }

}
