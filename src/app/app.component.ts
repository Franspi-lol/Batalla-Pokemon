import { Injectable, Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AudioService } from './services/audio-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Poket-Fighter';
  audio = new Audio('./assets/menutheme.mp3');
  audioCombate = new Audio('./assets/battleTheme.mp3');
  audioLobby = new Audio('./assets/pokemonCenter.mp3');
  audioGym = new Audio('./assets/gymTheme.mp3');
  audioVictory = new Audio('./assets/Victory.mp3');

  constructor(private router: Router, private audioService: AudioService) {
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.autoplay = true;
    this.audio.muted = true;
    this.audio.addEventListener('canplaythrough', () => {
      console.log('Audio has finished loading and can be played.');
      this.audio.muted = false; // Unmute the audio
      /* this.audio.play(); // Start playing */
    });
  
    
  
    this.audioCombate.loop = true;
    this.audioLobby.loop = true;
    
    this.audioGym.loop = true;
    this.audioVictory.loop = true;
    this.audio.volume = 0.5; 
    this.audioCombate.volume = 0.5;
    this.audioLobby.volume = 0.5;
    this.audioGym.volume = 0.5;
    this.audioVictory.volume = 0.5;
    /* this.audioGym.autoplay = true;
    this.audioVictory.autoplay = true;
    this.audioLobby.autoplay = true;
    this.audioCombate.autoplay = true; */
    

    this.audio.addEventListener('canplaythrough', () => {
      this.audio.muted = false;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Pause all audio files
          this.audio.pause();
          this.audioCombate.pause();
          this.audioLobby.pause();
          this.audioGym.pause();
          this.audioVictory.pause();
      
          // Reset the current time for all audio files
          this.audio.currentTime = 0;
          this.audioCombate.currentTime = 0;
          this.audioLobby.currentTime = 0;
          this.audioGym.currentTime = 0;
          this.audioVictory.currentTime = 0;
      
          // Play the appropriate audio file based on the current route
          if (event.url === '/home' || event.url === '/login' || event.url === '/registrarse') {
            this.audio.play();
          } else if (event.url === '/pelea') {
            this.audioCombate.play();
          } else if (event.url.startsWith('/page-menu')) {
            this.audioLobby.play();
          } else if (event.url === '/gym') {
            this.audioGym.play();
          } else if (event.url === '/victory') {
            this.audioVictory.play();
          }
        }
      });
    });
  }
}
