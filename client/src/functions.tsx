export const formatDateToSave = (date: string) => {
    const obj = new Date(date);

    const dateToSave = [obj.getMonth() + 1, obj.getDate(), obj.getFullYear()].join(".");
    return dateToSave;
};

export const formatDateToInput = (currentDate: string) => {
    const date: Date = new Date(currentDate);

    let dd: number | string = date.getDate();
    if (dd < 10) dd = "0" + dd;

    let mm: number | string = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    const yy: number | string = date.getFullYear();

    return yy + "-" + mm + "-" + dd;
};
