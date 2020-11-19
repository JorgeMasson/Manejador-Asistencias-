import { Component, OnInit, OnDestroy } from '@angular/core';
import { CursosService } from '../services/curso.service';
import { Subject } from 'rxjs';
import { Curso } from '../models/curso';

@Component({
  selector: 'app-cursostable',
  templateUrl: './cursostable.component.html',
  styleUrls: ['./cursostable.component.scss'],
  providers: [CursosService]
})
export class CursostableComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public cursos: Curso[];

  constructor(
    private _cursosService: CursosService
  ) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.getCursos();
  }

  getCursos() {
    this._cursosService.getAllCursos().subscribe(
      response => {
        if (response.cursos) {
          console.log(response);
          this.cursos = response.cursos;
        }

        this.dtTrigger.next();
      },
      err => {
        console.log(<any>err);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
