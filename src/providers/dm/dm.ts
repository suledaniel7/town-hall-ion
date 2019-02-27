import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressProvider } from '../address/address';

@Injectable()
export class DmProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    conversation(sender: string, recepient: string): Observable<any>{
        return this.http.post(`${this.api}/conversation`, {sender: sender, recepient: recepient});
    }

    list_dms(): Observable<any>{
        return this.http.post(`${this.api}/dms`, {});
    }

    create_dm(recepient: string, text: string): Observable<any> {
        return this.http.post(`${this.api}/dm`, {recepient: recepient, text: text});
    }

    block(sender: string, recepient: string, b_type: string): Observable<any> {
        return this.http.post(`${this.api}/block/${b_type}`, {sender: sender, recepient: recepient});
    }

}
