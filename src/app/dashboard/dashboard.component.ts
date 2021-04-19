import { Songs } from "./../songs";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import "firebase/storage";
import { finalize } from "rxjs/operators";

import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService
  ) {}
  imageToUpload: File;
  songToUpload: File;
  imagePreview;
  songPreview;
  submitted: boolean = false;
  task: AngularFireUploadTask;
  URL: Observable<string>;
  downloadURL: string;
  downloadURL_image: string;
  isloading = false;
  suceesfullyUploaded = false;
  uploadSuccess: boolean = false;
  percentage: Observable<number>;
  percentage_image: Observable<number>;
  songlist: Observable<any[]>;
  item: Songs[];
  expressions: string[] = [
    "Angry",
    "Disgust",
    "Fear",
    "Happy",
    "Sad",
    "Surprise",
    "Neutral",
  ];
  isfull;
  showaddedSongs = false;

  ngOnInit(): void {
    // this.songlist = this.authService.getSongs();
    this.authService.getSongs().subscribe((res) => {
      console.log(res);
      this.item = res;
      console.log("item =>", this.item);
    });
  }
  addSongs = new FormGroup({
    song: new FormControl("", Validators.required),
    artist: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
  });
  onFileChange(event) {
    this.imageToUpload = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (res) => {
      console.log("Done");
      console.log(this.imagePreview);
      this.imagePreview = reader.result;
    };
  }

  onFileChangeforSongs(event) {
    this.songToUpload = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.songToUpload);
    reader.onload = (res) => {
      // console.log("Done");
      console.log("Song URL->", this.songToUpload);
      this.songPreview = reader.result;
    };
  }

  uploadImage() {
    const path = `Songsimages/${this.addSongs.value["song"]}`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.imageToUpload);
    this.percentage_image = this.task.percentageChanges();
    console.log(this.percentage_image);

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log("FINALIZED");

          this.URL = ref.getDownloadURL();
          this.URL.subscribe((res) => {
            this.downloadURL_image = res;
            console.log("download url for image =>", this.downloadURL_image);

            this.uploadSuccess = true;
          });
        })
      )
      .subscribe();
  }

  goback() {
    this.router.navigateByUrl("");
  }
  uploadSongs() {
    const path = `Songs/${this.addSongs.value["song"]}`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.songToUpload);
    this.percentage = this.task.percentageChanges();

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log("FINALIZED");

          this.URL = ref.getDownloadURL();
          this.URL.subscribe((res) => {
            this.downloadURL = res;
            console.log("download url=>", this.downloadURL);

            this.uploadSuccess = true;
          });
        })
      )
      .subscribe();
  }

  addsongs() {
    this.suceesfullyUploaded = false;
  }

  submitForm() {
    this.showaddedSongs = true;
    const date = new Date();
    const timestamp = date.getTime();
    let date_1 = new Date(timestamp);
    const time = date_1.toLocaleTimeString();
    const exact_date = date_1.toLocaleDateString();
    this.isloading = true;
    const { value, valid, touched } = this.addSongs;
    console.log(value);
    console.log("Submitted => ", valid);
    console.log(touched);
    if (valid && touched) {
      console.log(value);
      this.afs
        .collection("MUSIC")
        .doc(value["song"])
        .set({
          ...value,
          songurl: this.downloadURL,
          imageurl: this.downloadURL_image,
          timestamp: timestamp,
          date: exact_date,
          time: time,
        })
        .then((res) => {
          console.log("Success!");
          this.isloading = false;
          this.suceesfullyUploaded = true;
          this.addSongs.reset();
          this.percentage = null;
          this.percentage_image = null;
        })
        .catch((err) => {
          console.log("Error!");
        });
    } else {
      console.log("HAS ERRORS");
    }
  }
}
