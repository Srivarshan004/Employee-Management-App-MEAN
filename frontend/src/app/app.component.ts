import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'frontend';
  showMenu = false;
  userName:any;
  navbarfixed:boolean = false;

  @HostListener('window:scroll', ['$event']) onScroll(){
    if(window.screenY > 100){
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }

  constructor(private router:Router){ }

  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl === '/login' || currentUrl === '/register' || currentUrl === '/') {
      this.showMenu = false;
    } else {
      this.showMenu = true; 
      this.userName = localStorage.getItem('username');
    }
  }
  
}
