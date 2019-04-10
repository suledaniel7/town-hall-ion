import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressProvider } from '../address/address';
import { Observable } from "rxjs";

@Injectable()
export class TransmitErrorProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    transmit(err: any):Observable<any> {
        return this.http.post(`${this.api}/trans-err`, {err: err});
    }
}
