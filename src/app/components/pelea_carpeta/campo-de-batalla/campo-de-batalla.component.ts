import { Component, OnInit } from '@angular/core';
import { jugador } from 'src/app/Clases/jugador.model';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campo-de-batalla',
  templateUrl: './campo-de-batalla.component.html',
  styleUrls: ['./campo-de-batalla.component.css']
})
export class CampoDeBatallaComponent implements OnInit{

  j1:jugador;
  j2:jugador;
  pokemonPeleandoj1:number;
  pokemonPeleandoj2:number;
  porcentajeVidaJ1:number; 
  porcentajeVidaJ2:number;

  images = [
    'url(./assets/img/fondoCombate3.png)',
    'url(./assets/img/fondoCombate1.png)',
    'url(./assets/img/fondoCombate2.png)',
    'url(./assets/img/fondoCombate4.png)'
    
    
    
  ];
  randomImage = this.images[Math.floor(Math.random() * this.images.length)];

  constructor(private datJugadores:UsuariosService, private router:Router){
    this.j1 = datJugadores.jugador1;
    this.j2 = datJugadores.jugador2;
  }
  ngOnInit(): void {
    this.datJugadores.pokemonPeleandoj1$.subscribe(data => this.pokemonPeleandoj1 = data);
    this.datJugadores.pokemonPeleandoj2$.subscribe(data => this.pokemonPeleandoj2 = data);
    this.datJugadores.porcentajeVidaJ1$.subscribe(data => this.porcentajeVidaJ1 = data);
    this.datJugadores.porcentajeVidaJ2$.subscribe(data => this.porcentajeVidaJ2 = data);

    
    
    if(this.j1.pokemons.length < 3 ||this.j2.pokemons.length < 3)
    {
      this.router.navigate(['/eleccion']);
    }
  }


  audioCries = [
    './assets/BattleCries/cry1.mp3',
    './assets/BattleCries/cry2.mp3',
    './assets/BattleCries/cry3.mp3',
    './assets/BattleCries/cry4.mp3',
    './assets/BattleCries/cry5.mp3'
  ]

  playSoundPoke()//clickea un pokemon en el combate
  {
    let audio = new Audio();
    let randomAudio = this.audioCries[Math.floor(Math.random() * this.audioCries.length)];
    audio.src = randomAudio;
    audio.load();
    audio.play();
  }
  
}
