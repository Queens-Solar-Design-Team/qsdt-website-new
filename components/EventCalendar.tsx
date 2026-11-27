import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";

import themePlugin from "@fullcalendar/react/themes/pulse";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/pulse/theme.css";
import "@fullcalendar/react/themes/pulse/palettes/green.css";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  description: string;
  location: string;
}

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Event 1",
    start: "2026-11-30T14:00:00",
    description: "Sample Event with time",
    location: "Location",
  },
  {
    id: "2",
    title: "Event 2",
    start: "2026-11-29",
    description: "Sample Event all day",
    location: "Location",
  },
];

export default function EventCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  const handleEventClick = (info: { event: { id: string } }) => {
    const event = events.find((e) => e.id === info.event.id);

    if (event) {
      setSelectedEvent(event);
    }
  };

  return (
    <div>
        <h2 className="text-2xl font-bold text-solar-dark-green mb-4">   </h2>
        <h2 className="text-2xl font-bold text-solar-dark-green mb-4"> Event Calendar </h2>
      <FullCalendar
        plugins={[themePlugin, dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        events={events}
        eventClick={handleEventClick}
        height="auto"
        aspectRatio={1.8}
      />

      {selectedEvent && (
        <div className="popup-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-popup" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedEvent(null)}>×</button>

            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            <p>Location: {selectedEvent.location}</p>
            <p>Date: {selectedEvent.start}</p>
          </div>
        </div>
      )}
    </div>
  );
}
