import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreService} from "./shared/service/store.service";
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import {HttpClientModule} from "@angular/common/http";
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { UserPresentationTableComponent } from './components/shared/user-presentation-table/user-presentation-table.component';
import { PatientListPageComponent } from './components/pages/patient-list-page/patient-list-page.component';
import { CaretakerListPageComponent } from './components/pages/caretaker-list-page/caretaker-list-page.component';
import { UserListComponent } from './components/shared/user-list/user-list.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { MedicationPageComponent } from './components/pages/medication-page/medication-page.component';
import { MedicationTableComponent } from './components/shared/medication-table/medication-table.component';
import { MedicationListPageComponent } from './components/pages/medication-list-page/medication-list-page.component';
import { MedicationListComponent } from './components/shared/medication-list/medication-list.component';
import { PatientCreatePageComponent } from './components/pages/patient-create-page/patient-create-page.component';
import { PatientFormComponent } from './components/shared/patient-form/patient-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PatientEditPageComponent } from './components/pages/patient-edit-page/patient-edit-page.component';
import { CaretakerFormComponent } from './components/shared/caretaker-form/caretaker-form.component';
import { CaretakerCreatePageComponent } from './components/pages/caretaker-create-page/caretaker-create-page.component';
import { CaretakerEditPageComponent } from './components/pages/caretaker-edit-page/caretaker-edit-page.component';
import { NotificationsComponent } from './components/core/notifications/notifications.component';
import { MedicationCreatePageComponent } from './components/pages/medication-create-page/medication-create-page.component';
import { MedicationEditPageComponent } from './components/pages/medication-edit-page/medication-edit-page.component';
import { MedicationFormComponent } from './components/shared/medication-form/medication-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProfilePageComponent,
    NavbarComponent,
    UserPresentationTableComponent,
    PatientListPageComponent,
    CaretakerListPageComponent,
    UserListComponent,
    UserPageComponent,
    MedicationPageComponent,
    MedicationTableComponent,
    MedicationListPageComponent,
    MedicationListComponent,
    PatientCreatePageComponent,
    PatientFormComponent,
    PatientEditPageComponent,
    CaretakerFormComponent,
    CaretakerCreatePageComponent,
    CaretakerEditPageComponent,
    NotificationsComponent,
    MedicationCreatePageComponent,
    MedicationEditPageComponent,
    MedicationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
