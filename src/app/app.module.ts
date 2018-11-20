import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from "../pages/home/home";
import { JCommsPage } from "../pages/j-comms/j-comms";
import { JHomePage } from "../pages/j-home/j-home";
import { JournoPage } from "../pages/journo/journo";
import { JOrgPage } from "../pages/j-org/j-org";
import { JProfilePage } from "../pages/j-profile/j-profile";
import { JSignupPage } from "../pages/j-signup/j-signup";
import { JSettingsPage } from '../pages/j-settings/j-settings';
import { JournalistsPage } from "../pages/journalists/journalists";
import { LCommsPage } from "../pages/l-comms/l-comms";
import { LHomePage } from "../pages/l-home/l-home";
import { LProfilePage } from "../pages/l-profile/l-profile";
import { LSettingsPage } from '../pages/l-settings/l-settings';
import { LegislatorsPage } from "../pages/legislators/legislators";
import { MessagePage } from "../pages/message/message";
import { OCommsPage } from "../pages/o-comms/o-comms";
import { OHomePage } from "../pages/o-home/o-home";
import { OJournoPage } from "../pages/o-journo/o-journo";
import { OJournosPage } from "../pages/o-journos/o-journos";
import { OProfilePage } from "../pages/o-profile/o-profile";
import { OrgPage } from "../pages/org/org";
import { OSignupPage } from "../pages/o-signup/o-signup";
import { OSettingsPage } from '../pages/o-settings/o-settings';
import { OrganisationsPage } from "../pages/organisations/organisations";
import { SearchPage } from "../pages/search/search";
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from "../pages/signup/signup";
import { UHomePage } from "../pages/u-home/u-home";
import { UProfilePage } from "../pages/u-profile/u-profile";
import { USignupPage } from "../pages/u-signup/u-signup";
import { UsersPage } from "../pages/users/users";
import { CheckUsernameProvider } from '../providers/check-username/check-username';
import { USettingsPage } from '../pages/u-settings/u-settings';
import { SignupProvider } from '../providers/signup/signup';
import { SigninProvider } from '../providers/signin/signin';
import { ProfileProvider } from '../providers/profile/profile';
import { SignedInProvider } from '../providers/signed-in/signed-in';
import { LogoutProvider } from '../providers/logout/logout';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        JCommsPage,
        JHomePage,
        JOrgPage,
        JournoPage,
        JProfilePage,
        JSignupPage,
        JSettingsPage,
        JournalistsPage,
        LCommsPage,
        LHomePage,
        LProfilePage,
        LSettingsPage,
        LegislatorsPage,
        MessagePage,
        OCommsPage,
        OHomePage,
        OJournoPage,
        OJournosPage,
        OProfilePage,
        OrgPage,
        OSignupPage,
        OSettingsPage,
        OrganisationsPage,
        SearchPage,
        SigninPage,
        SignupPage,
        UHomePage,
        UProfilePage,
        USignupPage,
        UsersPage,
        USettingsPage,
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
        JCommsPage,
        JHomePage,
        JOrgPage,
        JProfilePage,
        JSignupPage,
        JSettingsPage,
        JournalistsPage,
        LCommsPage,
        LHomePage,
        LProfilePage,
        LSettingsPage,
        LegislatorsPage,
        MessagePage,
        OCommsPage,
        OHomePage,
        OJournoPage,
        OJournosPage,
        OProfilePage,
        OrgPage,
        OSignupPage,
        OSettingsPage,
        OrganisationsPage,
        SearchPage,
        SigninPage,
        SignupPage,
        UHomePage,
        UProfilePage,
        USignupPage,
        UsersPage,
        USettingsPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CheckUsernameProvider,
        SignupProvider,
        SigninProvider,
        ProfileProvider,
        SignedInProvider,
        LogoutProvider
    ]
})
export class AppModule { }
