import { Routes } from '@angular/router';
import { DocumentComponent } from './components/document/document.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/authguard';
import { CategoryComponent } from './components/category/category.component';

export const routes: Routes = [
    { path: 'document', component: DocumentComponent, canActivate: [AuthGuard] },
    { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];
