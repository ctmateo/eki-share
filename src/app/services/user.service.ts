// user.service.ts

import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { APIService, UpdateUserDataInput, UpdateUserInput } from 'src/app/API.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  dataSource: any = [];
  userDB: any = [];

  private userDataPromise: Promise<any> = Promise.resolve();

  constructor(private api: APIService) { }

  private async getUserDataInternal(userID): Promise<any> {
    try {
      const result = await this.api.UserDataByUserId(userID);
      this.userDB = result || {};
      return this.userDB;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }

  async getUser(): Promise<any> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userID = user.attributes['custom:userID'];
      const userDataID = await this.api.UserDataByUserId(userID);
      const userDB = await this.api.GetUser(userID);

      this.dataSource = {
        "email": user.attributes.email,
        "name": userDB.name,
        "lastname": userDB.lastname,
        "userID": userID,
        "userDataID": userDataID?.items?.[0]?.id,
        "phone": userDB.phone,
        "descriptionProfile": userDataID?.items?.[0]?.descriptionProfile,
        "typeUser": userDB.__typename
      }

      this.userDataPromise = this.getUserDataInternal(userID);
      await this.userDataPromise;

      return this.dataSource;
    } catch (error) {
      console.error('Error obteniendo el usuario:', error);
    }
  }

  getUserDataOnce(): Promise<any> {
    if (!this.userDataPromise) {
      this.userDataPromise = this.getUserDataInternal(this.dataSource['userID']);
    }
    return this.userDataPromise;
  }

  async getUserData(userID) {
    try {
      if (!this.userDataPromise) {
        this.userDataPromise = this.getUserDataInternal(userID);
      }
      return await this.userDataPromise;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }

  async updateUser(name, last_name, description) {
    const data: UpdateUserInput = {
      id: this.dataSource['userID'],
      name: name,
      lastname: last_name,
    }
    const dataUpdateNewUser: UpdateUserDataInput = {
      id: this.dataSource['userDataID'],
      descriptionProfile: description,
    }

    try {
      await this.api.UpdateUser(data);
      await this.api.UpdateUserData(dataUpdateNewUser);
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
    }
  }

  async updateLinksData(webpage = null, linkedin = null, twitter = null, youtube = null) {
    const data: UpdateUserDataInput = {
      id: this.dataSource['userDataID'],
    }
    if (webpage) {
      data['webpage'] = webpage
    }
    if (linkedin) {
      data['linkedin'] = linkedin
    }
    if (twitter) {
      data['twitter'] = twitter
    }
    if (youtube) {
      data['youtube'] = youtube
    }
    await this.api.UpdateUserData(data);
  }

  firstLetterUpper(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
