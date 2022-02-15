import { AlertifyService } from './../../../../../core/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.css']
})
export class ProfileSectionComponent implements OnInit {

  isLogged: boolean = false;
  userName :string = "";
  avatarUrl : string = "../../../../../../assets/images/defualtpp.png"

  constructor( private authService: AuthService, private alertifyService : AlertifyService) { }

  ngOnInit() {
    this.authService.isLogged.subscribe( (val)=>{
      this.isLogged = val;
    } );

    this.authService.userName.subscribe( (name) => {
      this.userName = name;
    }); 
  }

  logout(){
    this.authService.logout();
    this.alertifyService.success("Başarılı bir şekilde çıkış işlemi yapıldı.");
  }

}
