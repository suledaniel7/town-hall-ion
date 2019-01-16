import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ConversationProvider {

    constructor(public http: HttpClient) {
        console.log('Hello ConversationProvider Provider');
    }

    load_conv(m_timestamp): Observable<any> {
        return this.http.post('http://127.169.43.55:8095/api/request-comments', {m_timestamp: m_timestamp});
    }

    post_comment(comment, m_timestamp): Observable<any> {
        return this.http.post('http://127.169.43.55:8095/api/comments/post', {comment: comment, m_timestamp: m_timestamp, c_type: 'm'});
    }

    edit_comment(comment, timestamp): Observable<any> {
        return this.http.post(`http://127.169.43.55:8095/api/edit/comment/${timestamp}`, {m_text: comment});
    }

    del_comment(timestamp): Observable<any> {
        return this.http.post(`http://127.169.43.55:8095/api/delete/c/${timestamp}`, {});
    }

    report_comment(timestamp): Observable<any> {
        return this.http.post(`http://127.169.43.55:8095/api/report/c/${timestamp}`, {});
    }

    req_comment(timestamp): Observable<any> {
        return this.http.get(`http://127.169.43.55:8095/api/req-msg/c/${timestamp}`);
    }

}
