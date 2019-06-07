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
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from "../pages/home/home";
import { BioPage } from "../pages/bio/bio";
import { ChangeBeatPage } from "../pages/change-beat/change-beat";
import { ChatPage } from "../pages/chat/chat";
import { ChatsPage } from "../pages/chats/chats";
import { CommentPage } from "../pages/comment/comment";
import { ConversationPage } from "../pages/conversation/conversation";
import { CreateLegisPage } from "../pages/create-legis/create-legis";
import { DmPage } from "../pages/dm/dm";
import { EditCommentPage } from "../pages/edit-comment/edit-comment";
import { EditLegPage} from "../pages/edit-leg/edit-leg";
import { EditMessagePage } from "../pages/edit-message/edit-message";
import { FHomePage } from "../pages/f-home/f-home";
import { FollowersPage } from "../pages/followers/followers";
import { FProfilePage } from "../pages/f-profile/f-profile";
import { FreelancersPage } from "../pages/freelancers/freelancers";
import { JBeatSelPage } from "../pages/j-beat-sel/j-beat-sel";
import { JCommsPage } from "../pages/j-comms/j-comms";
import { JHomePage } from "../pages/j-home/j-home";
import { JIntroPage } from "../pages/j-intro/j-intro";
import { JLegisPage } from "../pages/j-legis/j-legis";
import { JLegisInfoPage } from "../pages/j-legis-info/j-legis-info";
import { JOrgPage } from "../pages/j-org/j-org";
import { JOrgSelPage } from "../pages/j-org-sel/j-org-sel";
import { JProfilePage } from "../pages/j-profile/j-profile";
import { JRenderPage } from "../pages/j-render/j-render";
import { JReqPage } from "../pages/j-req/j-req";
import { JSignupPage } from "../pages/j-signup/j-signup";
import { JSettingsPage } from '../pages/j-settings/j-settings';
import { JournalistsPage } from "../pages/journalists/journalists";
import { LCommsPage } from "../pages/l-comms/l-comms";
import { LegislatorPage } from "../pages/legislator/legislator";
import { LLegisInfoPage } from "../pages/l-legis-info/l-legis-info";
import { LHomePage } from "../pages/l-home/l-home";
import { LIntroPage } from "../pages/l-intro/l-intro";
import { LLegisPage } from "../pages/l-legis/l-legis";
import { LProfilePage } from "../pages/l-profile/l-profile";
import { LRenderPage } from "../pages/l-render/l-render";
import { LSettingsPage } from '../pages/l-settings/l-settings';
import { LegislatorsPage } from "../pages/legislators/legislators";
import { MessagePage } from "../pages/message/message";
import { OCommsPage } from "../pages/o-comms/o-comms";
import { OHomePage } from "../pages/o-home/o-home";
import { OIntroPage } from "../pages/o-intro/o-intro";
import { OJournoPage } from "../pages/o-journo/o-journo";
import { OJournosPage } from "../pages/o-journos/o-journos";
import { OProfilePage } from "../pages/o-profile/o-profile";
import { ORenderPage } from "../pages/o-render/o-render";
import { OrgPage } from "../pages/org/org";
import { OrgBeatSelPage } from "../pages/org-beat-sel/org-beat-sel";
import { OrgReassignBeatPage } from "../pages/org-reassign-beat/org-reassign-beat";
import { OSignupPage } from "../pages/o-signup/o-signup";
import { OSettingsPage } from '../pages/o-settings/o-settings';
import { OrganisationsPage } from "../pages/organisations/organisations";
import { OverviewPage } from "../pages/overview/overview";
import { PersonPage } from "../pages/person/person";
import { PostOSigninPage } from "../pages/post-o-signin/post-o-signin";
import { SearchPage } from "../pages/search/search";
import { SettingsPage } from "../pages/settings/settings";
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from "../pages/signup/signup";
import { TrendPage } from "../pages/trend/trend";
import { TagPage } from "../pages/tag/tag";
import { UHomePage } from "../pages/u-home/u-home";
import { UIntroPage } from "../pages/u-intro/u-intro";
import { ULegisPage } from "../pages/u-legis/u-legis";
import { ULegisInfoPage } from "../pages/u-legis-info/u-legis-info";
import { UProfilePage } from "../pages/u-profile/u-profile";
import { URenderPage } from "../pages/u-render/u-render";
import { USignupPage } from "../pages/u-signup/u-signup";
import { UsersPage } from "../pages/users/users";
import { USettingsPage } from '../pages/u-settings/u-settings';
import { UploadPage } from "../pages/upload/upload";
import { UpdateAvatarPage } from "../pages/update-avatar/update-avatar";
import { LegisConvoPage } from "../pages/legis-convo/legis-convo";

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
import { SettingsProvider } from '../providers/settings/settings';
import { ServeProvider } from '../providers/serve/serve';
import { OrgJsProvider } from '../providers/org-js/org-js';
import { DmProvider } from '../providers/dm/dm';
import { TransmitErrorProvider } from '../providers/transmit-error/transmit-error';
import { LegislationProvider } from '../providers/legislation/legislation';

// const config: SocketIoConfig = { url: 'http://192.168.43.55:8095', options: {} };
const config: SocketIoConfig = { url: 'http://127.0.0.1:8095', options: {} };

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        BioPage,
        ChangeBeatPage,
        ChatPage,
        ChatsPage,
        CommentPage,
        ConversationPage,
        CreateLegisPage,
        DmPage,
        EditCommentPage,
        EditLegPage,
        EditMessagePage,
        FHomePage,
        FProfilePage,
        FreelancersPage,
        JBeatSelPage,
        JCommsPage,
        JHomePage,
        JIntroPage,
        JLegisPage,
        JLegisInfoPage,
        JOrgPage,
        JOrgSelPage,
        JProfilePage,
        JRenderPage,
        JReqPage,
        JSignupPage,
        JSettingsPage,
        JournalistsPage,
        LCommsPage,
        LegisConvoPage,
        LegislatorPage,
        LLegisInfoPage,
        LHomePage,
        LIntroPage,
        LLegisPage,
        LProfilePage,
        LRenderPage,
        LSettingsPage,
        LegislatorsPage,
        MessagePage,
        OCommsPage,
        OHomePage,
        OIntroPage,
        OJournoPage,
        OJournosPage,
        OProfilePage,
        ORenderPage,
        OrgPage,
        OrgBeatSelPage,
        OrgReassignBeatPage,
        OSignupPage,
        OSettingsPage,
        OrganisationsPage,
        OverviewPage,
        PersonPage,
        PostOSigninPage,
        SearchPage,
        SettingsPage,
        FollowersPage,
        SigninPage,
        SignupPage,
        TrendPage,
        TagPage,
        UHomePage,
        UIntroPage,
        ULegisPage,
        ULegisInfoPage,
        UProfilePage,
        URenderPage,
        USignupPage,
        UsersPage,
        USettingsPage,
        UploadPage,
        UpdateAvatarPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        SocketIoModule.forRoot(config),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        BioPage,
        ChangeBeatPage,
        ChatPage,
        ChatsPage,
        CommentPage,
        ConversationPage,
        CreateLegisPage,
        DmPage,
        EditCommentPage,
        EditLegPage,
        EditMessagePage,
        FHomePage,
        FProfilePage,
        FreelancersPage,
        JBeatSelPage,
        JCommsPage,
        JHomePage,
        JIntroPage,
        JLegisPage,
        JLegisInfoPage,
        JOrgPage,
        JOrgSelPage,
        JProfilePage,
        JRenderPage,
        JReqPage,
        JSignupPage,
        JSettingsPage,
        JournalistsPage,
        LCommsPage,
        LegisConvoPage,
        LegislatorPage,
        LLegisInfoPage,
        LHomePage,
        LIntroPage,
        LLegisPage,
        LProfilePage,
        LRenderPage,
        LSettingsPage,
        LegislatorsPage,
        MessagePage,
        OCommsPage,
        OHomePage,
        OIntroPage,
        OJournoPage,
        OJournosPage,
        OProfilePage,
        ORenderPage,
        OrgPage,
        OrgBeatSelPage,
        OrgReassignBeatPage,
        OSignupPage,
        OSettingsPage,
        OrganisationsPage,
        OverviewPage,
        PersonPage,
        PostOSigninPage,
        SearchPage,
        SettingsPage,
        FollowersPage,
        SigninPage,
        SignupPage,
        TrendPage,
        TagPage,
        UHomePage,
        UIntroPage,
        ULegisPage,
        ULegisInfoPage,
        UProfilePage,
        URenderPage,
        USignupPage,
        UsersPage,
        USettingsPage,
        UploadPage,
        UpdateAvatarPage
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
        UploadProvider,
        SettingsProvider,
        ServeProvider,
        OrgJsProvider,
        DmProvider,
        TransmitErrorProvider,
        LegislationProvider
    ]
})
export class AppModule { }
