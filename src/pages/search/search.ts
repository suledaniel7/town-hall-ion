import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TagPage } from "../tag/tag";
import { JRenderPage } from "../j-render/j-render";
import { ORenderPage } from "../o-render/o-render";
import { LRenderPage } from "../l-render/l-render";

import { SearchProvider } from "../../providers/search/search";
import { URenderPage } from '../u-render/u-render';

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
    suggestions: Array<string>;
    s_item = null;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private searchProv: SearchProvider,
        private alCtrl: AlertController
    ) {
        this.load_trends();
    }

    refresh(){
        this.load_trends();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SearchPage');
        this.prefill();
    }

    prefill(){
        this.searchProv.autofill(this.term).subscribe(data => {
            if (data.success) {
                let lt = data.item.length;
                for(let i=0; i<lt; i++){
                    let item = data.item[i];
                    if(item.type === 'people'){
                        item.name = '@'+item.name;
                    }
                    else if(item.type === 'tag'){
                        item.name = '#'+item.name;
                    }
                }
                this.s_item = {
                    suggestions: data.item
                }
            }
        });
        document.getElementById('suggDiv').className = 'suggestions hidden';
    }

    autofill() {
        document.getElementById('suggDiv').className = 'suggestions';
        this.searchProv.autofill(this.term).subscribe(data => {
            if (data.success) {
                let lt = data.item.length;
                for(let i=0; i<lt; i++){
                    let item = data.item[i];
                    if(item.type === 'people'){
                        item.name = '@'+item.name;
                    }
                    else if(item.type === 'tag'){
                        item.name = '#'+item.name;
                    }
                }
                this.s_item = {
                    suggestions: data.item
                }
            }
        });
    }

    blur() {
        setTimeout(() => {
            document.getElementById('suggDiv').className = 'suggestions hidden';
        }, 200);
    }

    focus() {
        document.getElementById('suggDiv').className = 'suggestions';
    }

    search() {
        document.getElementById('suggDiv').className = 'suggestions hidden';
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
                this.newAlert("Invalid Search Request", data.reason);
            }
        }, () => {
            this.newAlert("Connection Error", "Please check your connection");
        });
    }
    g_curr() {
        this.g_active = true;
        this.search();
    }
    p_curr() {
        this.p_active = true;
        this.search();
    }
    t_curr() {
        this.t_active = true;
        this.search();
    }

    load_trends() {
        this.searchProv.load_trends().subscribe(data => {
            this.errOc = false;
            if (data.success) {
                this.tr_item = {};
                this.tr_item.trends = data.trends;
            }
            else {
                this.newAlert("Trend Error", "An error occured on our end while loading trends. Please try again later");
            }
        }, () => {
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    search_tr(tr_name) {
        this.navCtrl.push(TagPage, { trend: tr_name });
    }

    sugg_search(s_name, s_type) {
        document.getElementById('suggDiv').className = 'suggestions hidden';
        this.term = s_name;
        this.activeTab = s_type;
        this.search();
    }

    render_pg(ac_type, username) {
        if (ac_type == 'j') {
            this.navCtrl.push(JRenderPage, { username: username });
        }
        else if (ac_type == 'o') {
            this.navCtrl.push(ORenderPage, { username: username });
        }
        else if (ac_type == 'l') {
            this.navCtrl.push(LRenderPage, { code: username });
        }
        else if (ac_type == 'u') {
            this.navCtrl.push(URenderPage, { username: username });
        }
    }

    newAlert(title: string, text: string) {
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }

}
