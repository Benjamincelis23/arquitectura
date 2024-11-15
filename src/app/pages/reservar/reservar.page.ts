import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
})
export class ReservarPage implements OnInit {
  especialidad?: string;
  fechaCita?: string;
  horaCita?: string;
  horasDisponibles: string[] = [];

  constructor() {}

  ngOnInit() {}

  cargarHoras() {
    if (this.especialidad === 'medicina-general') {
      this.horasDisponibles = ['09:00', '10:00', '11:00'];
    } else if (this.especialidad === 'traumatologia') {
      this.horasDisponibles = ['10:00', '11:00', '14:00'];
    } else if (this.especialidad === 'pediatria') {
      this.horasDisponibles = ['09:00', '15:00'];
    } else if (this.especialidad === 'cardiologia') {
      this.horasDisponibles = ['08:00', '11:00', '14:00'];
    }
  }

  confirmarCita() {
    if (this.especialidad && this.fechaCita && this.horaCita) {
      console.log(`Cita confirmada para ${this.especialidad} el ${this.fechaCita} a las ${this.horaCita}`);
      // Aquí iría la lógica para confirmar la cita
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }
}
