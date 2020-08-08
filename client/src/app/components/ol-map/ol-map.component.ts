import 'ol/ol.css';
import {Component, NgZone, AfterViewInit, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import {View, Feature, Map, MapBrowserEvent, Collection } from 'ol';
import {Coordinate} from 'ol/coordinate';
import { defaults as DefaultControls} from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
import {get as GetProjection} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import * as proj from 'ol/proj';

import {Markedpoint, GeoField} from '../../models';
import {MarkedpointService} from '../../services/markedpoint.service';
import {MarkerStyle, DEFAULT_CENTER} from '../../constants';
/**
 * TODO:
 * Tests
 * Potentially move some code to a service
 */

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss', '../../../../node_modules/ol/ol.css', ]
})
export class OlMapComponent implements  AfterViewInit, OnInit {
  @Output() addPoint = new EventEmitter<any>();
  @Output() mapReady = new EventEmitter<Map>();

  view: View;
  projection: Projection;
  center: Coordinate = DEFAULT_CENTER;
  Map: Map;

  markedpoints: Markedpoint[];
  features: Collection<Feature>;
  vectorSource: VectorSource;
  selectedFeature: Feature;
  editLayer: VectorLayer;
  vectorLayer: VectorLayer;
  selectedPoint: string;
  newPoint: Coordinate;


  constructor(private zone: NgZone, private cd: ChangeDetectorRef, private markedpointService: MarkedpointService) {
    try{
      this.center = JSON.parse(window.localStorage.getItem('center'));
      if (!this.center){
        this.center = DEFAULT_CENTER;
      }
    }catch (ex){
      // safari
    }
   }

  ngOnInit(): void {
    this.markedpoints = [];
    this.getPoints();
    this.features =  new Collection<Feature>();
    this.vectorSource = new VectorSource();
    this.editLayer = new VectorLayer();
    this.vectorLayer = new VectorLayer();
  }


  ngAfterViewInit(): void {
    if (! this.Map) {
      this.initMap();
    }
    setTimeout(() => this.mapReady.emit(this.Map));
  }

  reloadPoints($event): void{
    switch ($event.type){
      case 'delete':
        this.removePoint($event.point);
        this.markedpoints = this.markedpoints.filter((point) => point.id !== $event.point.id);
        break;
      case 'update':
        break;
      case 'create':
        this.getPoints();
        break;
      default:
        return;
    }
  }

  private getPoints(): void {
    this.markedpointService.getPoints().subscribe((points: Markedpoint[]) => {
      this.markedpoints = points;
      if (this.Map) {
        this.setVectorLayer();
      }

    }, (error: any) => { // TODO: Handle error better
      // console.log('Problem');
      console.log(JSON.parse(error));
    });
  }

  private removePoint(point: Markedpoint): void {
    const feature = this.vectorLayer.getSource().getFeatureById(point.id);
    this.vectorLayer.getSource().removeFeature(feature);
  }
  private setVectorLayer(): void {
    this.Map.removeLayer(this.vectorLayer);
    this.markedpoints.forEach((point) => {
      const feature = new Feature({
        geometry: new Point(proj.transform(point.location.coordinates, 'EPSG:4326', 'EPSG:3857')),
        labelPoint: new Point(proj.transform(point.location.coordinates, 'EPSG:4326', 'EPSG:3857')),
        name: point.name,
      });
      feature.setId(point.id);
      this.features.push(feature);
    });

    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: this.features
      }),
      style: MarkerStyle.UNSELECTED,
    });

    this.Map.addLayer(this.vectorLayer);

  }
  private initMap(): void{
    this.projection = GetProjection('EPSG:3857');
    this.view = new View({
      center: proj.transform(this.center, 'EPSG:4326', 'EPSG:3857'),
      zoom: 15,
      projection: this.projection,
    });


    this.Map = new Map({
      layers: [new TileLayer({
        source: new OSM({})
      }), this.vectorLayer, this.editLayer],
      target: 'map',
      view: this.view,
      controls: DefaultControls(),
    });

    this.Map.on('click', (event: MapBrowserEvent) =>  {
      // reset dots
      this.selectedPoint = '';
      this.vectorLayer.setStyle(MarkerStyle.UNSELECTED);

      const features = [];
      this.Map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
          features.push(feature);
        });
      if (features.length === 1) {
        this.handleFeatureClick(features[0], event);
        return;
      } else if (features.length > 1) {
        // cant tell what was clicked to skip
        return;
      }
      const coord = event.coordinate;
      this.addMapPoint(coord);
    });
    if (this.markedpoints.length > 0){
      this.setVectorLayer();
    }
  }

  // TODO Make constants instead of using a string
  public handleFeatureClick(feature: Feature, event: MapBrowserEvent): void {
    feature.setStyle(MarkerStyle.SELECTED);
    this.view.setCenter(proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:3857'));
    this.view.setZoom(17);
    this.selectedPoint = String(feature.getId());
  }

  private addMapPoint(coordinate: Coordinate): void {
    if (!this.editLayer.getSource()){
      this.editLayer.setSource(new VectorSource({
        features: [],
      }));
      this.editLayer.setStyle(MarkerStyle.UNSELECTED);
    }
    this.editLayer.getSource().clear();
    this.newPoint = proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
    this.editLayer.getSource().addFeature( new Feature({
              geometry: new Point(proj.transform(coordinate, 'EPSG:3857', 'EPSG:3857')),
          }));
  }
  clearSelection(): void {
    this.vectorLayer.setStyle(MarkerStyle.UNSELECTED);
    if (this.editLayer.getSource()){
      this.editLayer.getSource().clear();
    }
    if (this.selectedPoint) {
      const feat = this.vectorLayer.getSource().getFeatureById(this.selectedPoint);
      feat.setStyle(MarkerStyle.UNSELECTED);
      this.selectedPoint = '';
    }
  }

  onItemSelect($event: Markedpoint): void {
    this.clearSelection();
    if (!$event) {
      return;
    }
    const feature = this.vectorLayer.getSource().getFeatureById($event.id);
    feature.setStyle(MarkerStyle.SELECTED);

    this.view.setCenter(proj.transform($event.location.coordinates, 'EPSG:4326', 'EPSG:3857'));
    this.view.setZoom(17);
    this.selectedPoint = $event.id;
  }
}
