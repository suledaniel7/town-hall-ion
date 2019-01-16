import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TagPage } from "../tag/tag";
import { JRenderPage } from "../j-render/j-render";
import { ORenderPage } from "../o-render/o-render";
import { LRenderPage } from "../l-render/l-render";

import { SearchProvider } from "../../providers/search/search";

@IonicPage()
@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {
    activeTab: any = "general";
    term: any = '';
    //so we know what tab to send results to
    g_active = true;
    g_item = null;
    p_active = false;
    p_item = null;
    t_active = false;
    t_item = null;
    //trends
    tr_item = null;
    tr_active = true;
    //suggestions
    s_item = null;
    sugg_active = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private searchProv: SearchProvider) {
        this.load_trends();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SearchPage');
    }

    search() {
        let wsp = /^\s*$/;
        let search_term: string = this.term;
        if (!wsp.test(this.term)) {
            //not empty... search
            //first, sanitize search
            let wp = /\W/g;
            if (this.term[0] == '#') {
                this.activeTab = 'tag';
                //clean up interior
                if (this.term.length > 1) {
                    search_term = search_term.replace(wp, '');
                }
                if (search_term.length > 1 && !wsp.test(search_term)) {
                    this.srch(search_term);
                }
            }
            else if (this.term[0] == '@') {
                this.activeTab = 'people';
                //clean up interior
                if (this.term.length > 1) {
                    search_term = search_term.replace(wp, '');
                }
                if (search_term.length > 1 && !wsp.test(search_term)) {
                    this.srch(search_term);
                }
            }
            else {
                search_term = search_term.replace(wp, '');
                if (!wsp.test(search_term)) {
                    this.srch(search_term);
                }
            }

        }
        else {
            //empty, display trends
            this.g_item = null;
            this.p_item = null;
            this.t_item = null;
            this.tr_active = true;
        }
    }

    srch(search_term) {
        this.searchProv.search(this.activeTab, search_term).subscribe(data => {
            //disable trends
            this.tr_active = false;
            if (data.success) {
                if (data.redirect) {
                    let username = data.username;
                    this.render_pg(data.tint, username);
                }
                else {
                    // console.log(data.results);
                    if (this.activeTab == 'general') {
                        this.g_active = true;
                        this.g_item = data.results;
                        this.p_active = false;
                        this.p_item = null;
                        this.t_active = false;
                        this.t_item = null;
                    }
                    else if (this.activeTab == 'people') {
                        this.g_active = false;
                        this.g_item = null;
                        this.p_active = true;
                        this.p_item = data.results;
                        this.t_active = false;
                        this.t_item = null;
                    }
                    else if (this.activeTab == 'tag') {
                        this.g_active = false;
                        this.g_item = null;
                        this.p_active = false;
                        this.p_item = null;
                        this.t_active = true;
                        this.t_item = data.results;
                    }
                }
            }
            else {
                alert(data.reason);
            }
        }, err => {
            alert("An error occured. Error: " + err.message);
        });
    }
    g_curr() {
        this.g_active = true;
    }
    p_curr() {
        this.p_active = true;
    }
    t_curr() {
        this.t_active = true;
    }

    load_trends() {
        this.searchProv.load_trends().subscribe(data => {
            if (data.success) {
                this.tr_item = {};
                this.tr_item.trends = data.trends;
            }
            else {
                alert("An error occured on our end while loading trends. Please try again later");
            }
        }, err => {
            alert("An error occured. Error: " + err.message);
        });
    }

    search_tr(tr_name) {
        this.navCtrl.push(TagPage, { trend: tr_name });
    }

    sugg_search(s_name, s_type) {
        this.term = s_name;
        this.activeTab = s_type;
        this.search();
    }

    render_pg(ac_type, username){
        if(ac_type == 'j'){
            this.navCtrl.push(JRenderPage, {username: username});
        }
        else if(ac_type == 'o'){
            this.navCtrl.push(ORenderPage, {username: username});
        }
        else if(ac_type == 'l'){
            this.navCtrl.push(LRenderPage, {code: username});
        }
    }

}
