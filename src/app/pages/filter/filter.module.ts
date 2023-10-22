import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPage } from './filter.page';

import { FilterRoutingModule } from './filter-routing.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		FilterRoutingModule
	],
	declarations: [FilterPage]
})
export class FilterPageModule { }
