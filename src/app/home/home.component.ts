import { Component, OnInit } from '@angular/core';
import {Films} from '../../models/Films';
import {FilmService} from '../../services/film.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  films: Films [] = [];
  partFilms: Films[] = [];
  public page = 1;
  public collectionSize: number;
  public maxSize = 2;
  title = 'slider';
  el = document.getElementsByClassName('slid');

  count = 0;
  images = ['assets\\slide1.jpg', 'assets\\slide2.jpg', 'assets\\slide3.jpg', 'assets\\slide4.jpg', 'assets\\slide5.jpg'];
  image = this.images[this.count];

  constructor(private filmsS: FilmService) {
  }

  next() {
    this.count++;
    if (this.count >= this.images.length) {
      this.count = 0;
    }
    this.image = this.images[this.count];
  }

  back() {
    this.count--;
    if (this.count <= 0) {
      this.count = this.images.length - 1;
    }
    this.image = this.images[this.count];
  }

  ngOnInit(): void {
    setInterval(() => this.next(), 5000);
    this.filmsS.getFilms().subscribe((res) => {
      this.films = res;
      this.collectionSize = this.films.length;
      this.partFilms = this.films.slice(0, this.maxSize);
    });
  }
  onPageChange(p: number) {
    if ( p === 1) {
      this.partFilms = this.films.slice(0, this.maxSize);
    } else {
      const first = Number(this.maxSize) * Number(p) - Number(this.maxSize);
      const last = Number(this.maxSize) * Number(p);
      this.partFilms = this.films.slice(first, last );
    }

  }

}
