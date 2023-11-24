import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	private filterEmitter$ = new BehaviorSubject<FilterOptions>(defaultFilter());
	selectedFilter$ = this.filterEmitter$.asObservable();

	updateFilters(filter: FilterOptions) {
		this.filterEmitter$.next(filter);
	}
}

export interface FilterOptions {
	sortBy: string;
	openNow: boolean;
	priceRange: {
		lower: number;
		upper: number;
	}
}

export function defaultFilter() {
	var defaultFilters: FilterOptions = {
		openNow: false,
		priceRange: {
			lower: 1,
			upper: 4
		},
		sortBy: 'DISTANCE'
	}

	return defaultFilters;
}