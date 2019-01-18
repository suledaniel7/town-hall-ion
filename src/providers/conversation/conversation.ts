import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressProvider } from '../address/address';

@Injectable()
export class ConversationProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    load_conv(m_timestamp): Observable<any> {
        return this.http.post(`${this.api}/request-comments`, {m_timestamp: m_timestamp});
    }

    post_comment(comment, m_timestamp): Observable<any> {
        return this.http.post(`${this.api}/comments/post`, {comment: comment, m_timestamp: m_timestamp, c_type: `m`});
    }

    edit_comment(comment, timestamp): Observable<any> {
        return this.http.post(`${this.api}/edit/comment/${timestamp}`, {m_text: comment});
    }

    del_comment(timestamp): Observable<any> {
        return this.http.post(`${this.api}/delete/c/${timestamp}`, {});
    }

    report_comment(timestamp): Observable<any> {
        return this.http.post(`${this.api}/report/c/${timestamp}`, {});
    }

    req_comment(timestamp): Observable<any> {
        return this.http.get(`${this.api}/req-msg/c/${timestamp}`);
    }

}
