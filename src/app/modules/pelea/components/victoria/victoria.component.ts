import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jugador } from 'src/app/Clases/jugador.model';
import { pokemon } from 'src/app/Clases/pokemon.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosDbService } from '../../../../services/usuarios-db.service';

@Component({
  selector: 'app-victoria',
  templateUrl: './victoria.component.html',
  styleUrls: ['./victoria.component.css']
})
export class VictoriaComponent implements OnInit {

  j1: jugador;
  j2: jugador;
  victoriaPara: number = 0;
  listaPokesGanadores: pokemon[] = [];

  constructor(private datUsuarios: UsuariosService, private router: Router, private usuarioDBService: UsuariosDbService) {
    if (-1 == this.usuarioDBService.obtenerId()) {
      this.router.navigate([""]);
    }

    this.j1 = datUsuarios.jugador1;
    this.j2 = datUsuarios.jugador2;
  }

  ngOnInit(): void {

      
    if(!this.j1.pokemons.length ||!this.j2.pokemons.length)
    {
      this.router.navigate(['/eleccion']);
    }

    this.comprobarGanador();

    this.datUsuarios.cambiarPokej1(0);
    this.datUsuarios.cambiarPokej2(0);

    if (this.victoriaPara == 1) {
      this.listaPokesGanadores = this.j1.pokemons;
    }
    else {
      this.listaPokesGanadores = this.j2.pokemons;
    }

  }

  comprobarGanador() {
    let muertosj1: number = 0;
    let muertosj2: number = 0;

    this.j1.pokemons.forEach(poke => {
      if (poke.vidaActual <= 0) {
        muertosj1++;
      }
    })

    this.j2.pokemons.forEach(poke => {
      if (poke.vidaActual <= 0) {
        muertosj2++;
      }
    })

    if (muertosj1 == 3) {
      this.victoriaPara = 2;
    }

    if (muertosj2 == 3) {
      this.victoriaPara = 1;
    }

    if(muertosj1!=3 && muertosj2 !=3)
    {
      this.router.navigate(['/pelea']);
    }
  }


  mismaPelea() {
    this.j1.pokemons.forEach(poke => {
      poke.vidaActual = poke.vida;
      poke.bajo_efecto = [];
    })

    this.j2.pokemons.forEach(poke => {
      poke.vidaActual = poke.vida;
      poke.bajo_efecto = [];
    })

    this.router.navigate(['/pelea']);
  }

  otraPelea() {
    this.router.navigate(['/eleccion']);
  }

  volverAlMenu() {
    this.router.navigate(['/page-menu/ingresar-jugadores']);
  }

}
