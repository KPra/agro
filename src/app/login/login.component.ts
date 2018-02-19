import { User } from './../home/user';
import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 model: any = {};
 loading = false;
 returnUrl: string;
 alert: string;

  constructor(private router: Router, private userLogged: User) { }

  ngOnInit() {
  }

  login(){
      console.log('login invoked!!');
      this.loading = true;      
    
    console.log('user is '+this.model.username);
    if(this.model.username == 'praveen'){
        this.userLogged.storage = {
            "username": this.model.username,
            "phone": 9986695955
        }        
        this.router.navigate(['/home']);
    }else{
      this.alert = 'Username or password is invalid!';
      this.loading = false;
    }
  }
}
