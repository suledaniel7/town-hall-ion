import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressProvider } from '../address/address';

@Injectable()
export class MessageProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    load_image(): Observable<any> {
        return this.http.get(`${this.api}/img-load/`);
    }

    post_message(type: string, message: string, m_type?: string, sel_beats?: Array<string>): Observable<any> {
        if (m_type) {
            if (sel_beats) {
                return this.http.post(`${this.api}/messages/${type}`, { mBody: message, post_type: m_type, recepients: sel_beats });
            }
            else {
                return this.http.post(`${this.api}/messages/${type}`, { mBody: message, post_type: m_type });
            }
        }
        else if (sel_beats) {
            return this.http.post(`${this.api}/messages/${type}`, { mBody: message, recepients: sel_beats });
        }
        else {
            return this.http.post(`${this.api}/messages/${type}`, { mBody: message });
        }
    }

    edit_message(m_text: string, m_type: string, ac_type: string, timestamp: string, sel_beats?: Array<string>, em_type?: string): Observable<any> {
        if (ac_type == `o`) {
            return this.http.post(`${this.api}/edit/${m_type}/${timestamp}`, { m_text: m_text, recepients: sel_beats });
        }
        else if (ac_type == `j`) {
            return this.http.post(`${this.api}/edit/${m_type}/${timestamp}`, { m_text: m_text, post_type: em_type });
        }
        else if (ac_type == `l`) {
            return this.http.post(`${this.api}/edit/${m_type}/${timestamp}`, { m_text: m_text });
        }
    }

    del_message(timestamp): Observable<any> {
        return this.http.post(`${this.api}/delete/m/${timestamp}`, {});
    }

    report_message(timestamp): Observable<any> {
        return this.http.post(`${this.api}/report/m/${timestamp}`, {});
    }

    req_message(m_type, timestamp): Observable<any> {
        return this.http.get(`${this.api}/req-msg/${m_type}/${timestamp}`);
    }

    load_districts(): Observable<any> {
        return this.http.get(`${this.api}/?pg=compose`);
    }

}
