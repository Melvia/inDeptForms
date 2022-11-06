import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { COUNTRIES } from '../countries';

@Component({
  selector: 'app-nested-form-group',
  templateUrl: './nested-form-group.component.html',
  styleUrls: ['./nested-form-group.component.scss']
})
export class NestedFormGroupComponent implements OnInit {
  profileFormGroup = new FormGroup<ProfileForm>({
    name: new FormControl("", {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl("", {
      validators: [Validators.email, Validators.required],
      nonNullable: true,
    }),
    address: new FormGroup<AddressForm>({
      line1: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      line2: new FormControl(""),
      city: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      state: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      zipCode: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      country: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
    }),
  });

  readonly COUNTRIES = COUNTRIES;
  constructor() {}

  get nameFC() {
    return this.profileFormGroup.get("name");
  }
  get emailFC() {
    return this.profileFormGroup.get("email");
  }
  get line1FC() {
    return this.profileFormGroup.get("line1");
  }
  get cityFC() {
    return this.profileFormGroup.get("city");
  }
  get stateFC() {
    return this.profileFormGroup.get("state");
  }
  get zipCodeFC() {
    return this.profileFormGroup.get("zipCode");
  }
  get countryFC() {
    return this.profileFormGroup.get("country");
  }
  ngOnInit(): void {
  }

}

type ProfileForm = {
  name: FormControl<string>;
  email: FormControl<string>;
  address: FormGroup<AddressForm>;
};

type AddressForm = {
  line1: FormControl<string>;
  line2?: FormControl<string | null>;
  zipCode: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  country: FormControl<string>;
};
