import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { WebcamModule } from "ngx-webcam";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CameraComponent } from "./camera/camera.component";
import { HttpClientModule } from "@angular/common/http";
import { SpotifyComponent } from "./spotify/spotify.component";
import { AdminComponent } from "./admin/admin.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { VerifymailComponent } from "./verifymail/verifymail.component";
import { AngularFireStorageModule, BUCKET } from "@angular/fire/storage";
import { MatRadioModule } from "@angular/material/radio";
import { MatProgressBarModule } from "@angular/material/progress-bar";
@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    SpotifyComponent,
    AdminComponent,
    DashboardComponent,
    VerifymailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    MatRadioModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
