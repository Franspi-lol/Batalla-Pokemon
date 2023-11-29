import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { usuario } from 'src/app/interfaces/interface-usuario';
import { partida } from 'src/app/interfaces/interface-partida';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuariosDbService implements OnInit{


  url: string = "https://cors-anywhere.herokuapp.com/https://my-json-server.typicode.com/franspi-lol/demoPOkeBack";


  
  listado: usuario[]|undefined=[];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.listado=[];
  }

  ngOnInit(): void {
    
  }

  private id= -1;


  setearId(id:number){
    this.id= id;
  }
  obtenerId(){
    return this.id;
  }

  usuario:usuario | unknown;

  checkAutentication():Observable<boolean>{
    const id = localStorage.getItem('id');
    if(!id){
      return of(false)
    }
    return this.http.get<usuario>(`${this.url}/${id}`)
      .pipe(
        tap(u=> this.usuario = u),
        map(u=>!!u),
        catchError(err=> of(false))
      )
  }



  guardarPartida(partida:partida){//recibe una nueva partida con los datos -1-
    
    if(this.id > -1){
      this.getUsuarioHttpId(this.id)//obtiene el usuarioActivo
        .subscribe({
         next:(us)=>{
      
          if(us){
            us.historial.push(partida);//agrega la partida al usuarioActivo
            //console.log(us);
            this.editarUsuario(us);//edita y guarda en el server el usuarioActivo
          }
         },
         error:(er)=>{
          console.log(er);
         }
      })
    }
  }


  resetearHistorial(){
    if(this.id > -1){
      this.getUsuarioHttpId(this.id)
        .subscribe({
          next:(us)=>{
            if(us){
              us.historial.length=0;
              console.log(us.historial);
              this.editarUsuario(us);
            }
          },
          error:(er)=>{
            console.log(er);
          }
        })
    }
  }

  getUsuarioHttpId(id:number):Observable<usuario>{//obtiene usuario por id -2-
    return this.http.get<usuario>(`${this.url}/${id}`);
  }

  editarUsuario(us:usuario){ //guarda el usuario con la nueva partida cargada -3-
    this.putUsuarioHttp(us)
      .subscribe(
        {
          next:() => {

        },
        error: (er)=>{
          console.log(er);
        }
      });
  }

  putUsuarioHttp(usuario:usuario):Observable<usuario>{//Guardar nuevo historial -4-
    return this.http.put<usuario>(
      `${this.url}/${usuario.id}`,
      usuario,
      {headers:{"Content-type": "application/json"}}
    )
  }

  getUsuariosHttp():Observable<usuario[]>{
    return this.http.get<usuario[]>(this.url)
      .pipe(//Captura los datos y los puede modificar de varias maneras utilizando map o filter
        
        catchError((error: any)=>{
          console.error("Ha ocurrido un error en la solicitud Http:",error);
          return throwError(()=>error);
        })
      )
  }

  async getHistorial():Promise<partida[]>{//Obtiene el historial del usuario en sesion
    var vacio:partida[]=[];
    var histo:partida[]=[];
    var us=await this.getUsuarioId(this.id);
    if(us != undefined){
      histo= us.historial;
    }else{
      histo= vacio;
    }
    return histo;
  }

  async getUsuarioId(id :number):Promise <usuario|undefined>{ //obtiene el usuario pedido por id
    try {
      const resultado= await fetch(
        `${this.url}/${id}`,{
          method:"GET"
        }
      );
      const datos= resultado.json();
      return datos;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }
  async getUsuarios(): Promise <usuario[] | undefined> {//segun el try/catch puede devolver undefined o el arreglo de usuarios
    try {
      const resultado= await fetch(
        this.url,{
          method:"GET"
        }
      );
      const datos= resultado.json();
      return datos;//devuelve un arreglo de usuarios

    } catch (error) {
      console.log(error);
    }
    return undefined;//devuelve undefined si hay un error
  }


  async postUsuario(usuario:usuario){
    try {
      
      await fetch(
        this.url,{
          method:'POST',
          body: JSON.stringify(usuario),
          headers: {'Content-type': 'application/json'}
        }
      );
      
    } catch (error) {
      console.log(error);
    }
  }

  postUsuarioHttp(usuario:usuario): Observable<usuario>{
    return this.http.post<usuario>(
      this.url,
      usuario,
      {headers:{"Content-type":"application/json"}}
    );
  }

  /*async deleteUsuario(id: number){
    try {
      await fetch(`${this.url}/${id}`,
        {method:"DELETE"}
        );
      window.location.href="index.html";

    } catch (error) {
      console.log(error);
    }
  }*/

  deleteUsuarioHttp(id:number | undefined){
    return this.http.delete(`${this.url}/${id}`);
  }



}
 