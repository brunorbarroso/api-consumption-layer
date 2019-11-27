import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';

@Injectable({
    providedIn: 'root'
})
export class CoreApiService<T> {

    constructor(private api: ApiHandlerService<T>) {}

    setResource(resourceName: string) {
        console.log('resource', resourceName);
        this.api.setResource(resourceName);
    }

    get() {
        console.log('api', this.api);
        return this.api.get();
    }

    getById(id: number) {
        console.log('get by id core api');
        return this.api.getById(id);
    }

    add(item: T) {
        console.log('add core api');
        return this.api.add(item);
    }

    update(id: number, item: T) {
        console.log('update core api');
        return this.api.update(id, item);
    }
    
    delete(id: number) {
        console.log('delete core api');
        return this.api.delete(id);
    }
}
