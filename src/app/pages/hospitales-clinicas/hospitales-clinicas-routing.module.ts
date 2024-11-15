import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalesClinicasPage } from './hospitales-clinicas.page';

const routes: Routes = [
  {
    path: '',
    component: HospitalesClinicasPage  // Asocia la ruta base con HospitalesClinicasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Usa RouterModule para manejar las rutas
  exports: [RouterModule]                   // Exporta RouterModule para ser utilizado en el módulo principal
})
export class HospitalesClinicasPageRoutingModule {}
