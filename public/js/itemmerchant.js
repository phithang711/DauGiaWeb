function deleteRow(elem) {
    var table = elem.parentNode.parentNode.parentNode;
    var rowCount = table.rows.length;
  
    if(rowCount === 1) {
      alert('Cannot delete the last row');
      return;
    }
  
    // get the "<tr>" that is the parent of the clicked button
    var row = elem.parentNode.parentNode; 
    row.parentNode.removeChild(row); // remove the row
  }