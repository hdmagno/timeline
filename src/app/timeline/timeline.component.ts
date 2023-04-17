import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  @Input() events: any[] = [];

  timeLinePoint(event: any) {
    return event?.status === 'A' ? 'active' : event?.status === 'P' ? 'previous' : '' as string;
  }

  timeLineTrack(event: any) {
    return event?.status === 'A' ? '' : event?.status === 'P' ? 'previous' : '' as string;
  }
}
