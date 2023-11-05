import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthService {


	constructor(private auth: Auth) { }

	async login({ email, password }: any) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (error) {
			return null;
		}
	}

	async signup({ email, password }: any) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (error) {
			return null;
		}
	}

	async logout() {
		return await signOut(this.auth);
	}

	async forgotPassword(email: string) {
		return await sendPasswordResetEmail(this.auth, email);
	}

	getUser() {
		return this.auth.currentUser?.email;
	}
}
