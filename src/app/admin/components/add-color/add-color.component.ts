import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { CreateColorModel } from 'src/app/features/rentals/models/colorModels/createColorModel';
import { ColorService } from 'src/app/features/rentals/services/color.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {

  constructor(
    private colorService : ColorService,
    private alertifyService : AlertifyService,
    private formBuilder: FormBuilder,
    private router : Router
  ) { }

  addColorForm : FormGroup;
  createColorModel : CreateColorModel;

  ngOnInit(): void {
      this.createAddCarForm();
  }

  addColor(){
    this.createColorModel = Object.assign({}, this.addColorForm.value);
    console.log(this.createColorModel);

    this.colorService.addColor(this.createColorModel).subscribe({
      next : (response) => {
        this.alertifyService.success("Renk ekleme işlemi başarılı oldu.");
        this.router.navigate(['/adminalThings/colors']);
      },
      error : (err) => {
        console.log(err)
        this.alertifyService.error("Renk ekleme işlemi başarısız oldu. Çünkü: " + err.error.Detail)
      }
    });
  }

  createAddCarForm() {
    this.addColorForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

}
