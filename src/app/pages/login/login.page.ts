import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: 'login.page.html',
	styleUrls: ['login.page.scss'],
})
export class LoginPage {
	credentials: any;

	constructor(
		private navCntrl: NavController,
		private toast: ToastService,
		private authService: AuthService,
		private fb: FormBuilder
	) {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	async login() {
		const user = await this.authService.login(this.credentials.value);
		if (!user) {
			this.toast.unsuccessfulLogin();
			return;
		}

		this.gotoHome();
	}

	gotoSignup() {
		this.navCntrl.navigateForward('signup');
	}
	
	gotoForgot() {
		this.navCntrl.navigateForward('forgot-password');
	}

	gotoHome() {
		this.navCntrl.navigateForward('/tabs/home');
	}
}