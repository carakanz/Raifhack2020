import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ImageComponent } from './components/image/image.component';
import { BannerComponent } from './components/banner/banner.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { GoodComponent } from './components/good/good.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [HomeComponent, BannerComponent, CategoryComponent, ProductComponent, GoodComponent],
	imports: [CommonModule, HomeRoutingModule, SharedModule, ReactiveFormsModule],
	exports: [GoodComponent],
})
export class HomeModule {}
