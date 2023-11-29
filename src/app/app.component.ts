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
  audio = new Audio('assets/MenuTheme.mp3');
  audioCombate = new Audio('assets/battleTheme.mp3');
  audioLobby = new Audio('assets/pokemonCenter.mp3');
  audioGym = new Audio('assets/gymTheme.mp3');
  audioVictory = new Audio('assets/Victory.mp3');

  constructor(private router: Router, private audioService: AudioService) {
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.autoplay = true;
    this.audio.muted = true;
    this.audio.addEventListener('canplaythrough', () => {
      console.log('Audio has finished loading and can be played.');
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

    this.audio.addEventListener('canplaythrough', () => {
      this.audio.muted = false;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (
            event.url === '/' ||
            event.url === '/home' ||
            event.url === '' ||
            event.url === '/login' ||
            event.url === '/registrarse'
          ) {
            setTimeout(() => {
              this.audio.play();
              console.log('music playing');
            }, 50);
          } else {
            this.audio.pause();
            this.audio.currentTime = 0;
          }
          if (event.url === '/pelea') {
            this.audioCombate.play();
          } else {
            this.audioCombate.pause();
            this.audioCombate.currentTime = 0;
          }
          if (event.url.startsWith('/page-menu')) {
            this.audioLobby.play();
          } else {
            this.audioLobby.pause();
            this.audioLobby.currentTime = 0;
          }
          if (event.url === '/eleccion') {
            this.audioGym.play();
          } else {
            this.audioGym.pause();
            this.audioGym.currentTime = 0;
          }
          if (event.url === '/victoria') {
            this.audioVictory.play();
          } else {
            this.audioVictory.pause();
            this.audioVictory.currentTime = 0;
          }
        }
      });
    });
  }
}
