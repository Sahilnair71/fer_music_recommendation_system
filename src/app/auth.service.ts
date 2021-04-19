import { Songs } from "./songs";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";

import { User } from "./user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: any;
  userSnapshot: Observable<User>;
  songSnapshot: AngularFirestoreCollection<Songs>;
  checkuser: any;
  userEmail: any;
  songlist: Observable<Songs[]>;
  private itemsCollection: AngularFirestoreCollection<Songs>;
  private songCollection: AngularFirestoreCollection<Songs>;
  items: Observable<Songs[]>;
  songs: Observable<Songs[]>;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });

    // firebase querey for song

    this.itemsCollection = afs.collection<Songs>("MUSIC", (ref) =>
      ref.orderBy("timestamp", "desc").limit(3)
    );
    this.items = this.itemsCollection.valueChanges();
    this.songCollection = afs.collection<Songs>("MUSIC", (ref) =>
      ref.orderBy("timestamp", "desc")
    );
    this.songs = this.songCollection.valueChanges();
  }

  SignUp(UserVal) {
    console.log(UserVal);

    this.afAuth
      .createUserWithEmailAndPassword(UserVal["email"], UserVal["password"])
      .then((result) => {
        console.log(result);
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user, UserVal);
      })
      .catch((error) => {
        window.alert(error.message);
      });

    return false;
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((user) => {
        this.checkuser = user;
        user.sendEmailVerification();
      })
      .catch((err) => console.log(err))
      .then(() => {
        this.router.navigate(["verifyemail"]);
      });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SetUserData(user, UserVal) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.email}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      UserName: UserVal["username"],
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate([""]);
    });
  }

  SignIn(UserVal) {
    this.userEmail = UserVal["email_1"];
    return this.afAuth
      .signInWithEmailAndPassword(UserVal["email_1"], UserVal["password_1"])
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(["dashboard"]);
        });
        // console.log(result['user']['uid']);
        this.getData(UserVal["email"]);

        // this.SetUserData(result.user, UserVal);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  async getData(email) {
    const userVal = this.afs.collection("users").doc<User>(email);
    let userSnapshot = await userVal.valueChanges();
    userSnapshot.subscribe((res) => {
      console.log(res);
    });
  }

  getSongs() {
    // const songVal = this.afs.collection<Songs>("MUSIC");
    // let songSnapshot = await songVal.valueChanges();
    // songSnapshot.subscribe((res) => {
    //   console.log(res);

    // });
    // console.log(songSnapshot);
    //   return songSnapshot;
    // }
    return this.items;
  }
  getallSongs() {
    return this.songs;
  }
}
