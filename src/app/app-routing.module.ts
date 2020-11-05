import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'account/:id',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'movements/:id',
    loadChildren: () => import('./pages/movements/movements.module').then( m => m.MovementsPageModule)
  },
  {
    path: 'calendar/:account',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'payment-list',
    loadChildren: () => import('./pages/payment-list/payment-list.module').then( m => m.PaymentListPageModule)
  },
  {
    path: 'references',
    loadChildren: () => import('./pages/references/references.module').then( m => m.ReferencesPageModule)
  },
  {
    path: 'loandata/:id',
    loadChildren: () => import('./pages/loandata/loandata.module').then( m => m.LoandataPageModule)
  },
  {
    path: 'detailloan/:id',
    loadChildren: () => import('./pages/detailloan/detailloan.module').then( m => m.DetailloanPageModule)
  },
  {
    path: 'referencedetail/:id/:reference/:segment',
    loadChildren: () => import('./pages/referencedetail/referencedetail.module').then( m => m.ReferencedetailPageModule)
  },
  {
    path: 'applyfor-loan',
    loadChildren: () => import('./pages/applyfor-loan/applyfor-loan.module').then( m => m.ApplyforLoanPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'request-received',
    loadChildren: () => import('./pages/request-received/request-received.module').then( m => m.RequestReceivedPageModule)
  }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
