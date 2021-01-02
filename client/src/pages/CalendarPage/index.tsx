import React, { useState, Children, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment-business-days";
import "moment/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";

import ModalEditEvent from "./components/ModalEditEvent";
import ModalAddEvent from "./components/ModalAddEvent";
import { selectEventsList } from "../../ducks/calendar/selector";
import { myNewEvent } from "../../ducks/calendar/contracts/types";
import { IEvent } from "../../ducks/calendar/contracts/state";
import { selectColorsList } from "../../ducks/colors/selector";
import {
    selectEventIsAdding,
    selectEventsIsFetching,
    selectCalendarMessageSuccess,
    selectCalendarMessageError,
    selectEventIsDeleting,
    selectEventIsEditing,
} from "../../ducks/calendar/selector";
import Message from "../../components/Message";
import { runCalendarPageFetch } from "../../ducks/calendar/actionCreators/fetchCalendarPage";
import { CalendarHeader } from "./components/CalendarHeader";
import Spiner from "../../components/Spiner";
moment.locale("ru");
moment.updateLocale("ru", {
    workingWeekdays: [1, 2, 3, 4, 5],
    // workinghours: {
    //     0: null,
    //     1: ["09:30:00", "17:00:00"],
    //     2: ["09:30:00", "17:00:00"],
    //     3: ["09:30:00", "13:00:00"],
    //     4: ["09:30:00", "12:00:00", "13:00:00", "17:00:00"],
    //     5: ["09:30:00", "17:00:00"],
    //     6: null,
    // },
});
const localizer = momentLocalizer(moment);

const defaultEvent = {
    _id: "1",
    title: "default",
    day: "12.01.2020",
    start: "00:00",
    end: "00:00",
    allDay: false,
    color: "red",
};

export default function MCalendar(): React.ReactElement {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(runCalendarPageFetch());
    }, [dispatch]);

    const events = useSelector(selectEventsList);
    const colors = useSelector(selectColorsList);
    const eventsIsFetching = useSelector(selectEventsIsFetching);
    const isAdding = useSelector(selectEventIsAdding);
    const messageSuccess = useSelector(selectCalendarMessageSuccess);
    const messageError = useSelector(selectCalendarMessageError);
    const isDeleting = useSelector(selectEventIsDeleting);
    const isEditing = useSelector(selectEventIsEditing);
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
    const [addIsOpen, setAddIsOpen] = useState<boolean>(false);
    const [addingElement, setAddingElement] = useState<myNewEvent | undefined>(undefined);
    const [editingElement, setEditingElement] = useState<IEvent>(defaultEvent);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ColoredDateCellWrapper = ({ children, value }: any) =>
        React.cloneElement(Children.only(children), {
            style: {
                ...children.style,
                backgroundColor: moment(value).isBusinessDay() ? "lightgreen" : "#ffcccb",
            },
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlerEvent = (props: any) => {
        setEditIsOpen(true);
        setEditingElement(props.event);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function eventWrapper(props: any) {
        return <div onClick={() => handlerEvent(props)}>{props.children}</div>;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function newEvent(props: any) {
        const start = moment(props.start).format("HH:00");
        let end = moment(props.end).format("HH:00");
        if (start === end) {
            end = moment(props.end).add(1, "hour").format("HH:00");
        }
        const day = moment(props.start).format("YYYY-MM-DD");
        setAddingElement({ day, start, end });
        setAddIsOpen(true);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function eventStyleGetter(event: any) {
        const style = {
            backgroundColor: event.color,
            borderRadius: "10px",
            opacity: 0.8,
            color: "black",
            border: "1px solid white",
            display: "block",
            fontSize: "1rem",
        };
        return {
            style: style,
        };
    }

    return (
        <>
            {messageSuccess && <Message isOpen status={"success"} message={messageSuccess} />}{" "}
            {messageError && <Message isOpen status={"error"} message={messageError} />}
            <div className="clients">
                <CalendarHeader />

                {eventsIsFetching ? (
                    <Spiner />
                ) : (
                    <Calendar
                        onSelectSlot={newEvent}
                        localizer={localizer}
                        events={events}
                        messages={{
                            month: "Месяц",
                            day: "День",
                            week: "Неделя",
                            today: "Сегодня",
                            previous: "Назад",
                            next: "Вперёд",
                        }}
                        eventPropGetter={eventStyleGetter}
                        views={["month", "week", "day"]}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        step={15}
                        defaultView="day"
                        min={new Date(2020, 0, 1, 7, 0)}
                        max={new Date(2020, 0, 1, 20, 0)}
                        components={{
                            dateCellWrapper: ColoredDateCellWrapper,
                            eventWrapper: eventWrapper,
                        }}
                        selectable
                    />
                )}
                {addIsOpen ? (
                    <ModalAddEvent
                        modalIsOpen={addIsOpen}
                        closeModal={() => setAddIsOpen(false)}
                        addingElement={addingElement}
                        colors={colors}
                        isAdding={isAdding}
                    />
                ) : (
                    ""
                )}
                {editIsOpen ? (
                    <ModalEditEvent
                        modalIsOpen={editIsOpen}
                        closeModal={() => setEditIsOpen(false)}
                        editingElement={editingElement}
                        isDeleting={isDeleting}
                        isEditing={isEditing}
                        colors={colors}
                    />
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
