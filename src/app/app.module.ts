import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { EleccionEquiposComponent } from './components/eleccion_carpeta/eleccion-equipos//eleccion-equipos.component';
import { PokeApiService } from './services/poke-api.service';
import {MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/eleccion_carpeta/dialog/dialog.component';
import { EleccionComponent } from './pages/eleccion/eleccion.component';
import { EquiposComponent } from './components/eleccion_carpeta/equipos/equipos.component';
import { PeleaComponent } from './pages/pelea/pelea.component';
import { PokedexComponent } from './components/pokedex/pokedex.component'
import { CampoDeBatallaComponent } from './components/pelea_carpeta/campo-de-batalla/campo-de-batalla.component';
import { EleccionesPeleaComponent } from './components/pelea_carpeta/elecciones-pelea/elecciones-pelea.component';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/usuario_carpeta/login-form/login-form.component';
import { ListarUsuariosComponent } from './components/usuario_carpeta/listar-usuarios/listar-usuarios.component';
import { EditarUsuarioComponent } from './components/usuario_carpeta/editar-usuario/editar-usuario.component';
import { RegistrarseComponent } from './components/usuario_carpeta/registrarse/registrarse.component';
import { HomeInicialComponent } from './components/home-inicial/home-inicial.component';
import { IngresarJugadoresComponent } from './components/usuario_carpeta/ingresar-jugadores/ingresar-jugadores.component';

import { PageMenuComponent } from './pages/page-menu/page-menu.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HistorialComponent } from './components/historial/historial.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TooltipComponent } from './././components/tooltip/tooltip.component';

import { VictoriaComponent } from './components/pelea_carpeta/victoria/victoria.component';
import { authGuard } from './guards/auth.guard';



const appRoutes:Routes=[
  //{path:'',component:HomeInicialComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home',component:HomeInicialComponent},
  {path:'login',component:LoginFormComponent},
  {path:'registrarse',component:RegistrarseComponent },
  {path:'nav-bar',component:NavBarComponent/* ,canMatch:[authGuard] */},

  {path:'page-menu',component:PageMenuComponent/* ,canMatch:[authGuard] */,
    children:[
      {path:'pokedex',component:PokedexComponent/* ,canMatch:[authGuard] */},
      {path:'ingresar-jugadores',component:IngresarJugadoresComponent/* ,canMatch:[authGuard] */},
      {path:'historial',component:HistorialComponent/* ,canMatch:[authGuard] */}
    ]
  },
  {path:"eleccion",component:EleccionComponent/* ,canMatch:[authGuard] */},
  {path:'pelea',component:PeleaComponent/* ,canMatch:[authGuard] */},
  {path:"victoria",component:VictoriaComponent/* ,canMatch:[authGuard] */},
  {path:'**', redirectTo:'home', pathMatch:'full'},
  //{path:"editar-usuario",component:EditarUsuarioComponent}  
];

/*const appRoutes:Routes=[
  
];*/

@NgModule({
  declarations: [
    AppComponent,
    //MatTooltipModule,
    EleccionEquiposComponent,
    DialogComponent,
    EleccionComponent,
    EquiposComponent,
    PeleaComponent,
    PokedexComponent,
    CampoDeBatallaComponent,
    EleccionesPeleaComponent,

    LoginFormComponent,
    RegistrarseComponent,
    ListarUsuariosComponent,
    EditarUsuarioComponent,
    HomeInicialComponent,
    IngresarJugadoresComponent,
    PageMenuComponent,
    NavBarComponent,
    HistorialComponent,

    TooltipComponent,

    VictoriaComponent

  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes),
    MatTooltipModule
  ],
  providers: [PokeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
