import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _productUrl =
    'http://ec2-13-59-62-104.us-east-2.compute.amazonaws.com:8090/api/v1/fish/';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(this._productUrl);
  }
}
