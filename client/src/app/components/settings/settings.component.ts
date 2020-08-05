import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { LocalizedString } from '@angular/compiler/src/output/output_ast';
import { DEFAULT_CENTER } from 'src/app/constants';
interface LatLng {
  lat: number;
  lng: number;
}


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  @Output() closeSettings = new EventEmitter<any>();
  center: LatLng;

  constructor(private settingsService: SettingsService) { 
    this.center = {lng: DEFAULT_CENTER[0], lat: DEFAULT_CENTER[1]};
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    const coord = this.settingsService.getCenter();
    this.center = {lng: coord[0], lat: coord[1]};
  }

  saveSettings(): void {
    this.settingsService.setCenter([this.center.lng, this.center.lat]);
  }

  close(): void{
    this.closeSettings.emit();
  }

}
