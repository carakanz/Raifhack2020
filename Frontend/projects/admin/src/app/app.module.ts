import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { LoaderComponent } from './components/loader/loader.component';
import { API_URL, BASE_DOMAIN } from './tokens';
import {MySitesComponent} from './components/smart/my-sites/my-sites.component';
import {HttpClientModule} from "@angular/common/http";
import {CreateAndEditSiteComponent} from './components/smart/create-and-edit-site/create-and-edit-site.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MainInfoComponent } from './components/smart/main-info/main-info.component';
import { CategoriesFormsComponent } from './components/smart/categories-forms/categories-forms.component';
import { ProductsFormComponent } from './components/smart/products-form/products-form.component';
import { ProductFormDialogComponent } from './components/smart/products-form/product-form-dialog/product-form-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		MySitesComponent,
		CreateAndEditSiteComponent,
		MainInfoComponent,
		CategoriesFormsComponent,
		ProductsFormComponent,
		ProductFormDialogComponent,
		LoaderComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		SharedModule,
	],
	providers: [
		{
			provide: BASE_DOMAIN,
			useValue: 'localhost',
		},
		{
			provide: API_URL,
			useValue: 'http://a8a60a5d0ba8.sn.mynetname.net/api/admin',
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
