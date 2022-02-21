import { CreatedInvoiceDto } from './../models/invoiceModels/createdInvoiceDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }

  private invoice : CreatedInvoiceDto;

  getInvoice(){
    return this.invoice;
  }

  setInvoice(invoice : CreatedInvoiceDto){
    this.invoice = invoice;
  }
}
