import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _jwt: JwtService, private _router: Router) {}

  canActivate(): boolean {
    if (this._jwt.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }
}
