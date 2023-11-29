import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/interface-usuario';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  constructor(
    private router:Router,
    
  ){}

  ngOnInit(): void {
       
  }
  
    
  
  /* jugar(){
    this.router.navigate(["ingresar-jugadores"]);      
  } */

  historial(){
    this.router.navigate(["historial"]);      
  }
  pokedex(){
    this.router.navigate(["pokedex"]);      
  }
  
  playAudio(){
    let audioLobby = new Audio('./assets/pokemonCenter.mp3');
    audioLobby.play();
  }

}
