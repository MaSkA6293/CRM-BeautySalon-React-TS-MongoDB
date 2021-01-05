import moment from "moment-business-days";
import * as Yup from "yup";

export const validationEventSchema = Yup.object().shape({
    title: Yup.string().required("Обязательное поле"),
    start: Yup.string()
        .test("not empty", "Введите время начала события", function (value) {
            return !!value;
        })
        .test("start_time_test", "Некорректное время начала события", function (value) {
            const { end } = this.parent;
            return isSameOrBefore(value, end);
        }),
    end: Yup.string(),
    client: Yup.string(),
});

const isSameOrBefore = (startTime: any, endTime: any) => {
    return moment(startTime, "HH:mm").isSameOrBefore(moment(endTime, "HH:mm"));
};
