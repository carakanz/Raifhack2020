import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_URL } from './modules/core/tokens/api-url';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, HttpClientModule],
	providers: [
		{
			provide: API_URL,
			useValue: 'http://a8a60a5d0ba8.sn.mynetname.net/api',
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
