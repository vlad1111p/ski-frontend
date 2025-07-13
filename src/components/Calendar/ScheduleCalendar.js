import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function ScheduleCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/api/calendar", {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((res) => res.json())
            .then((data) =>
                setEvents(
                    data.map((event) => ({
                        id: event.id,
                        title: event.title,
                        start: event.startTime,
                        end: event.endTime,
                    }))
                )
            );
    }, []);

    return (
        <div className="bg-white rounded-xl shadow p-4 mt-8">
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto"
            />
        </div>
    );
}
