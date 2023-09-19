import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'lista-usuario/inicio'},
  {
    path: '',
    component: ListaUsuariosComponent,
    children   : [
        {path: '', loadChildren: () => import('../app/pages/lista-usuarios/lista-usuarios.module').then(m => m.ListaUsuariosModule)},
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
