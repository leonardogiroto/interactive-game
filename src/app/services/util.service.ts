import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  public replaceTag(replaceText): string {
    return replaceText.replace(
      /([\[(])(.+?)([\])])/g,
      this._getTag
    );
  }

  public capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private _getTag(match, bracket1, tag: string): string {
    return localStorage.getItem(tag);
  }

}
