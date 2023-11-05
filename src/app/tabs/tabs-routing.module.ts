import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const redirectLoggedInToHome = () => redirectLoggedInTo(['/tabs/home'])
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login'])

const routes: Routes = [{
	path: 'tabs',
	component: TabsPage,
	...canActivate(redirectUnauthorizedToLogin),
	children: [
		{
			path: 'home',
			loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule),
		},
		{
			path: 'filter',
			loadChildren: () => import('../pages/filter/filter.module').then(m => m.FilterPageModule)
		},
		{
			path: 'favorite',
			loadChildren: () => import('../pages/favorite/favorite.module').then(m => m.FavoritePageModule)
		},
		{
			path: '',
			redirectTo: '/tabs/home',
			pathMatch: 'full'
		}
	]
},
{
	path: 'login',
	loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule),
	...canActivate(redirectLoggedInToHome)
},
{
	path: 'signup',
	loadChildren: () => import('../pages/signup/signup.module').then(m => m.SignupPageModule)
},
{
	path: '',
	redirectTo: '/login',
	pathMatch: 'full'
},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
