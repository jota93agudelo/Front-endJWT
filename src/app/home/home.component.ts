import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuario:any;
  constructor(private router:Router, private service:UserService) { }

  ngOnInit() {
    this.consultarUsuario();
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/user/login');
  }

  consultarUsuario(){
    this.service.obtenerUsuario().subscribe(
      result => {
        this.usuario=result;
      },error => {
        console.log(error);
      }
    );
  }

}
