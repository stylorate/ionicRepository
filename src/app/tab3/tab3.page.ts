import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  ejercicios: any[] = [];

  constructor(private http: HttpClient, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    const datosGuardados = await this.storage.get('ejercicios');

    if (datosGuardados) {
      this.ejercicios = datosGuardados;
      console.log('Datos cargados del storage');
    } else {
      this.cargarEjercicios();
    }
  }

  cargarEjercicios() {
    const url = 'https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises';
    const headers = new HttpHeaders({
      'x-rapidapi-key': '361b123075msh74943d4e9748c13p1053c6jsn7c3d22d2946a',
      'x-rapidapi-host': 'exercise-db-fitness-workout-gym.p.rapidapi.com'
    });

    this.http.get<any>(url, { headers }).subscribe(
      data => {
        const idsArray = data.excercises_ids ?? [];
        console.log('Datos API: ', data);
        this.ejercicios = idsArray;

        this.storage.set('ejercicios', idsArray).then(() => console.log('Datos guardados en el storage'));
      },
      error => {
        console.error('Error al cargar ejercicios', error);
      }
    );
  }

}
