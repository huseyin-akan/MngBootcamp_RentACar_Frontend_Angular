import { AlertifyService } from 'src/app/core/services/alertify.service';
import { InvoiceService } from './../../../../services/invoice.service';
import { CreatedInvoiceDto } from './../../../../models/invoiceModels/createdInvoiceDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-tab',
  templateUrl: './invoice-tab.component.html',
  styleUrls: ['./invoice-tab.component.css']
})
export class InvoiceTabComponent implements OnInit {

  constructor(
    private invoiceService : InvoiceService,
    private alertifyService : AlertifyService
  ) { }

  invoiceListModel : CreatedInvoiceDto;

  ngOnInit(): void {
    this.invoiceListModel =this.invoiceService.getInvoice();
  }

}
