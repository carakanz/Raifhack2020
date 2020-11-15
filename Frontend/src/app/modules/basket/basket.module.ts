import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './components/basket/basket.component';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [BasketComponent],
	imports: [CommonModule, BasketRoutingModule, MatDividerModule, SharedModule, ReactiveFormsModule],
})
export class BasketModule {}
