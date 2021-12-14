import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { testAptitud } from '../Models/testAptitud';
import { environment } from 'src/environments/environment';
import { testIng } from '../Models/testIng';

@Injectable({
  providedIn: 'root',
})
export class TestAptitudService {
  constructor(private httpClient: HttpClient) {}
  gettest() {
    return this.httpClient.get<Array<testAptitud>>(
      environment.baseUrl + '/testAptitud'
    );
  
  }
  getTestIng(){
    return this.httpClient.get<Array<testIng>>(
      environment.baseUrl + '/preguntasCarrera'
    );
  }

  // test: testAptitud[] = [
  //   {
  //     pregunta: 'Me gusta todo aquello exacto que se puede tocar.',
  //     carrera: 'Textil',
  //     opciones: [
  //       {
  //         opcion: 'Sí, todo lo tangible.',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No es importante para mí',
  //         puntos: 10,
  //         id_opcion: 2,
  //       },
  //       {
  //         opcion: 'No, no es necesario para mí',
  //         puntos: 5,
  //         id_opcion: 3,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Me gusta trabajar con calculadoras y entretenerme con juegos electrónicos',
  //     carrera: 'Electricidad',
  //     opciones: [
  //       {
  //         opcion: 'Si ',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Me gusta involucrarme con la evaluación de forma eficiente la fabricación de productos y prestación de servicios.',
  //     carrera: 'Industrial',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Me interesa la confección de tejidos .',
  //     carrera: 'Textil',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },

  //   {
  //     pregunta: 'Me gusta trabajar con datos contrastados y comprobados.',
  //     carrera: 'Software',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Consideras que te resulta atractivo revisar cronogramas de producción.',
  //     carrera: 'Industrial',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Aprendo mejor a través del uso de TICs',
  //     carrera: 'Software',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Creo que es importante realizar análisis y síntesis en el trabajo',
  //     carrera: 'Telecomunicaciones',
  //     opciones: [
  //       {
  //         opcion: 'Sí, para mejorar la calidad del trabajo.',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No, creo que muy rara vez sea importante. ',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Creo que es muy importante dominar el cálculo mental.',
  //     carrera: 'Software',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Tengo interés y curiosidad por los dispositivos eléctricos y electrónicos',
  //     carrera: 'Electricidad',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Siento gran satisfacción cuando soy capaz de resolver los problemas.',
  //     carrera: 'Mecatrónica',
  //     opciones: [
  //       {
  //         opcion: 'Sí, es una gran satisfacción para mí.',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No, es uno de los objetivos que debo de conseguir.',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Las cifras deben de ser correctas y exactas.',
  //     carrera: 'Industrial',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Me gustaría encontrar un trabajo en el que pudiera ayudar a todas aquellas personas que lo necesitan.',
  //     carrera: 'Automotriz',
  //     opciones: [
  //       {
  //         opcion:
  //           'No, prefiero trabajos en los que no me relacione con otras personas.',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'Sí, me gustaría ayudar y enseñar a todos los que no saben.',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },

  //   {
  //     pregunta:
  //       'Me gustaría participar en algún proyecto o trabajo de investigación',
  //     carrera: 'Telecomunicaciones',
  //     opciones: [
  //       {
  //         opcion: 'Me encantaría.',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No tengo interés.',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Creo que existen un gran número de teorías que no son verdaderas.',
  //     carrera: 'Electricidad',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'El trabajo por encargo es muy eficiente.',
  //     carrera: 'Mecatrónica',
  //     opciones: [
  //       {
  //         opcion: 'Sí, puesto que se conocen las características previamente.',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'En realidad, en muchas ocasiones no es tan eficiente',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //       {
  //         opcion: 'No, no creo que sea eficiente por ser por encargo.',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Me cuesta hacer dibujos de figuras para que se vean como en tres dimensiones.',
  //     carrera: 'Industrial',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Me gusta realizar construcciones tridimensionales con piezas (como Lego, puzles 3D…)',
  //     carrera: 'Automotriz',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Puedo hacer cálculos matemáticos mentalmente con bastante rapidez.',
  //     carrera: 'Telecomunicaciones',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },

  //   {
  //     pregunta:
  //       'Creo que la matemática sirve para solucionar problemas teóricos y prácticos ',
  //     carrera: 'Software',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },

  //   {
  //     pregunta:
  //       'Me relaciono de mejor manera a través de las redes sociales o plataformas en línea. ',
  //     carrera: 'Software',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Tengo información sobre el procesamiento de fibras, hilados, tejidos y no tejidos.',
  //     carrera: 'Textil',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },

  //   {
  //     pregunta: 'Se como funciona la electricidad ',
  //     carrera: 'Electricidad',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Disfruto solucionando problemas matemáticos.',
  //     carrera: 'Mecatronica',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Me resulta fácil hacer que los demás me escuchen y sigan mis planes, soy un poco líder.',
  //     carrera: 'Industrial',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Siento interés por diagnosticar, reparar o reemplazar partes averiadas de cualquier vehículo. ',
  //     carrera: 'Automotriz',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Soy detallista con el tipo de ropa que utilizo ',
  //     carrera: 'Textil',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Me gusta trabajar con calculadoras y entretenerme con juegos electrónicos.',
  //     carrera: 'Electricidad',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Me fijo en las piezas de ropa y telas que usan los demás ',
  //     carrera: 'Textil',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Me gusta que todo funcione con precisión ',
  //     carrera: 'Mecatrónica',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Suelo hacer muchas preguntas sobre el funcionamiento de las cosas.',
  //     carrera: 'Mecatrónica',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Consideras que te resulta atractivo revisar cronogramas de producción.',
  //     carrera: 'Industrial',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Me gustaría crear algo nuevo ',
  //     carrera: 'Telecomunicaciones',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta:
  //       'Me gusta involucrarme con la evaluación de forma eficiente la fabricación de productos y prestación de servicios.',
  //     carrera: 'Software',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  //   {
  //     pregunta: 'Creo que la tecnología ayuda a resolver problemas',
  //     carrera: 'Telecomunicaciones',
  //     opciones: [
  //       {
  //         opcion: 'Si',
  //         puntos: 20,
  //         id_opcion: 1,
  //       },
  //       {
  //         opcion: 'No',
  //         puntos: 5,
  //         id_opcion: 2,
  //       },
  //     ],
  //   },
  // ];
  getTest() {
    // return this.test;
  }
}
