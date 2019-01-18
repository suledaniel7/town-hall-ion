import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AddressProvider } from '../address/address';

@Injectable()
export class UploadProvider {
    api: string;

    constructor(public http: HttpClient, private address: AddressProvider) {
        this.api = this.address.getApi();
    }

    confirm_upload(file: object): Observable<any> {
        return this.http.post(`${this.api}/upload_conf`, {file: file});
    }
}
