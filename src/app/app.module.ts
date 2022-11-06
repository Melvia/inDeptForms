import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleFormGroupComponent } from './simple-form-group/simple-form-group.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NestedFormGroupComponent } from './nested-form-group/nested-form-group.component';
import { ReusableFormComponent } from './reusable-form/reusable-form.component';
import { ReusableFormWrapperComponent } from './reusable-form-wrapper/reusable-form-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleFormGroupComponent,
    NestedFormGroupComponent,
    ReusableFormComponent,
    ReusableFormWrapperComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
