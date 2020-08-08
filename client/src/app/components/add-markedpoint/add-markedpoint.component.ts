import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { PointModelEvent, Markedpoint, GeoField, AddPointRequest } from 'src/app/models';
import { MarkedpointService } from 'src/app/services/markedpoint.service';


@Component({
  selector: 'app-add-markedpoint',
  templateUrl: './add-markedpoint.component.html',
  styleUrls: ['./add-markedpoint.component.scss']
})
export class AddMarkedpointComponent implements OnInit, OnChanges {
  @Output() pointAdded = new EventEmitter<PointModelEvent>();
  @Input() coordinates: Coordinate;

  pointName = '';
  point: AddPointRequest;
  constructor(private markedpointService: MarkedpointService) {
    this.point = {
      name: '',
      location: null,
    };
  }

  ngOnInit(): void {
  }

  savePoint(): void {
    this.markedpointService.addPoint(this.point).subscribe((added: Markedpoint) => {
      this.pointAdded.emit({type: 'create', point: added});
      this.point = {
        name: '',
        location: null,
      };
    });
  }

  cancel(): void {
    this.pointName = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.coordinates) {
    this.point.location = {type: 'Point', coordinates: changes.coordinates.currentValue};
  }
  }
}
