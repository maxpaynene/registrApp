import {
  Component,
  Inject,
  Injectable,
  Input,
  OnInit,
  inject,
} from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { UtilsService } from "src/app/services/utils.service";
import { AddUpdateStudentsComponent } from "src/app/shared/components/add-update-students/add-update-students.component";
import { Html5QrcodeScanner } from "html5-qrcode";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  divPhoto: boolean = false;
  html5QrcodeScanner: Html5QrcodeScanner;
  @Input() hrefUrl: string = "";

  ngOnInit(): void {}

  signOut() {
    this.firebaseSvc.signOut();
  }

  addUpdateStudnets() {
    this.utilsSvc.presentModal({
      component: AddUpdateStudentsComponent,
      cssClass: "add-update-modal",
    });
  }

  public async takeImage() {
    this.setDivPhoto(true);
    this.delay(1000).then(() => {
      this.html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 30, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );
      this.html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);
    });
  }

  routerlinkIntro() {
    this.utilsSvc.routerLink("/main/intro");
  }

  onScanSuccess(decodedText, decodedResult) {
    document.getElementById("html5-qrcode-button-camera-stop").click();
    console.log(decodedText);
    console.log(decodedResult);
    this.hrefUrl = decodedText;
    console.log(this.hrefUrl);
    //console.log(document.getElementById("#hrefUrl"));
    //document.getElementById("#hrefUrl").click();
  }

  onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
  }

  private setDivPhoto = async (b: boolean) => (this.divPhoto = b);

  delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
