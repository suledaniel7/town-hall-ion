import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressProvider } from '../address/address';

@Injectable()
export class OrgJsProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    req_j_msgs(username: string): Observable<any>{
        return this.http.post(`${this.api}/organisations/req-js/messages`, {username: username});
    }

    accept_j(username: string, o_username: string): Observable<any> {
        return this.http.get(`${this.api}/organisations/j-requests/accept/${o_username}/${username}`);
    }

    reject_j(username: string, o_username: string): Observable<any> {
        return this.http.get(`${this.api}/organisations/j-requests/decline/${o_username}/${username}`);
    }

    assign_j(username: string, o_username: string, beat: string): Observable<any> {
        return this.http.get(`${this.api}/organisations/select-beat/${o_username}/${username}/${beat}`);
    }

    serve_dists(): Observable<any> {
        return this.http.get(`${this.api}/serve-districts`);
    }

    reassign_j(username: string, o_username: string, code: string): Observable<any> {
        return this.http.get(`${this.api}/organisations/reassign-beat/${o_username}/${username}/${code}`);
    }

    remove_j(username: string): Observable<any> {
        return this.http.get(`${this.api}/organisations/remove_j/${username}`);
    }
}
