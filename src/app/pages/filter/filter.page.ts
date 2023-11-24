import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilterOptions, FilterService, defaultFilter } from 'src/app/services/filter.service';

@Component({
	selector: 'app-filter',
	templateUrl: 'filter.page.html',
	styleUrls: ['filter.page.scss']
})
export class FilterPage {
	parameters: FilterOptions = defaultFilter();

	constructor(private filter: FilterService, private router: Router) { }

	updateFilter() {
		console.log(this.parameters)
		this.filter.updateFilters(this.parameters);
	}

	goToHome() {
		this.router.navigateByUrl('/tabs/home');
	}

	resetFilter() {
		this.parameters = defaultFilter();
	}

	isFilterChanged() {
		return JSON.stringify(this.parameters) === JSON.stringify(defaultFilter());
	}
}
