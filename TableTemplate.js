'use strict';

class TableTemplate {
  static fillIn(id, dictionary, columnName) {
    const table = document.getElementById(id);

    if (!table) return;

    if (columnName === undefined) {
      // Fill the whole table
      const templateProcessor = new TemplateProcessor(table.innerHTML);
      table.innerHTML = templateProcessor.fillIn(dictionary);
    } else {
      // Only fill in a specific column
      const headerRow = table.rows[0];
      const headerProcessor = new TemplateProcessor(headerRow.innerHTML);
      headerRow.innerHTML = headerProcessor.fillIn(dictionary);

      let processingIndex = null;
      for (let index = 0; index < headerRow.cells.length; index++) {
        if (headerRow.cells[index].innerHTML === columnName) {
          processingIndex = index;
          break;
        }
      }

      if (processingIndex !== null) {
        for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
          const row = table.rows[rowIndex];
          const cell = row.cells[processingIndex];
          const templateProcessor = new TemplateProcessor(cell.innerHTML);
          cell.innerHTML = templateProcessor.fillIn(dictionary);
        }
      }
    }

    // Reveal table once filled
    table.style.visibility = 'visible';
  }
}

