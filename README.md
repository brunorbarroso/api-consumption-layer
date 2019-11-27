[![Build Status](https://img.shields.io/npm/dm/api-consumption-layer.svg)](https://www.npmjs.com/package/api-consumption-layer)
[![Build Status](https://img.shields.io/npm/v/api-consumption-layer.svg)](https://www.npmjs.com/package/kickstarter-angular)
# API Consumption Layer
Package created to implement an abstract of consumption layer for RestAPI in Angular projects for equals or later versions to 7.

# Why?
We know that angular is component oriented but over time and with project growth, if there is no basic design organization, it will get confusing and difficult to maintain. So in order to improve maintenance and start a project in a structured way, I created this package.

# Install
Run the command: `npm i api-consumption-layer --save`

After install packege, you need to create a model and service, for example:

**Model [product.model.ts]**

     export  class  Product {
		    id: number;
		    name: string;
		    description: string;
		    providerId: number;
		    subCategoriaId: number;
		    unity: string;
		    initialInventory: string;
		    previousBalance: string;
		    currentBalance: string;
		    cost: string;
		    price: string;
		    status: number;
    }

**Service [product.service.ts]**

    import { Injectable } from '@angular/core';
	import { CoreApiService } from 'api-consumption-layer/src/public-api';
    import { Product  as Entity } from  '../models/product.model';
    
    /* Path da API */
    const resourceName:  string  =  'products';
    
    @Injectable({
	    providedIn:  'root'
    })
    export  class  ProductService {
	    constructor(public  restApi:  CoreApiService<Entity>) {
		    this.restApi.setResource(resourceName);
	    }
    }

**You can use this service like this:**

**Component [CartComponent.ts]**

    import { Component, OnInit } from  '@angular/core';
    import { ProductService } from  'src/app/services/product.service';
    import { Product } from  'src/app/models/product.model';

    @Component({
	    selector:  'app-cart',
	    templateUrl:  './cart.component.html',
	    styleUrls: ['./cart.component.scss']
    })
    
    export  class  CartComponent  implements  OnInit {
	    dataSource: Product[];
	    isLoadingResults: boolean;
    
	    constructor(private productService: ProductService) { }
    
	    ngOnInit() {
		    this.productService.restApi.get().subscribe(res  => {
			    this.dataSource = res;
			    console.log(this.dataSource);
			    this.isLoadingResults =  false;
		    }, err  => {
			    console.log(err);
			    this.isLoadingResults =  false;
		    });
	    }
    }

# Credits
I ask you to contribute to our improvement. It was my first npm package.

# Contact
brunobinfo@gmail.com