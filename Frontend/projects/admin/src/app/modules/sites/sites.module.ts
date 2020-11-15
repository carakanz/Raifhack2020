import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { SiteComponent } from './components/site/site.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [SiteComponent],
	imports: [CommonModule, SitesRoutingModule, SharedModule],
})
export class SitesModule {}
