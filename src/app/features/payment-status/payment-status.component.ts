import { Component, OnInit } from '@angular/core';
import { PayAndSendMailService } from '../../core/api/PayAndSendMailServices';
import { PostService } from '../../core/api/post.service';
import { payhistoryModel } from '../../core/models/post';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [CommonModule, NzSpinModule],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.scss',
})
export class PaymentStatusComponent implements OnInit {
  status: any = null;
  dataPost: any = JSON.parse(sessionStorage.getItem('dataPost') || '{}');
  fee: any = JSON.parse(localStorage.getItem('fee') || '{}');
  userInfor: any = JSON.parse(localStorage.getItem('user_infor') || '{}');
  isLoading: boolean = false;
  constructor(
    private PayAndSendMailService: PayAndSendMailService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const sub = this.route.queryParams.subscribe((params) => {
      this.body.payCode = params['vnp_BankTranNo'];
      this.body.price = +params['vnp_Amount'] / 100;
      if (this.body.price === this.fee.createdPrice) {
        this.body.type = 0;
      } else {
        this.body.type = 1;
      } // sub.unsubscribe();
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
    this.isLoading = true;
    this.PayAndSendMailService.checkStatusPay().subscribe((res) => {
      this.status = res.RspCode;
      this.isLoading = false;

      if (this.status === '00') {
        this.postService.payPost(this.body).subscribe((data) => {
          this.handelSendMail();
          setTimeout(() => {
            this.router.navigate(['/managerPost', this.userInfor.id]);
          }, 2000);
        });
      } else {
        setTimeout(() => {
          this.router.navigate(['/managerPost', this.userInfor.id]);
        }, 2000);
      }
    });
  }

  handelSendMail() {
    const nameCustomer = this.userInfor.fullName;
    const body = {
      nameCustomer,
      email: this.userInfor.email,
      managerlink: `${window.location.protocol}//${window.location.host}/managerPost/${this.userInfor.id}`,
    };
    this.PayAndSendMailService.sendMail(body).subscribe(() => {});
  }
}
