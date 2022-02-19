import { ColorListModel } from 'src/app/features/rentals/models/colorModels/colorListModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ColorService } from 'src/app/features/rentals/services/color.service';
import { UpdateColorModel } from 'src/app/features/rentals/models/colorModels/updateColorModel';

@Component({
  selector: 'app-admin-colors',
  templateUrl: './admin-colors.component.html',
  styleUrls: ['./admin-colors.component.css']
})
export class AdminColorsComponent implements OnInit {

  constructor(
    private colorService : ColorService,
    private alertifyService : AlertifyService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
    ) { }

    //for showing color details
    colors : ColorListModel[] = [];

    //for updating selected cars
    updateColorForm : FormGroup;
    colorUpdateModel : UpdateColorModel;

    colorsLoaded = false;

    displayUpdateDialog = false;
    colorToUpdate : ColorListModel;
  
    ngOnInit(): void {
      this.getColors();

      this.createUpdateColorForm();

    }

    createUpdateColorForm() {
      this.updateColorForm = this.formBuilder.group({
        name: ['', [Validators.required]]
      });
    }

    getColors(){
      this.colorService.getColors().subscribe({
        next : (response) => {
          this.colors = response.items;
          this.colorsLoaded = true;
        },
        error: (err) => {
          this.alertifyService.error("Renkler getirilirken bir hata oluştu.")
        }
      });
    }

    //Güncellenecek arabanın bilgilerini alıp dialog'a ekler ve dialogu ekrana verir.
    showUpdateDialog(color: ColorListModel){      
      this.colorToUpdate = color;

      this.updateColorForm.setValue({
        name : color.name,
      });
      
      this.displayUpdateDialog = true;
    }
  
    updateColor(){
      if(this.updateColorForm.valid){
        this.colorUpdateModel = Object.assign({}, this.updateColorForm.value);
        this.colorUpdateModel.id = this.colorToUpdate.id;

        this.colorService.updateColor(this.colorUpdateModel).subscribe({
          next : (response) =>{
            if(response!= null){
              this.alertifyService.success("Renk güncelleme işlemi başarılı oldu.")
            }
            this.displayUpdateDialog = false;
            this.getColors();
          },
          error: (err) => {
            this.alertifyService.success("Renk güncelleme işlemi başarısız oldu.")
          }
        });
      }
    }
  
    deleteColor(id: number){
      this.colorService.deleteColor(id).subscribe({
        next : (response) =>{
          this.alertifyService.success("Renk silme işlemi başarılı oldu.");
          this.getColors();
        },
        error: (err) => {
          this.alertifyService.success("Renk silme işlemi başarısız oldu.");
        }
      });
    }

    confirm(id: number) {
      this.confirmationService.confirm({
          target: event.target,
          message: 'Silme işlemi yapmak istediğinizden emin misiniz?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.deleteColor(id);
          },
          reject: () => {
            this.alertifyService.error("Silme işlemi reddedildi.")
          }
      });
  }

}
