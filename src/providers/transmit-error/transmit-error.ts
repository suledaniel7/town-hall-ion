import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressProvider } from '../address/address';

@Injectable()
export class TransmitErrorProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    transmit(err: any):void {
        this.http.post(`${this.api}/trans-err`, {err: err});
    }
}
