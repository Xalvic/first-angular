import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LogComponent } from './log/log.component';
import { OtpComponent } from './otp/otp.component';
import { ViewComponent } from './view/view.component';
import { JwtService } from './jwt.service';
import { AuthGuard } from './auth.guard';
import { ProductService } from './product.service';

@NgModule({
  declarations: [AppComponent, LogComponent, OtpComponent, ViewComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [JwtService, AuthGuard, ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
