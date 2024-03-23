import {ChangeDetectorRef, Component, Input, signal} from '@angular/core';
import {AsyncPipe, NgClass} from "@angular/common";
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'all-dates-modal',
  templateUrl: './all-dates.component.html',
  imports: [
    NgClass,
    FullCalendarModule,
    AsyncPipe
  ],
  standalone: true
})
export class AllDatesComponent {
  @Input() specialistId!: string;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [
      dayGridPlugin,
      interactionPlugin,
      timeGridPlugin,
      listPlugin
    ],
    //@ts-ignore
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    editable: true,
    selectable: true,
    locale: 'ru',
    firstDay: 1,
    buttonText: {
      today: 'Сегодня',
      month: 'Месяц',
      week: 'Неделя',
      day: 'День',
      list: 'Список'
    }
  };

  //@ts-ignore
  eventsPromise: Promise<EventInput[]>;

  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = 'my event title';
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {

  }
}

let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}
