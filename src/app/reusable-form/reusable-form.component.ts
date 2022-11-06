import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {Address} from "./address";
import {Subscription} from "rxjs";
import { COUNTRIES } from '../countries';
import {AddressForm} from "../types";

@Component({
  selector: 'app-reusable-form',
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ReusableFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ReusableFormComponent,
      multi: true,
    },
  ],
  host: {
    "[id]": "id",
  },
})
export class ReusableFormComponent {
  static nextId = 0;
  id = `address-input-${ReusableFormComponent.nextId++}`;
  form = new FormGroup<AddressForm>({
    line1: new FormControl("", {
      validators: Validators.required,
      nonNullable: true,
    }),
    line2: new FormControl(""),
    zipCode: new FormControl("", {
      validators: Validators.required,
      nonNullable: true,
    }),
    city: new FormControl("", {
      validators: Validators.required,
      nonNullable: true,
    }),
    state: new FormControl("", {
      validators: Validators.required,
      nonNullable: true,
    }),
    country: new FormControl("", {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  subscriptions: Subscription[] = [];
  onTouched: any;
  readonly COUNTRIES = COUNTRIES;

  writeValue(value: Address | null): void {
    const address = this.createAddress(value);
    this.form.patchValue(address, { emitEvent: false })
  }

  registerOnChange(fn: (val: Partial<Address> | null) => void): void {
    this.form.valueChanges.subscribe((value) => {
      const address = this.createAddress(value);
      fn(address);
    });
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.form.disable() : this.form.enable();
  }

  validate(control: AbstractControl<Address>): ValidationErrors | null {
    const value = control.value;
    return value && value.isValid() ? null : { address: true };
  }

  //#region Getters

  get line1FC() {
    return this.form.get("line1");
  }
  get cityFC() {
    return this.form.get("city");
  }
  get stateFC() {
    return this.form.get("state");
  }
  get zipCodeFC() {
    return this.form.get("zipCode");
  }
  get countryFC() {
    return this.form.get("country");
  }

  //#endregion
  private createAddress(value: Partial<Address> | null) {
    return new Address(
      value?.line1 || "",
      value?.zipCode || "",
      value?.city || "",
      value?.state || "",
      value?.country || "",
      value?.line2
    );
  }

}
