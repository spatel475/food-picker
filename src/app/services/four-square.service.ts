import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FourSquareService {
	private apiKey = environment.apiKey;
	private apiUrl = 'https://api.foursquare.com/v3/places/search';

	constructor(private http: HttpClient) { }

	getNearbyPlaces(lat: string, long: string): Observable<PlaceResponse> {
		console.log('====================================');
		console.log(lat,long);
		console.log('====================================');
		const searchParams = new URLSearchParams({
			// query: 'res',
			ll: `${lat},${long}`,
			// near: 'Oxford,MS',
			open_now: 'true',
			sort: 'DISTANCE',
			limit: '50',
			categories: '13000'
			// v: '20170901'
		});

		// const url = `${this.apiUrl}?${searchParams}`;
		// return this.http.get<PlaceResponse>(url, {
		// 	headers: {
		// 		Accept: 'application/json',
		// 		Authorization: this.apiKey,
		// 	},
		// });

		return this.http.get<PlaceResponse>('../assets/data/places.json').pipe(delay(500));
	}
}

export interface PlaceResponse {
	results: Place[]
	context: Context
}

export interface Place {
	fsq_id: string
	categories: Category[]
	chains: Chain[]
	distance: number
	geocodes: Geocodes
	link: string
	location: Location
	name: string
	related_places: RelatedPlaces
	timezone: string
	isFavorite: boolean
}

export interface Category {
	id: number
	name: string
	short_name: string
	plural_name: string
	icon: Icon
}

export interface Icon {
	prefix: string
	suffix: string
}

export interface Chain {
	id: string
	name: string
}

export interface Geocodes {
	main: Main
	roof?: Roof
}

export interface Main {
	latitude: number
	longitude: number
}

export interface Roof {
	latitude: number
	longitude: number
}

export interface Location {
	address: string
	address_extended?: string
	census_block: string
	country: string
	cross_street?: string
	dma: string
	formatted_address: string
	locality: string
	postcode: string
	region: string
}

export interface RelatedPlaces {
	children?: Children[]
}

export interface Children {
	fsq_id: string
	categories: Category2[]
	name: string
}

export interface Category2 {
	id: number
	name: string
	short_name: string
	plural_name: string
	icon: Icon2
}

export interface Icon2 {
	prefix: string
	suffix: string
}

export interface Context {
	geo_bounds: GeoBounds
}

export interface GeoBounds {
	circle: Circle
}

export interface Circle {
	center: Center
	radius: number
}

export interface Center {
	latitude: number
	longitude: number
}
