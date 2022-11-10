import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //>>>>>>>>>>>>>>>>>>>> START

  {
    path: 'init',
    loadChildren: () => import('./auth/init/init.module').then( m => m.InitPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./auth/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./auth/reset/reset.module').then( m => m.ResetPageModule)
  },
  //>>>>>>>>>>>>>>>>>>>> PACIENTE
  {
    path: '',
    loadChildren: () => import('./paciente/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./paciente/tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'paciente/tab4',
    loadChildren: () => import('./paciente/tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./paciente/pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'paciente/personal',
    loadChildren: () => import('./paciente/pages/personal/personal.module').then( m => m.PersonalPageModule)
  },
  {
    path: 'paciente/privacy',
    loadChildren: () => import('./paciente/pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  //>>>>>>>>>>>>>>>>>>>> CLINICA
  {
    path: '',
    loadChildren: () => import('./clinica/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'clinica/tab1',
    loadChildren: () => import('./clinica/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'clinica/tab2',
    loadChildren: () => import('./clinica/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'clinica/tab3',
    loadChildren: () => import('./clinica/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'clinica/tab4',
    loadChildren: () => import('./clinica/tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'clinica/tab5',
    loadChildren: () => import('./clinica/tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'clinica/tab6',
    loadChildren: () => import('./clinica/tab6/tab6.module').then( m => m.Tab6PageModule)
  },
  {
    path: 'clinica/personal',
    loadChildren: () => import('./clinica/pages/personal/personal.module').then( m => m.PersonalPageModule)
  },
  {
    path: 'clinica/privacy',
    loadChildren: () => import('./clinica/pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./clinica/pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./clinica/pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'cal-modal/:agendamentoId',
    loadChildren: () => import('./clinica/pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'user-id',
    loadChildren: () => import('./clinica/pages/user-id/user-id.module').then( m => m.UserIdPageModule)
  },
  {
    path: 'user-id/:userId',
    loadChildren: () => import('./clinica/pages/user-id/user-id.module').then( m => m.UserIdPageModule)
  },
  {
    path: 'chart-id/:userPacientId',
    loadChildren: () => import('./clinica/pages/chart-id/chart-id.module').then( m => m.ChartIdPageModule)
  },
  {
    path: 'chart-id',
    loadChildren: () => import('./clinica/pages/chart-id/chart-id.module').then( m => m.ChartIdPageModule)
  },
  {
    path: 'cash',
    loadChildren: () => import('./clinica/pages/cash/cash.module').then( m => m.CashPageModule)
  },
  {
    path: 'cash-details',
    loadChildren: () => import('./clinica/pages/cash-details/cash-details.module').then( m => m.CashDetailsPageModule)
  },
  //>>>>>>>>>>>>>>>>>>>> FISIOTERAPEUTA
  {
    path: '',
    loadChildren: () => import('./fisioterapeuta/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'fisioterapeuta/tab2',
    loadChildren: () => import('./fisioterapeuta/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./fisioterapeuta/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'fisioterapeuta/tab3',
    loadChildren: () => import('./fisioterapeuta/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'fisioterapeuta/personal',
    loadChildren: () => import('./fisioterapeuta/pages/personal/personal.module').then( m => m.PersonalPageModule)
  },
  {
    path: 'chart-id',
    loadChildren: () => import('./fisioterapeuta/pages/chart-id/chart-id.module').then( m => m.ChartIdPageModule)
  },
  {
    path: 'fisioterapeuta/chart-id/:userPacientId',
    loadChildren: () => import('./fisioterapeuta/pages/chart-id/chart-id.module').then( m => m.ChartIdPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./fisioterapeuta/pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'fisioterapeuta/privacy',
    loadChildren: () => import('./fisioterapeuta/pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'init',
    redirectTo: 'init',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
