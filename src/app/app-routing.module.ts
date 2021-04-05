import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CameraComponent } from "./camera/camera.component";
import { SpotifyComponent } from "./spotify/spotify.component";

const routes: Routes = [
  { path: "", component: CameraComponent },
  { path: "spotify/:id", component: SpotifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
