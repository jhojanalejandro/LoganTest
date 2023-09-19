import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { UsuarioModel } from './model/usuario-model.model';
import { UsuarioService } from './service/usuario.service';
import { ModalUsuariosComponent } from '../modal-usuarios/modal-usuarios.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  listaUsuarios: UsuarioModel[] = [];
  configForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'nombre',
    'cuenta',
    'clave',
    'tipoUsuarios',
    'estados',
    'acciones',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  visibleOption: boolean = false;
  usuarioSelected: UsuarioModel | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private readonly _unsubscribe$ = new Subject<void>();
  selectedContracttorForm!: FormGroup;
  isRowSelected = (row: any) => row === this.usuarioSelected;

  constructor(
    private _matDialog: MatDialog,
    private cdref: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    private _usuarioListService: UsuarioService
  ) {}

  columnas = [
    { title: 'NOMBRE', name: 'nombre' },
    { title: 'CUENTA', name: 'cuenta' },
    { title: 'Clave', name: 'clave' },
    { title: 'TIPO', name: 'tipoUsuarios' },
    { title: 'ESTADO', name: 'estados' },
    { title: 'OPCIONES', name: 'acciones' }
  ];

  ngOnInit(): void {
    this.getDatausuario();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  selectRowFull(data: any) {
    console.log(data);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    if (item != null) {
      return item.id || index;
    }
  }

  getDatausuario() {
    this._usuarioListService
      .ObtenerUsuarios()
      .subscribe((listaUsuariosResponse: any) => {
        this.listaUsuarios = listaUsuariosResponse;
        this.dataSource = new MatTableDataSource(this.listaUsuarios);
        this.cdref.detectChanges();
      });
  }

  editarUsuario(data: any) {
    const dialogModificacion = this._matDialog.open(ModalUsuariosComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: false,
      data: data
    });
    dialogModificacion
      .afterClosed()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.getDatausuario();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
