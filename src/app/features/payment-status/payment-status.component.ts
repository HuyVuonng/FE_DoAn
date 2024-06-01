import { Component, OnInit } from '@angular/core';
import { PayAndSendMailService } from '../../core/api/PayAndSendMailServices';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.scss',
})
export class PaymentStatusComponent implements OnInit {
  status: any;

  constructor(private PayAndSendMailService: PayAndSendMailService) {}
  ngOnInit(): void {
    this.checkStatus();
  }

  checkStatus() {
    this.PayAndSendMailService.checkStatusPay().subscribe((res) => {
      this.status = res.RspCode;
      if (this.status === '00') {
        this.handelSendMail();
      }
    });
  }

  handelSendMail() {
    const nameCustomer = JSON.parse(
      sessionStorage.getItem('dataPost') || '{}',
    )?.owner;
    const body = {
      nameCustomer,
      email: 'quanghuyvuong2502@gmail.com',
      managerlink: `${window.location.protocol}//${window.location.host}/managerPost/1`,
    };
    this.PayAndSendMailService.sendMail(body).subscribe(() => {});
  }
}
