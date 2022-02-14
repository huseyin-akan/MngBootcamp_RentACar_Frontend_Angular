import { AlertifyService } from '../../core/services/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private alertifyService :AlertifyService
  ) { }

  ngOnInit(): void {
    this.alertifyService.success("İlk denememiz başarılı olsun inş.");
  }

}
