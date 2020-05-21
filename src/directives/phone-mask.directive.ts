import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AsYouType } from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js';

import { UtilService } from '../services/util.service';

@Directive({ selector: '[chat-phone-mask]' })
export class PhoneMaskDirective implements OnInit {

  // tslint:disable-next-line:variable-name
  _countryCode = 'US';

  @Input() set countryCode(countryCode: string) {
    this._countryCode = countryCode;
  }

  applyPhoneMask(value: string, region: string): string {
    let phoneMask = value;
    try {
      const mask = new AsYouType(region as CountryCode);
      phoneMask = mask.input(value);
    } catch (err) {
      console.error(err);
    }
    return phoneMask;
  }

  clean(value: string): string {
    let cleanValue = UtilService.clearPhone(value);
    let formattedValue = '';

    if (!/^\+/.test(cleanValue)) {
      cleanValue = '+' + cleanValue;
    }

    if (cleanValue && cleanValue.length > 1) {
      formattedValue = this.applyPhoneMask(cleanValue, this._countryCode);
    } else {
      formattedValue = cleanValue;
    }

    return formattedValue.trim();
  }

  parse(value: string): string {
    const formattedValue = this.clean(value);

    if (formattedValue === value) {
      return value;
    }
    let start = this.elementRef.nativeElement.selectionStart;
    const end = this.elementRef.nativeElement.selectionEnd + formattedValue.length - value.length;

    if (value.length < formattedValue.length) {
      start = start + (formattedValue.length - value.length);
    }
    if (value.length > formattedValue.length + 1) {
      start = start - (formattedValue.length - value.length);
    }

    this.elementRef.nativeElement.setSelectionRange(start, end);

    return formattedValue;
  }

  valueChanged() {
    this.elementRef.nativeElement.value = this.parse(this.elementRef.nativeElement.value);
  }

  @HostListener('input') onInput() {
    this.valueChanged();
  }

  @HostListener('cut') onCut() {
    this.valueChanged();
  }

  @HostListener('paste') onPaste() {
    this.valueChanged();
  }

  constructor(
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.valueChanged();
  }

}
