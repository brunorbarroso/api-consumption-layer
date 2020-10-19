import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';

@Injectable({
    providedIn: 'root'
})
export class CoreApiService<T> {

    constructor(private api: ApiHandlerService<T>) {}

    setResource(resourceName: string) {
        this.api.setResource(resourceName);
    }

    get() {
        return this.api.get();
    }

    getById(id: string) {
        return this.api.getById(id);
    }

    add(item: T) {
        return this.api.add(item);
    }

    update(id: string, item: T) {
        return this.api.update(id, item);
    }
    
    delete(id: string) {
        return this.api.delete(id);
    }
}
