import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class JAccountProvider {

    constructor(public http: HttpClient) {
        
    }

    j_beat_render(): Observable<any> {
        return this.http.get('http://127.169.43.55:8095/api/journalists/beats/');
    }

    j_org_render(): Observable<any> {
        return this.http.get('http://127.169.43.55:8095/api/journalists/orgs/');
    }

    j_beat_sub(beat): Observable<any> {
        return this.http.post('http://127.169.43.55:8095/api/select-beat', {beat: beat});
    }

    j_org_sub(org): Observable<any> {
        return this.http.post('http://127.169.43.55:8095/api/organisations/request', {organisation: org});
    }
}
