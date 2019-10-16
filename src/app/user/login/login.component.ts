import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel = {
    Correo:'',
    Contrasena:''
  }
  constructor(private service:UserService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null)
    this.router.navigateByUrl('/home');
  }

  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (result :any)=> {
        localStorage.setItem('token',result.token);
        this.router.navigateByUrl('/home');
      },error=>{
        if(error.status == 400)
        {
          alert('Usuario o contraseña incorrecta')
        }else
        console.log(error);
      })
  }
}
