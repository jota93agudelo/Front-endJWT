import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    // On initial load, set up local auth streams
    //this.auth.localAuthSetup();
  }

}