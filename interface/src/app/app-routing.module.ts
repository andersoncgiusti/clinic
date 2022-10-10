import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paciente/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./clinica/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./fisioterapeuta/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./clinica/pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./paciente/pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
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
    path: 'clinica/tab1',
    loadChildren: () => import('./clinica/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'clinica/tab2',
    loadChildren: () => import('./clinica/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./clinica/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./clinica/tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'tab6',
    loadChildren: () => import('./clinica/tab6/tab6.module').then( m => m.Tab6PageModule)
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
    path: 'personal',
    loadChildren: () => import('./clinica/pages/personal/personal.module').then( m => m.PersonalPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./clinica/pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cash-details',
    loadChildren: () => import('./clinica/pages/cash-details/cash-details.module').then( m => m.CashDetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
