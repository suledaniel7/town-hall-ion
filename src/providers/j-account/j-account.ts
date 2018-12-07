import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class JAccountProvider {

    constructor(public http: HttpClient) {
        
    }

    j_beat_render(): Observable<any> {
        return this.http.get('/server/journalists/beats/');
    }

    j_org_render(): Observable<any> {
        return this.http.get('/server/journalists/orgs/');
    }

    j_beat_sub(beat): Observable<any> {
        return this.http.post('/server/select-beat', {beat: beat});
    }

    j_org_sub(org): Observable<any> {
        return this.http.post('/server/organisations/request', {organisation: org});
    }
}
