import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
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

	async signup() {
		const user = await this.authService.signup(this.credentials.value);
		if (!user) {
			this.toast.unsuccessfulSignup();
			return;
		}

		this.gotoLogin();
	}

	gotoLogin() {
		this.navCntrl.navigateBack('login');
	}

}
