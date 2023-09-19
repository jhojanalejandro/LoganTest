import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioModel } from '../lista-usuarios/model/usuario-model.model';
import { UsuarioService } from '../lista-usuarios/service/usuario.service';
import { GlobalConst } from '../common/global-const';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.css'],
})
export class ModalUsuariosComponent implements OnInit {
  @ViewChild('formUserNgForm') formUserNgForm!: NgForm;
  title: string = 'Guardar';
  formUser!: FormGroup;
  datosUsuario: UsuarioModel = {
    id: null,
    clave: '',
    cuenta: '',
    tipoUsuario: '',
    estado: null,
    nombre: ''
  };
  usersType: any[]= [];
  estados: any[]=GlobalConst.estados;
  private readonly _unsubscribe$ = new Subject<void>();

  constructor(
    private cdref: ChangeDetectorRef,
    private _usuarioService: UsuarioService,
    public matDialogRef: MatDialogRef<ModalUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUsersType();
    if (this.datos != null) {
      this.datosUsuario = this.datos;
      this.title = 'Actualizar';
    }
    
    this.formUser = this._formBuilder.group({
      cuenta: new FormControl(this.datosUsuario.cuenta, [Validators.required, Validators.email]),
      clave: new FormControl(this.datosUsuario.clave,Validators.required),
      tipoUsuario: new FormControl(this.datosUsuario.tipoUsuario,Validators.required),
      estado: new FormControl(this.datosUsuario.estado,Validators.required),
      nombre: new FormControl(this.datosUsuario.nombre,Validators.required),
    });
  }

  saveUsuario() {
    
    let RegisterUserPayload: UsuarioModel = {
      id: this.datosUsuario.id,
      estado: this.formUser.value.estado,
      cuenta: this.formUser.value.cuenta,
      clave: this.formUser.value.clave,
      tipoUsuario: this.formUser.value.tipoUsuario,
      nombre: this.formUser.value.nombre,
    };
    this._usuarioService
      .SaveUser(RegisterUserPayload)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (res) => {
          if (res.success) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '',
              html: res.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.cdref.detectChanges();
            this.cdref.markForCheck();
            this.matDialogRef.close(true);
          }
        },
        (response) => {
          this.formUser.enable();
          Swal.fire('', response.message, 'error');
        }
      );
  }


  cerrar(): void {
    this.matDialogRef.close();
  }

  private getUsersType() {
    this._usuarioService
      .getUserType()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((response) => {
        this.usersType = response;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
