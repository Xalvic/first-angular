import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private lol = new BehaviorSubject('');
  newlol$ = this.lol.asObservable();

  private _loginUrl =
    'http://ec2-13-59-62-104.us-east-2.compute.amazonaws.com:8090/api/v1/user';

  constructor(private http: HttpClient) {}

  updateData(dat: string) {
    this.lol.next(dat);
    // console.log(dat);
  }

  registerUser(phon) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const data = { phone: phon };
    // console.log(data);
    return this.http.post<any>(
      this._loginUrl + '/get_otp/',
      JSON.stringify(data),
      { headers }
    );
  }
  registerUserOtp(data) {
    let phone = '';
    this.newlol$.subscribe((dat) => (phone = dat));
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(phone);
    const ot = { username: phone, password: data };
    return this.http.post<any>(
      this._loginUrl + '/get_access_token/',
      JSON.stringify(ot),
      { headers }
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
