import { Component, OnInit, inject } from "@angular/core";
import { User } from "src/app/models/user.model";
import { FirebaseService } from "src/app/services/firebase.service";
import { UtilsService } from "src/app/services/utils.service";
import QRCode from "qrcode";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-add-update-students",
  templateUrl: "./add-update-students.component.html",
  styleUrls: ["./add-update-students.component.scss"],
})
export class AddUpdateStudentsComponent implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;
  src = null;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage("user");
    this.getQr();
  }

  getQr() {
    const URI = "dainty-selkie-8b11a6.netlify.app/";
    QRCode.toDataURL(
      `https://${URI}?uuid=${this.user?.uid}&jsonConfig=${JSON.stringify(
        environment.firebaseConfig
      )}` || ""
    )
      .then((url) => (this.src = url))
      .catch((err) => {
        console.error(err);
      });
  }

  getName = () => {
    return (
      this.user?.name[0].toUpperCase() + this.user?.name.substring(1) || ""
    );
  };
}
