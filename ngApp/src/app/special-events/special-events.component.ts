import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { IEvent } from '../interface/index';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css'],
})
export class SpecialEventsComponent implements OnInit {
  public specialEvents: IEvent[] = [];

  constructor(private _eventService: EventService) {}

  ngOnInit(): void {
    this._eventService.getSpecialEvents().subscribe(
      (res) => (this.specialEvents = res),
      (err) => console.log(err)
    );
  }
}
