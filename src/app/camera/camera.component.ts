import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-camera",
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.component.css"],
})
export class CameraComponent implements OnInit {
  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = true;
  isCameraExist = true;
  webcamImage: WebcamImage = null;
  image_file;
  url = "https://facial-expression-rec.herokuapp.com";
  display_image;
  expression_value;
  check_value_of_expression = false;

  errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  constructor(private httpclient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      }
    );
  }

  sendPostRequest() {
    const fd = new FormData();
    fd.append("image", this.image_file);
    this.httpclient.post(`${this.url}/predict`, fd).subscribe((data) => {
      console.log(data);
      this.expression_value = data["expression"];
      console.log(this.expression_value[0]);
      if (this.expression_value[0] == null) {
        console.log("retry");
        this.check_value_of_expression = true;
      } else {
        this.check_value_of_expression = false;
        this.router.navigate(["spotify", this.expression_value[0]]);
      }
    });
  }
  takeSnapshot(): void {
    this.trigger.next();
  }
  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
    this.check_value_of_expression = false;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    this.getPicture.emit(webcamImage);
    this.showWebcam = false;
    this.webcamImage = webcamImage;
    // console.log(webcamImage.imageAsBase64);
    this.display_image = this.webcamImage.imageAsDataUrl;
    const imageBlob = this.dataURItoBlob(this.webcamImage.imageAsBase64);
    this.image_file = new File([imageBlob], "image", { type: "image/jpeg" });
    // console.log(this.image_file);
    // console.log(this.display_image);
    // console.log(this.webcamImage.imageAsBase64);

    this.sendPostRequest();
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/jpg" });
    return blob;
  }
}
