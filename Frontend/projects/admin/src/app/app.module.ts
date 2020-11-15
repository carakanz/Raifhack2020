import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { LoaderComponent } from './components/loader/loader.component';
import { API_URL, BASE_DOMAIN } from './tokens';

@NgModule({
	declarations: [AppComponent, LoaderComponent],
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
			useValue: 'localhost:4200',
		},
		{
			provide: API_URL,
			useValue: 'http://a8a60a5d0ba8.sn.mynetname.net/api/admin',
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
