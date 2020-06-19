import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogComponent } from './log/log.component';
import { OtpComponent } from './otp/otp.component';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LogComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'view', component: ViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
