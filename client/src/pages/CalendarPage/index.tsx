import React, { useState, Children } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "moment/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-business-days";
import ModalEditEvent from "./components/ModalEditEvent";
moment.locale("ru");
moment.updateLocale("ru", {
    workingWeekdays: [1, 2, 3, 4, 5],
});

const localizer = momentLocalizer(moment);
type myEvent = {
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
};
export default function MCalendar(): React.ReactElement {
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
    const [editingElement, setEditingElement] = useState<myEvent | undefined>(undefined);
    const a = "2020-12-20 09:30:26";
    const b = "2020-12-20 12:30:26";
    const events = [
        { title: "Ben Loop", allDay: false, start: moment().toDate(), end: moment().add(1, "hour").toDate() },
        { title: "Ben one", allDay: false, start: moment(a).toDate(), end: moment(b).toDate() },
    ];
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
    function eventWrapper(props: any) {
        return <div onClick={() => handlerEvent(props)}>{props.children}</div>;
    }

    return (
        <div>
            {" "}
            <Calendar
                localizer={localizer}
                events={events}
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
            />
            {editIsOpen ? (
                <ModalEditEvent
                    modalIsOpen={editIsOpen}
                    closeModal={() => setEditIsOpen(false)}
                    editingElement={editingElement}
                />
            ) : (
                ""
            )}
        </div>
    );
}
