'use strict';

class DatePicker {
    constructor(divId, onDateSelected) {
        this.divId = divId;
        this.onDateSelected = onDateSelected;
    }
    getTableCaption() {
        const month = this.currentDate.toLocaleString('default', { month: 'long' });
        const calendarCaption = document.createElement('caption');
        const cellText = document.createTextNode(`${month} ${this.currentDate.getFullYear()}`);
        calendarCaption.appendChild(cellText);
        return calendarCaption;
    }
    getRow(values, rowType) {
        const row = document.createElement('tr');
        for (let index = 0; index < values.length; index++) {
            const cell = document.createElement(rowType);
            const cellText = document.createTextNode(values[index].value);
            cell.appendChild(cellText);
            if (values[index].active) {
                const fixedDate = {month: this.currentDate.getMonth(), day: values[index].value, year: this.currentDate.getFullYear()};
                cell.onclick = () => {this.onDateSelected(this.divId, fixedDate);};
            }
            else{
                cell.setAttribute('class', 'not-in-month');
            }
            row.appendChild(cell);
        }
        return row;
    }
    static getHeaderRow1Data(){
        return [{value: "\u00A0", active: false}, {value: "\u00A0", active: false}, {value: "\u00A0", active: false}, {value: "\u00A0", active: false}, {value: "\u00A0", active: false}, {value: "\u2192", active: true}];
    }
}