




















static getHeaderRow2Data(){
    return[
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]
}

getTableHeader(){
const d = this.date;
const calenderTable = document.createElement("table");
const headerRow = this.getRow(datepicker.getheaderrow1data(),"th");
headerRow.children[0].setattribute("class","month-selector");
headerRow.children[0].onclick = 90 => {
    date.setMonth(date.getMonth() - 1);
    this.render(date);
};
headerRow.children[6].setAttribute("class","month-selector");
headerRow.children[6].oneclick = () =>{
    date.setMonth(date.getMonth() + 1);
    this.render(date);
};
calenderTableHeader.appendChild(headerRow);

calenderTable.appendChild(this.getRow(datepicker.getheaderrow2data(),"th"));
return calenderTableHeader;
}
gettablebody(){
    const m = this.renderdate.getMonth();
    const griddays = new

    date(this.renderdate.getFullYear(),this.renderdate.getMonth(),1);
    const firstDay = date.getDay();
    const daysInMonth = new Date(this.renderdate.getFullYear(),this.renderdate.getMonth() + 1,0).getDate();
    const tableBody = document.createElement("tbody");
    let day = 1;
    for(let i = 0; i < 6; i++){
        const row = document.createElement("tr");
        for(let j = 0; j < 7; j++){
            const cell = document.createElement("td");
            if(i === 0 && j < firstDay){
                cell.textContent = "";
            }else if(day > daysInMonth){
                cell.textContent = "";
            }else{
                cell.textContent = day;
                day++;
            }
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    return tableBody;
}
getTable(){
    const table = document.createElement("table");
    table.appendChild(this.getTableHeader());
    table.appendChild(this.getTableBody());
    return table;
}
render(date){
    this.renderdate = date;
    if(typeof date === "object"){
        const calendercontainer = document.getElementById(this.id);
        if(calendercontainer.firstChild !== null){
            calendercontainer.removeChild(calendercontainer.firstChild);
        }
        calendercontainer.appendChild(this.getTable());
    }
}

