export const getDates = (startDate, endDate) => {
    let dates = [],
        curDate = startDate,
        addDays = function (days) {
            let date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (curDate <= endDate) {
        const date = (curDate.getDate() > 9) ?
            curDate.getDate().toString() :
            '0' + curDate.getDate().toString();

        const month = (curDate.getMonth() > 8) ?
            (curDate.getMonth() + 1).toString() :
            '0' + (curDate.getMonth() + 1).toString();

        const year = curDate.getFullYear().toString();

        const str = date + '-' + month + '-' + year;

        dates.push(str);
        curDate = addDays.call(curDate, 1);
    }
    return dates;
};