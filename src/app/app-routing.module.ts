import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CameraComponent } from "./camera/camera.component";
import { SpotifyComponent } from "./spotify/spotify.component";
import { AdminComponent } from "./admin/admin.component";
import { from } from "rxjs";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { VerifymailComponent } from "./verifymail/verifymail.component";
const routes: Routes = [
  { path: "", component: CameraComponent },
  { path: "spotify/:id", component: SpotifyComponent },
  { path: "admin", component: AdminComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "verifyemail", component: VerifymailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
