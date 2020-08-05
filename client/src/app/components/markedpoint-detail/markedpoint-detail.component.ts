import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Markedpoint, PointModelEvent } from 'src/app/models';
import { MarkedpointService } from 'src/app/services/markedpoint.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-markedpoint-detail',
  templateUrl: './markedpoint-detail.component.html',
  styleUrls: ['./markedpoint-detail.component.scss']
})
export class MarkedpointDetailComponent implements OnInit {
  @Input() point: Markedpoint;
  @Input() selected: boolean;

  @Output() pointUpdate = new EventEmitter<PointModelEvent>();

  nameControl: FormControl = new FormControl('');
  editMode: boolean;
  editName: string;
  data: any;

  constructor(private markedpointService: MarkedpointService) { }

  ngOnInit(): void {
    this.nameControl.setValue(this.point.name);
    this.editName = this.point.name;
  }

  editPoint(): void {
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
  }
  saveEdit(): void {
    const name = this.editName;
    if (!name){
      return;
    }
    if (name !== '' && name !== this.point.name) {
      const updatedPoint: Markedpoint = {
        id: this.point.id,
        location: this.point.location,
        name,
      };
      this.updatePoint(updatedPoint);
    }else {
      this.editMode = false;
    }
  }

  deletePoint(): void {
    this.markedpointService.deletePoint(this.point.id).subscribe((point) => {
      this.pointUpdate.emit({type: 'delete', point});
    }, error => {
      // TODO: make the errors better
      console.log(JSON.stringify(error));
    });
  }

  updatePoint(point: Markedpoint): void {
    this.markedpointService.updatePoint(point).subscribe((resp) => {
      this.point = resp;
      this.pointUpdate.emit({type: 'update'});
      this.editMode = false;
    }, error => {
      // TODO: make the errors better
      console.log(JSON.stringify(error));
    });
  }
}
