import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { FilterPage } from './filter.page';

import { FilterRoutingModule } from './filter-routing.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule, ReactiveFormsModule,
		FilterRoutingModule
	],
	declarations: [FilterPage]
})
export class FilterPageModule { }
