import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.registrar().subscribe(
      (result:any) => {
        if (result.succeeded) {
          this.service.formModel.reset();
        }else{
          result.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                
                break;
            
              default:
                break;
            }
          });
        }
      }
      ,error=>{
        console.log(error);
    });
  }

}
