import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessAllComponent } from './components/business-all/business-all.component';
import { BusinessCreateComponent } from './components/business-create/business-create.component';
import { BusinessCreateWrapperComponent } from './components/business-create-wrapper/business-create-wrapper.component';
import { BusinessCreateCategoryComponent } from './components/business-create-category/business-create-category.component';
import { BusinessCreateTemplateComponent } from './components/business-create-template/business-create-template.component';
import { BusinessCreateProductsComponent } from './components/business-create-products/business-create-products.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'all',
	},
	{
		path: 'all',
		component: BusinessAllComponent,
	},
	{
		path: 'create',
		component: BusinessCreateWrapperComponent,
		children: [
			{
				path: '',
				redirectTo: 'general',
			},
			{
				path: 'general',
				component: BusinessCreateComponent,
			},
			{
				path: 'template',
				component: BusinessCreateTemplateComponent,
			},
			{
				path: 'category',
				component: BusinessCreateCategoryComponent,
			},
			{
				path: 'products',
				component: BusinessCreateProductsComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BusinessRoutingModule {}
