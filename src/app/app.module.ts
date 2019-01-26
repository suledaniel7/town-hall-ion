import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';;
import { File } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser"
import { FilePath } from "@ionic-native/file-path";
import { FileTransfer } from "@ionic-native/file-transfer";
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from "../pages/home/home";
import { CommentPage } from "../pages/comment/comment";
import { ConversationPage } from "../pages/conversation/conversation";
import { EditCommentPage } from "../pages/edit-comment/edit-comment";
import { EditMessagePage } from "../pages/edit-message/edit-message";
import { FCommsPage } from "../pages/f-comms/f-comms";
import { FHomePage } from "../pages/f-home/f-home";
import { FProfilePage } from "../pages/f-profile/f-profile";
import { FSettingsPage } from "../pages/f-settings/f-settings";
import { FreelancersPage } from "../pages/freelancers/freelancers";
import { JBeatSelPage } from "../pages/j-beat-sel/j-beat-sel";
import { JCommsPage } from "../pages/j-comms/j-comms";
import { JHomePage } from "../pages/j-home/j-home";
import { JournoPage } from "../pages/journo/journo";
import { JOrgPage } from "../pages/j-org/j-org";
import { JOrgSelPage } from "../pages/j-org-sel/j-org-sel";
import { JProfilePage } from "../pages/j-profile/j-profile";
import { JRenderPage } from "../pages/j-render/j-render";
import { JSignupPage } from "../pages/j-signup/j-signup";
import { JSettingsPage } from '../pages/j-settings/j-settings';
import { JournalistsPage } from "../pages/journalists/journalists";
import { LCommsPage } from "../pages/l-comms/l-comms";
import { LegisPage } from "../pages/legis/legis";
import { LHomePage } from "../pages/l-home/l-home";
import { LProfilePage } from "../pages/l-profile/l-profile";
import { LRenderPage } from "../pages/l-render/l-render";
import { LSettingsPage } from '../pages/l-settings/l-settings';
import { LegislatorsPage } from "../pages/legislators/legislators";
import { MessagePage } from "../pages/message/message";
import { OCommsPage } from "../pages/o-comms/o-comms";
import { OHomePage } from "../pages/o-home/o-home";
import { OJournoPage } from "../pages/o-journo/o-journo";
import { OJournosPage } from "../pages/o-journos/o-journos";
import { OProfilePage } from "../pages/o-profile/o-profile";
import { ORenderPage } from "../pages/o-render/o-render";
import { OrgPage } from "../pages/org/org";
import { OSignupPage } from "../pages/o-signup/o-signup";
import { OSettingsPage } from '../pages/o-settings/o-settings';
import { OrganisationsPage } from "../pages/organisations/organisations";
import { PersonPage } from "../pages/person/person";
import { SearchPage } from "../pages/search/search";
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from "../pages/signup/signup";
import { TrendPage } from "../pages/trend/trend";
import { TagPage } from "../pages/tag/tag";
import { UHomePage } from "../pages/u-home/u-home";
import { UProfilePage } from "../pages/u-profile/u-profile";
import { USignupPage } from "../pages/u-signup/u-signup";
import { UsersPage } from "../pages/users/users";
import { USettingsPage } from '../pages/u-settings/u-settings';
import { UploadPage } from "../pages/upload/upload";

import { CheckUsernameProvider } from '../providers/check-username/check-username';
import { SignupProvider } from '../providers/signup/signup';
import { SigninProvider } from '../providers/signin/signin';
import { ProfileProvider } from '../providers/profile/profile';
import { SignedInProvider } from '../providers/signed-in/signed-in';
import { LogoutProvider } from '../providers/logout/logout';
import { JAccountProvider } from '../providers/j-account/j-account';
import { SearchProvider } from '../providers/search/search';
import { MessageProvider } from '../providers/message/message';
import { RenderProvider } from '../providers/render/render';
import { ConversationProvider } from '../providers/conversation/conversation';
import { AddressProvider } from '../providers/address/address';
import { UploadProvider } from '../providers/upload/upload';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        CommentPage,
        ConversationPage,
        EditCommentPage,
        EditMessagePage,
        FCommsPage,
        FHomePage,
        FProfilePage,
        FSettingsPage,
        FreelancersPage,
        JBeatSelPage,
        JCommsPage,
        JHomePage,
        JOrgPage,
        JOrgSelPage,
        JournoPage,
        JProfilePage,
        JRenderPage,
        JSignupPage,
        JSettingsPage,
        JournalistsPage,
        LCommsPage,
        LegisPage,
        LHomePage,
        LProfilePage,
        LRenderPage,
        LSettingsPage,
        LegislatorsPage,
        MessagePage,
        OCommsPage,
        OHomePage,
        OJournoPage,
        OJournosPage,
        OProfilePage,
        ORenderPage,
        OrgPage,
        OSignupPage,
        OSettingsPage,
        OrganisationsPage,
        PersonPage,
        SearchPage,
        SigninPage,
        SignupPage,
        TrendPage,
        TagPage,
        UHomePage,
        UProfilePage,
        USignupPage,
        UsersPage,
        USettingsPage,
        UploadPage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        CommentPage,
        ConversationPage,
        EditCommentPage,
        EditMessagePage,
        FCommsPage,
        FHomePage,
        FProfilePage,
        FSettingsPage,
        FreelancersPage,
        JBeatSelPage,
        JCommsPage,
        JHomePage,
        JOrgPage,
        JOrgSelPage,
        JProfilePage,
        JRenderPage,
        JSignupPage,
        JSettingsPage,
        JournalistsPage,
        LCommsPage,
        LegisPage,
        LHomePage,
        LProfilePage,
        LRenderPage,
        LSettingsPage,
        LegislatorsPage,
        MessagePage,
        OCommsPage,
        OHomePage,
        OJournoPage,
        OJournosPage,
        OProfilePage,
        ORenderPage,
        OrgPage,
        OSignupPage,
        OSettingsPage,
        OrganisationsPage,
        PersonPage,
        SearchPage,
        SigninPage,
        SignupPage,
        TrendPage,
        TagPage,
        UHomePage,
        UProfilePage,
        USignupPage,
        UsersPage,
        USettingsPage,
        UploadPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        File,
        FileChooser,
        FilePath,
        FileTransfer,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CheckUsernameProvider,
        SignupProvider,
        SigninProvider,
        ProfileProvider,
        SignedInProvider,
        LogoutProvider,
    JAccountProvider,
    SearchProvider,
    MessageProvider,
    RenderProvider,
    ConversationProvider,
    AddressProvider,
    UploadProvider
    ]
})
export class AppModule { }
