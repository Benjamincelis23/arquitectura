import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HospitalesClinicasPageRoutingModule } from './hospitales-clinicas-routing.module';
import { HospitalesClinicasPage } from './hospitales-clinicas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HospitalesClinicasPageRoutingModule
  ],
  declarations: [HospitalesClinicasPage]
})
export class HospitalesClinicasPageModule {}
