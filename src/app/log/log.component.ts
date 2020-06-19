import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  registerPhone = '';
  // demo = '';
  constructor(private _jwt: JwtService, private _router: Router) {}

  ngOnInit() {
    // this._jwt.newlol$.subscribe(msg => this.demo = msg);
  }

  registerUser() {
    // this._jwt.registerUser(this.registerPhone);
    this._jwt.registerUser(this.registerPhone).subscribe(
      (res) => {
        console.log(res);
        this._router.navigate(['/otp']);
      },
      (err) => console.log(err)
    );
    // console.log(this.registerPhone);
    this._jwt.updateData(this.registerPhone);
  }
}
