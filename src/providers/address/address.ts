import { Injectable } from '@angular/core';

@Injectable()
export class AddressProvider {
    // api: string = 'http://192.168.43.55:8095';
    api: string = 'http://127.0.0.1:8095';
    constructor() {

    }

    getApi(){
        return `${this.api}/api`;
    }

    getImageApi(){
        return `${this.api}`;
    }

}
