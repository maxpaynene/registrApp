import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import QRCode from 'qrcode';

@Component({
  selector: 'app-add-update-students',
  templateUrl: './add-update-students.component.html',
  styleUrls: ['./add-update-students.component.scss'],
})
export class AddUpdateStudentsComponent implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;
  src = null;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    this.getQr();
  }

  getQr() {
    QRCode.toDataURL(
      `192.168.0.144:5500/index.html?uuid=${this.user?.uid}` || ''
    )
      .then((url) => (this.src = url))
      .catch((err) => {
        console.error(err);
      });
  }

  getName = () => {
    return (
      this.user?.name[0].toUpperCase() + this.user?.name.substring(1) || ''
    );
  };
}
