import { LoginComponent } from '../components/login/login.component';
import { MainComponent } from '../components/main/main.component';
import { AuthGuard } from '../guards/auth-guard/auth.guard';

export const routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/' },
];
