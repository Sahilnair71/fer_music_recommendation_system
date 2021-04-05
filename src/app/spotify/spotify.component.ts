import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-spotify",
  templateUrl: "./spotify.component.html",
  styleUrls: ["./spotify.component.css"],
})
export class SpotifyComponent implements OnInit {
  expression;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.expression = this.route.snapshot.paramMap.get("id");
    console.log(this.expression, "spotify");
  }
}
