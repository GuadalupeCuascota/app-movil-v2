import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-test-aptitud',
  templateUrl: './home-test-aptitud.page.html',
  styleUrls: ['./home-test-aptitud.page.scss'],
})
export class HomeTestAptitudPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
  regresar(){
    this.router.navigate(['menu-opciones-se/menu-principal/home-secundaria']);
  }
  testVocacional(){
    this.router.navigate(['/test-aptitud']);
  }
}
