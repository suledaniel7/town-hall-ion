import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressProvider } from '../address/address';

@Injectable()
export class RenderProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    render_profile(username: string): Observable<any> {
        return this.http.get(`${this.api}/profile/${username}`);
    }

    follow(username: string): Observable<any> {
        return this.http.post(`${this.api}/follow/${username}`, {});
    }

    unfollow(username: string): Observable<any> {
        return this.http.post(`${this.api}/unfollow/${username}`, {});
    }

    req_type(username: string): Observable<any> {
        return this.http.get(`${this.api}/req-type/${username}`);
    }
}
