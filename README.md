# API Consumption Layer
Package created to implement an abstract of consumption layer for RestAPI in Angular projects for equals or later versions to 7.

# Stats
[![Build Status](https://img.shields.io/npm/dm/api-consumption-layer.svg)](https://www.npmjs.com/package/api-consumption-layer)
[![Build Status](https://img.shields.io/npm/v/api-consumption-layer.svg)](https://www.npmjs.com/package/api-consumption-layer)

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

**Environment [src/environments/environment.ts and environment.prod.ts]**

    export const environment = {
      urlApi: 'http://localhost:3330/api', //include your url api
    };

**Service [product.service.ts]**

    import { Injectable } from '@angular/core';
	import { CoreApiService } from 'api-consumption-layer';
    import { Product  as Entity } from  '../models/product.model';
    import { environment } from '../../../environments/environment';
    
    /* Path da API */
    const resourceName:  string  =  'products';
    
    @Injectable({
	    providedIn:  'root'
    })
    export  class  ProductService {
	    constructor(public  restApi:  CoreApiService<Entity>) {
	    	    this.restApi.setUrl(environment.urlApi);
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


**if you have problems with XSS (cross-site-script) because you are on different domains, do this:**

- Create the file proxy.config.js and applied the content:
	
      const proxy = [{
        context: '/api',
    	target: 'http://localhost:3330',
    	pathRewrite: {'^/api' : ''}
      }];
      module.exports = proxy;
	
- After to do it, your api will be availibity in the same domain your application with suffix api, for example: your web application is running in port 4200, your api will be running in the same port with suffix api (localhost:4200/api).
- You can use the command `ng serve --open --proxy-config proxy.config.js` for execute it.

# Credits
I ask you to contribute to our improvement. It was my first npm package.

# Contact
brunobinfo@gmail.com
