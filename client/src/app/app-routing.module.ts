import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticatedGuard} from "./shared/guards/authenticated.guard";
import {LoginPageComponent} from "./components/pages/login-page/login-page.component";
import {AnonymousGuard} from "./shared/guards/anonymous.guard";
import {ProfilePageComponent} from "./components/pages/profile-page/profile-page.component";
import {CaretakerListPageComponent} from "./components/pages/caretaker-list-page/caretaker-list-page.component";
import {PatientListPageComponent} from "./components/pages/patient-list-page/patient-list-page.component";
import {UserPageComponent} from "./components/pages/user-page/user-page.component";
import {MedicationPageComponent} from "./components/pages/medication-page/medication-page.component";
import {MedicationListPageComponent} from "./components/pages/medication-list-page/medication-list-page.component";
import {PatientCreatePageComponent} from "./components/pages/patient-create-page/patient-create-page.component";
import {PatientEditPageComponent} from "./components/pages/patient-edit-page/patient-edit-page.component";
import {CaretakerCreatePageComponent} from "./components/pages/caretaker-create-page/caretaker-create-page.component";
import {CaretakerEditPageComponent} from "./components/pages/caretaker-edit-page/caretaker-edit-page.component";
import {MedicationCreatePageComponent} from "./components/pages/medication-create-page/medication-create-page.component";
import {MedicationEditPageComponent} from "./components/pages/medication-edit-page/medication-edit-page.component";
import {DoctorGuard} from "./shared/guards/doctor.guard";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/profile' },
  { path: 'login', canActivate: [ AnonymousGuard ], component: LoginPageComponent },
  { path: 'profile', canActivate: [ AuthenticatedGuard ], component: ProfilePageComponent },
  { path: 'caretaker', canActivate: [ AuthenticatedGuard, DoctorGuard ], component: CaretakerListPageComponent },
  { path: 'patient', canActivate: [ AuthenticatedGuard, DoctorGuard ], component: PatientListPageComponent },
  { path: 'user/:id', canActivate: [ AuthenticatedGuard ], component: UserPageComponent },
  { path: 'medication', canActivate: [ AuthenticatedGuard ], component: MedicationListPageComponent },
  { path: 'medication/new', canActivate: [ AuthenticatedGuard, DoctorGuard ], component: MedicationCreatePageComponent },
  { path: 'medication/:id', canActivate: [ AuthenticatedGuard ], component: MedicationPageComponent },
  { path: 'medication/:id/edit', canActivate: [ AuthenticatedGuard, DoctorGuard ], component: MedicationEditPageComponent },
  { path: 'patient/new', canActivate: [ AuthenticatedGuard, DoctorGuard ], component: PatientCreatePageComponent },
  { path: 'patient/:id/edit', canActivate: [ AuthenticatedGuard, DoctorGuard ], component: PatientEditPageComponent },
  { path: 'caretaker/new', canActivate: [ AuthenticatedGuard, DoctorGuard ], component: CaretakerCreatePageComponent },
  { path: 'caretaker/:id/edit', canActivate: [ AuthenticatedGuard, DoctorGuard ], component: CaretakerEditPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
