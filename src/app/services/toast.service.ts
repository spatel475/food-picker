import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(private toastr: ToastController) { }

	async unsuccessfulLocateMeToast() {
		let toast = await this.toastr.create({
			message: 'Could not retrieve location. Please enter city and state below',
			color: 'danger',
			position: 'bottom',
			duration: 10000,
			icon: 'alert-circle',
			buttons: [{
				icon: 'close',
				role: 'cancel',
			}]
		});
		await toast.present();
	}

	async invalidLocationFormatToast() {
		let toast = await this.toastr.create({
			message: 'Please enter a valid city and state (Oxford, MS)',
			color: 'warning',
			position: 'bottom',
			duration: 10000,
			icon: 'alert-circle',
			buttons: [{
				icon: 'close',
				role: 'cancel',
			}]
		});
		await toast.present();
	}

	async unsuccessfulLogin() {
		let toast = await this.toastr.create({
			message: 'Unsucessful Login',
			color: 'danger',
			position: 'bottom',
			duration: 10000,
			icon: 'alert-circle',
			buttons: [{
				icon: 'close',
				role: 'cancel',
			}]
		});
		await toast.present();
	}

	async unsuccessfulSignup() {
		let toast = await this.toastr.create({
			message: 'Unsucessful signup. Use unique email and password must be 6 digits at least.',
			color: 'danger',
			position: 'bottom',
			duration: 10000,
			icon: 'alert-circle',
			buttons: [{
				icon: 'close',
				role: 'cancel',
			}]
		});
		await toast.present();
	}
	
	async checkEmail() {
		let toast = await this.toastr.create({
			message: 'Please check email to reset password',
			color: 'success',
			position: 'bottom',
			duration: 10000,
			icon: 'alert-circle',
			buttons: [{
				icon: 'close',
				role: 'cancel',
			}]
		});
		await toast.present();
	}

	async emailNotSent() {
		let toast = await this.toastr.create({
			message: 'Email could not be sent. Ensure correct email is used.',
			color: 'danger',
			position: 'bottom',
			duration: 10000,
			icon: 'alert-circle',
			buttons: [{
				icon: 'close',
				role: 'cancel',
			}]
		});
		await toast.present();
	}
}