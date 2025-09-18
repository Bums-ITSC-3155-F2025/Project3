'use strict';

class DatePicker {
    constructor(divId, onDateSelected) {
        this.divId = divId;
        this.onDateSelected = onDateSelected;
        this.currentDate = new Date();
        this.renderdate = new Date();
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
                const fixedDate = {
                    month: this.currentDate.getMonth(),
                    day: values[index].value,
                    year: this.currentDate.getFullYear()
                };
                cell.onclick = () => { this.onDateSelected(this.divId, fixedDate); };
            } else {
                cell.setAttribute('class', 'not-in-month');
            }
            row.appendChild(cell);
        }
        return row;
    }

    static getHeaderRow1Data() {
        return [
            { value: "\u2190", active: true },
            { value: "\u00A0", active: false },
            { value: "\u00A0", active: false },
            { value: "\u00A0", active: false },
            { value: "\u00A0", active: false },
            { value: "\u00A0", active: false },
            { value: "\u2192", active: true }
        ];
    }

    static getHeaderRow2Data() {
        return [
            { value: "Sun", active: false },
            { value: "Mon", active: false },
            { value: "Tue", active: false },
            { value: "Wed", active: false },
            { value: "Thu", active: false },
            { value: "Fri", active: false },
            { value: "Sat", active: false }
        ];
    }

    getTableHeader() {
        const calenderTableHeader = document.createElement("thead");
        const headerRow1 = this.getRow(DatePicker.getHeaderRow1Data(), "th");
        headerRow1.children[0].setAttribute("class", "month-selector");
        headerRow1.children[0].onclick = () => {
            this.renderdate.setMonth(this.renderdate.getMonth() - 1);
            this.render(this.renderdate);
        };
        headerRow1.children[6].setAttribute("class", "month-selector");
        headerRow1.children[6].onclick = () => {
            this.renderdate.setMonth(this.renderdate.getMonth() + 1);
            this.render(this.renderdate);
        };
        calenderTableHeader.appendChild(headerRow1);

        const headerRow2 = this.getRow(DatePicker.getHeaderRow2Data(), "th");
        calenderTableHeader.appendChild(headerRow2);

        return calenderTableHeader;
    }

    getTableBody() {
        const firstDay = new Date(this.renderdate.getFullYear(), this.renderdate.getMonth(), 1).getDay();
        const daysInMonth = new Date(this.renderdate.getFullYear(), this.renderdate.getMonth() + 1, 0).getDate();
        const tableBody = document.createElement("tbody");
        let day = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");
                if (i === 0 && j < firstDay) {
                    cell.textContent = "";
                } else if (day > daysInMonth) {
                    cell.textContent = "";
                } else {
                    cell.textContent = day;
                    day++;
                }
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }
        return tableBody;
    }

    getTable() {
        const table = document.createElement("table");
        table.appendChild(this.getTableCaption());
        table.appendChild(this.getTableHeader());
        table.appendChild(this.getTableBody());
        return table;
    }

    render(date) {
        this.renderdate = date;
        if (typeof date === "object") {
            const calendercontainer = document.getElementById(this.divId);
            while (calendercontainer.firstChild !== null) {
                calendercontainer.removeChild(calendercontainer.firstChild);
            }
            calendercontainer.appendChild(this.getTable());
        }
    }
}
