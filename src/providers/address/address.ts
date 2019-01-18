import { Injectable } from '@angular/core';

@Injectable()
export class AddressProvider {

    constructor() {

    }

    getApi(){
        return `http://192.168.43.55:8095/api`;
    }

    getImageApi(){
        return `http://192.168.43.55:8095`
    }

}
