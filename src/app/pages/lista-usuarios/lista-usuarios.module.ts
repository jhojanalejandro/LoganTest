import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { ModalUsuariosComponent } from '../modal-usuarios/modal-usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaUsuariosComponent,
    ModalUsuariosComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ],
  bootstrap: [
    ModalUsuariosComponent,
    ListaUsuariosComponent
]
})
export class ListaUsuariosModule { }
