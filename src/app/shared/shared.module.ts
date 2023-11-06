import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateStudentsComponent } from './components/add-update-students/add-update-students.component';
import { HttpClientModule } from '@angular/common/http';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateStudentsComponent
  ],
  exports:[
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    ReactiveFormsModule,
    AddUpdateStudentsComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule ,
    RouterModule
  ],
  providers: [RickAndMortyService]
})
export class SharedModule { }
