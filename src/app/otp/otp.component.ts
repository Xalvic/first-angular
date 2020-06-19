import { Component, OnInit, Input } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  registerOtp = '';
  phone = '';

  constructor(private _jwt: JwtService, private _router: Router) {}

  ngOnInit() {
    // this._jwt.newlol$.subscribe((dat) => (this.phone = dat));
  }

  registerUserOtp() {
    // this._jwt.newlol$.subscribe((num) => {
    //   console.log(num);
    // });
    // console.log(this.phone);
    this._jwt.registerUserOtp(this.registerOtp).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.access);
        this._router.navigate(['/view']);
      },
      (err) => console.log(err)
    );
    console.log(this.registerOtp);
  }
}
