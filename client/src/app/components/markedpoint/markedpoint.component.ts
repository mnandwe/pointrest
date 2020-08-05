import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Markedpoint, PointModelEvent} from '../../models';

@Component({
  selector: 'app-markedpoint',
  templateUrl: './markedpoint.component.html',
  styleUrls: ['./markedpoint.component.scss']
})
export class MarkedpointComponent implements OnInit {
  @Output() pointChange = new EventEmitter<any>();
  @Output() itemSelected = new EventEmitter<any>();
  @Input() markedpoints: Markedpoint[];
  @Input() selectedPoint: string;
  constructor() { }

  ngOnInit(): void {
  }

  onUpdate($event: PointModelEvent): void {
    if ( $event.type === 'delete') {
      this.pointChange.emit($event);
    }
    else if ( $event.type === 'update') {
      this.pointChange.emit($event);
    }
  }

  itemClicked($id: Markedpoint): void {
    this.itemSelected.emit($id);
  }

}
