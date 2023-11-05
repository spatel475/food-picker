import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.page.html',
	styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {

	credentials: any;

	constructor(
		private navCntrl: NavController,
		private toast: ToastService,
		private authService: AuthService,
		private fb: FormBuilder
	) {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	
	get email() {
		return this.credentials.get('email');
	}

	async sendEmail() {
		try {
			await this.authService.forgotPassword(this.credentials.value.email);
			this.navCntrl.navigateForward('login');
			this.toast.checkEmail();
		} catch (error) {
			console.warn(error)
			this.toast.emailNotSent();
		}
	}
}
