import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Place } from 'src/app/services/four-square.service';

@Component({
	selector: 'app-favorite',
	templateUrl: './favorite.page.html',
	styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage {
	loaded = false;
	searched = false;

	places: Place[] = [];

	constructor(
		private db: DatabaseService
	) {
		this.setFavorites();
	}

	setFavorites() {
		this.db.getUserFavorite()?.subscribe({
			next: (s: Place[]) => this.places = s,
			error: (e) => console.warn(e)
		})
	}

	updateFavorites() {
		let items = this.places.filter(f => f.isFavorite)
		this.db.updateFavorites(items)
	}

}
