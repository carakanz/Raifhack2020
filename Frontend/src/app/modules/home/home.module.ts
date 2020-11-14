import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ImageComponent } from './components/image/image.component';
import { BannerComponent } from './components/banner/banner.component';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
	declarations: [HomeComponent, ImageComponent, BannerComponent, CategoryComponent],
	imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
