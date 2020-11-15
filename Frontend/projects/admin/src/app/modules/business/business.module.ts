import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessCreateComponent } from './components/business-create/business-create.component';
import { BusinessAllComponent } from './components/business-all/business-all.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BusinessCreateWrapperComponent } from './components/business-create-wrapper/business-create-wrapper.component';
import { BusinessCreateCategoryComponent } from './components/business-create-category/business-create-category.component';
import { BusinessCreateTemplateComponent } from './components/business-create-template/business-create-template.component';
import { BusinessCreateProductsComponent } from './components/business-create-products/business-create-products.component';

@NgModule({
	declarations: [BusinessCreateComponent, BusinessAllComponent, BusinessCreateWrapperComponent, BusinessCreateCategoryComponent, BusinessCreateTemplateComponent, BusinessCreateProductsComponent],
	imports: [CommonModule, BusinessRoutingModule, ReactiveFormsModule, SharedModule],
})
export class BusinessModule {}
