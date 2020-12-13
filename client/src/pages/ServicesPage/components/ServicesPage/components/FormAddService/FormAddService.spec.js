import { getTime } from "./index";

describe("FormAddService tests", () => {
    it("getTime test 03:20 ", () => {
        const testTime = "03:20";
        const result = getTime(testTime);
        const expectResult = [3, 20];
        expect(result).toEqual(expectResult);
    });
    it("getTime test 03:00 ", () => {
        const testTime = "03:00";
        const result = getTime(testTime);
        const expectResult = [3, 0];
        expect(result).toEqual(expectResult);
    });
    it("getTime test 00:20 ", () => {
        const testTime = "00:20";
        const result = getTime(testTime);
        const expectResult = [0, 20];
        expect(result).toEqual(expectResult);
    });
    it("getTime test 00:00 ", () => {
        const testTime = "00:00";
        const result = getTime(testTime);
        const expectResult = [0, 0];
        expect(result).toEqual(expectResult);
    });
});
