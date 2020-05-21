import { Injectable } from '@angular/core';

import { Price } from '../models/price';
import * as XRegExp from 'xregexp';

@Injectable()
export class UtilService {

  static readonly DEFAULT_LANGUAGE = 'en';

  static isAndroid(): boolean {
    return !!navigator.userAgent.match(/Android/i);
  }

  static isBlackBerry(): boolean {
    return !!navigator.userAgent.match(/BlackBerry/i);
  }

  static isIOS(): boolean {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  }

  static isOpera(): boolean {
    return !!navigator.userAgent.match(/Opera Mini/i);
  }

  static isWindows(): boolean {
    return !!navigator.userAgent.match(/IEMobile/i);
  }

  static isMobile(): boolean {
    return (this.isAndroid()
      || this.isBlackBerry()
      || this.isIOS()
      || this.isOpera()
      || this.isWindows()
    );
  }

  static guid(): string {

    function s4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  static currentLanguage(): string {
    let language = window.navigator ? (window.navigator.language ||
      window.navigator['systemLanguage'] ||
      window.navigator['userLanguage']) : this.DEFAULT_LANGUAGE;
    language = language.substr(0, 2).toLowerCase();

    return language;
  }

  static clearPhone(phone: string, withoutPlusPrefix = false): string {
    const pattern = withoutPlusPrefix ? /([^0-9])/g : /([^0-9|+])/g;
    return phone ? phone.replace(pattern, '') : phone;
  }

  static currency(amount: number): string {
    return (Math.round(amount * 100) / 100).toFixed(2);
  }

  static printPrice(price: Price): string {
    return price ? `${this.currency(Number(price.rate))}${price.symbol}` : '';
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static calcWordsCount(text: string): number {
    const regexp = XRegExp('[\\p{Alphabetic}\\p{M}\\p{Nd}\\p{Pc}\\pS]+?.*?([\\p{Z}]+?|$)', 'gu');
    const matches: Array<string> = XRegExp.match(text, regexp);
    return matches.length;
  }

  /* https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f */
  static copyToClipboard(str: string) {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = str;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =
      document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
      document.getSelection().addRange(selected);   // Restore the original selection
    }
  }

}
