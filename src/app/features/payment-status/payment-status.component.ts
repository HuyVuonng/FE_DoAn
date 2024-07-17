import { Component, OnInit } from '@angular/core';
import { PayAndSendMailService } from '../../core/api/PayAndSendMailServices';
import { PostService } from '../../core/api/post.service';
import { payhistoryModel } from '../../core/models/post';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.scss',
})
export class PaymentStatusComponent implements OnInit {
  status: any;
  dataPost: any = JSON.parse(sessionStorage.getItem('dataPost') || '{}');

  constructor(
    private PayAndSendMailService: PayAndSendMailService,
    private postService: PostService,
    private route: ActivatedRoute,
  ) {
    const sub = this.route.queryParams.subscribe((params) => {
      console.log(params['vnp_Amount']);
      this.body.payCode = params['vnp_BankTranNo'];
      this.body.price = +params['vnp_Amount'] / 100;
      if (this.body.price === 50000) {
        this.body.type = 0;
      } else {
        this.body.type = 1;
      }
      console.log(params['vnp_BankTranNo']);
      // sub.unsubscribe();
    });
  }
  ngOnInit(): void {
    this.checkStatus();
  }
  body: payhistoryModel = {
    accountId: this.dataPost?.accountId,
    payCode: '',
    payDate: moment().toISOString(),
    postId: this.dataPost?.id,
    price: 0,
    type: 0,
  };
  checkStatus() {
    this.PayAndSendMailService.checkStatusPay().subscribe((res) => {
      this.status = res.RspCode;
      if (this.status === '00') {
        this.postService.payPost(this.body).subscribe((data) => {
          console.log('thành công');
        });
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
