import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Hub } from 'aws-amplify';
import { NavigationEnd, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { filter } from 'rxjs';
import { APIService } from './API.service';
import { UtilsService } from './services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from './shared-components/dialogs/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  title = 'eki-bussiness';
  showFiller = false;
  isLogging = false;
  nameBottonPush = "";
  name: any = "";
  email: any = "";
  // BEFORE LOGUED
  services = {
    async handleSignUp(formData: Record<string, any>) {
      let { username, password, attributes } = formData;
      // console.log("handleSignUp");
      return Auth.signUp({
        username,
        password,
        attributes,
      });
    },
    async handleConfirmSignUp(formData: Record<string, any>) {
      let { username, code } = formData;
      // console.log("handleconfirmSignUp");
      return Auth.confirmSignUp(
        username,
        code
      );
    },
    async handleSignIn(formData: Record<string, any>) {
      let { username, password } = formData;
      // console.log("handleSignIn");
      return Auth.signIn({
        username,
        password,
      });
    },
    async handleConfirmSignIn(formData: Record<string, any>) {
      let { username, code, mfaType } = formData;
      // console.log("handleConfirmSignIn");
      return Auth.confirmSignIn(
        username,
        code,
        mfaType
      );
    },
    async handleForgotPassword(username: string) {
      // console.log("handleForgotPassword");
      return Auth.forgotPassword(username.toString());
    }
  };


  // AFTER LOGUED
  listener = async (data: any) => {
    switch (data.payload.event) {
      case 'signIn':
        await this.signIn(data)
        break;
      case 'signUp':
        try {
          console.log('user signed up');
        } catch (error) {
          console.error("error in signUp", error);
        }
        break;
      case 'signOut':
        await this.signOutEvent();
        break;
      case 'signIn_failure':
        console.log('user sign in failed');
        await this.signOutEvent();
        break;
      case 'tokenRefresh':
        console.log('token refresh succeeded');
        this.gotoPage('collaborator/home')
        break;
      case 'tokenRefresh_failure':
        console.log('token refresh failed');
        await this.signOutEvent();
        break;
      case 'confirmSignUp':
        console.log('confirmSignUp');
        break;
      case 'configured':
        console.log('the Auth module is configured');
        break;
      case 'forceNewPassword':
        console.log('Forced new password');
        break;
      case 'confirmResetPassword':
        console.log('confirmResetPassword');
        break;
      case 'verifyUser':
        console.log('verifyUser');
        break;
      case 'signUp_failure':
        console.error('user sign up failed');
        break;
      case 'completeNewPassword_failure':
        console.error('user did not complete new password flow');
        break;
      case 'autoSignIn':
        console.log('auto sign in successful');
        break;
      case 'autoSignIn_failure':
        console.error('auto sign in failed');
        break;
      case 'forgotPassword':
        console.log('password recovery initiated');
        break;
      case 'forgotPassword_failure':
        console.error('password recovery failed');
        await this.signOutEvent();
        break;
      case 'forgotPasswordSubmit':
        console.log('password confirmation successful');
        break;
      case 'forgotPasswordSubmit_failure':
        console.error('password confirmation failed');
        break;
      case 'cognitoHostedUI':
        console.log('Cognito Hosted UI sign in successful');
        break;
      case 'cognitoHostedUI_failure':
        console.error('Cognito Hosted UI sign in failed');
        await this.signOutEvent();
        break;
      case 'customOAuthState':
        console.log('custom state returned from CognitoHosted UI');
        break;
      case 'customState_failure':
        console.error('custom state failure');
        await this.signOutEvent();
        break;
      case 'parsingCallbackUrl':
        console.log('Cognito Hosted UI OAuth url parsing initiated');
        break;
      case 'userDeleted':
        console.log('user deletion successful');
        await this.signOutEvent();
        break;
    }
  }

  constructor(
    private router: Router,
    public library: FaIconLibrary,
    public apiService: APIService,
    private utilsService: UtilsService,
    public dialog: MatDialog
  ) {
    library.addIconPacks(fas, fab, far);
  }


  async signIn(data) {
    this.clearSessionStorgae();
    try {
    let roolGroups = data.payload.data.signInUserSession.idToken.payload["cognito:groups"]
      if (roolGroups.includes("bussiness") || roolGroups.includes("employee")) {
        await this.getUser();
        this.gotoPage('collaborator/home')
      } else {
        this.dialog.open(DialogAlertComponent,
          {
            data: {
              message: "Lo sentimos, no tienes los permisos necesarios para acceder a esta aplicación. Si crees que esto es un error, por favor contacta al administrador del sistema para obtener ayuda. Gracias.",
              title: "Acceso no permitido"
            },
            width: "480px"
          });

        await Auth.signOut();
      }
    } catch (error) {
      console.log("Error signIn", error)
      await Auth.signOut();
    }
  }


  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.pressButtonMenu(event.url)
    });
  }

  pressButtonMenu(url: string) {

    const buttonsNames = {
      users: "users",
      teams: "teams",
      path: "path",
      metrics: "metrics",
      profile: "profile",
    }

    for (var buttonsName in buttonsNames) {
      if (url.toLowerCase().includes(buttonsName.toLowerCase())) {
        this.nameBottonPush = buttonsName
      }
    }
  }

  async ngOnInit(): Promise<void> {
    Hub.listen('auth', this.listener);
    await this.checkLogin()
  }

  async signOut(): Promise<void> {
    try {
      await Auth.signOut();
      this.clearSessionStorgae();
    } catch (error) {
      console.error('error signing out: ', error);
    }
  }

  clearSessionStorgae() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('user');
  }

  gotoPage(page: string) {
    this.router.navigateByUrl(page)
  }

  async getUser(): Promise<void> {
    try {
      const user = await Auth.currentUserInfo();
      const userId = user.attributes["custom:userID"] ? user.attributes["custom:userID"] : user.attributes["sub"]

      const { name, lastname, email } = await this.apiService.GetUser(userId)
      this.name = `${name} ${lastname}`
      this.email = email
      const sessionItem = JSON.stringify(
        {
          id: userId,
          author: user.username,
          name: this.name,
          email: this.email
        }
      );

      const companyID = await this.getCompany(userId);
      const userDataId = await this.getUserData(userId)

      sessionStorage.setItem("user", sessionItem);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userDataId", userDataId || "NO_DATA");
      sessionStorage.setItem("companyId", companyID || "NO_DATA");

      this.isLogging = true;
    } catch (err) {
      // console.log("error get user session")
      console.error(err)
      this.isLogging = false;
    }
  }

  async userIsLogged() {
    try {
      await Auth.currentAuthenticatedUser();
      this.isLogging = true;
      return true;
    } catch {
      // console.log("error identificate session")
      this.isLogging = false;
      return false;
    }
  }

  async checkLogin() {
    Auth.currentAuthenticatedUser()
      .then(async user => {
        this.isLogging = true;
        if (sessionStorage.getItem("user") === null) {
          await this.getUser()
        }
      })
      .catch(async err => {
        console.error('Usuario no autenticado:', err);
        await Auth.signOut();
      });
  }

  async signOutEvent() {
    try {
      this.clearSessionStorgae();
      this.router.navigate(['/'])
      console.log("signOutEvent")
      this.isLogging = false;
    } catch (error) {
      console.error('error signing out: ', error);
    }
  }

  async getCompany(userID) {
    try {
      return (await (this.apiService.ListCompanyDatabyUserID(userID))).items[0]?.id
    } catch {
      return "NO_DATA"
    }
  }

  async getUserData(userID){
    try {
      return (await (this.apiService.UserDataByUserId(userID))).items[0]?.id
    } catch {
      return "NO_DATA"
    }
  }
}
