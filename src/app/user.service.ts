import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http:HttpClient) { }
  readonly BaseUrl= 'https://localhost:44309/api';

  formModel = this.fb.group({
    Nombre: ['',Validators.required],
    Apellidos: ['',Validators.required],
    Correo: ['',Validators.email],
    Contrasenas: this.fb.group({
      Contrasena : ['',[Validators.required,Validators.minLength(6)]],
      ConfirmarContrasena: ['',[Validators.required]]
    },{validator : this.compararContrasenas})
  });

  compararContrasenas(fb:FormGroup){
    let confirmarContrasenaCtrl= fb.get('ConfirmarContrasena');

    if(confirmarContrasenaCtrl.errors  == null || 'passwordMismatch' in confirmarContrasenaCtrl.errors){
      if (fb.get('Contrasena').value != confirmarContrasenaCtrl.value) {
        confirmarContrasenaCtrl.setErrors({passwordMismatch: true});
      }else{
        confirmarContrasenaCtrl.setErrors(null);
      }
    }
  }

  registrar(){
    var body ={
      Nombre : this.formModel.value.Nombre,
      Apellidos : this.formModel.value.Apellidos,
      Contrasena : this.formModel.value.Contrasenas.Contrasena,
      Correo : this.formModel.value.Correo
    };
    return this.http.post(this.BaseUrl+'/User/registrar',body);
  }

  login(formData){
    return this.http.post(this.BaseUrl+'/User/login',formData);
  }

  obtenerUsuario(){
    return this.http.get(this.BaseUrl + '/userprofile');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch= false;
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payload.role;
    allowedRoles.forEach(element => {
      if (userRole==element) {
        isMatch=true;
        return false;
      }
    });
    return isMatch;
  }

}
