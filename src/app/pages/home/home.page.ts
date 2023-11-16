import { Component } from '@angular/core';
import { FourSquareService, Place } from '../../services/four-square.service';
import { Coordinates, GeolocationService } from 'src/app/services/geolocation.service';
import { ToastService } from 'src/app/services/toast.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})

export class HomePage {
	coordinates: Coordinates;
	addressInputValue: string = '';
	places: Place[] = [];

	loaded = false;
	searched = false;

	constructor(
		private fourSquare: FourSquareService,
		private geolocation: GeolocationService,
		private toastr: ToastService,
		private db: DatabaseService
	) {
	}

	setFavorites() {
		this.db.getUserFavorite()?.subscribe({
			next: (favs: Place[]) => {
				if (this.places.length > 0) {
					favs.forEach(fav => {
						let placeIdx = this.places.findIndex(place => place.fsq_id == fav.fsq_id);
						if (placeIdx >= 0) {
							this.places[placeIdx].isFavorite = true;
						}
					});
				}
			},
			error: (e) => console.warn(e)
		})
	}

	async locateMe() {
		let coordinates = await this.geolocation.locateMe();
		if (coordinates) {
			this.coordinates = coordinates;
			this.addressInputValue = `Lat: ${coordinates.latitude}, Long: ${coordinates.longitude}`
			this.callApi(this.coordinates?.latitude, this.coordinates?.longitude);
		}
		else {
			this.toastr.unsuccessfulLocateMeToast();
		};
	}

	async search() {
		if (this.isCityStateValid()) {
			this.loaded = false;
			this.searched = true;
			this.callApi(this.coordinates?.latitude, this.coordinates?.longitude);
		}
		else {
			this.toastr.invalidLocationFormatToast();
		}


	}

	callApi(latitude: string, longitude: string) {
		this.fourSquare.getNearbyPlaces(latitude, longitude)
			.subscribe({
				next: response => {
					// Update places with the received data
					this.places = response.results;
					this.setFavorites();
					console.log(response);
					this.loaded = true;
				},
				error: err => {
					console.warn(err);
					this.loaded = true
				}
			});
	}

	isCityStateValid() {
		const cityStatePattern = /^[a-zA-Z\u0080-\u024F]+(?:[\s-][a-zA-Z\u0080-\u024F]+)*,\s*[a-zA-Z]{2}$/
		// return cityStatePattern.test(this.addressInputValue);
		return true;
	}

	updateFavorites() {
		let items = this.places.filter(f => f.isFavorite)
		this.db.updateFavorites(items)
	}

	openMaps(address:string){
		window.open(`http://maps.google.com/?q=${address}`);
	}
}