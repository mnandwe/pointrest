import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { DEFAULT_CENTER } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  center: Coordinate;
  constructor() { 
    this.center = DEFAULT_CENTER;
  }

  setCenter(coordinates: Coordinate): void {
    localStorage.setItem('center', JSON.stringify(coordinates));
  }
  getCenter(): Coordinate {
    /** TODO:
     * this.center = JSON.parse(localStorage.getItem('center'));
     * if(!this.center) {
     *   this.center = DEFAULT_CENTER;
     * } 
     */
    return this.center;
  }
}
