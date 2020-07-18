function getTotal() {
  const items = document.querySelectorAll(".item-price");
  let total = 0.0;
  for (let i = 0; i < items.length; i++) {
    total += parseFloat(items[i].value || 0);
    console.log(items[i].value);
  }
  console.log(total);
  const textField = document.querySelector('#total-amount');
  textField.textContent = +(Math.round(total + "e+2") + "e-2");
}

function generateItems() {
  const items = document.querySelector('#item-count').value;

  const table = document.querySelector('#items-table');

  for (let i = 0; i < items; i++) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    var textfield1 = document.createElement("input");
    textfield1.type = "text";
    textfield1.placeholder = "Item Name";
    textfield1.classList.add("item-input", "item-name");

    var textfield2 = document.createElement("input");
    textfield2.type = "text";
    textfield2.placeholder = "Item Price";
    textfield2.classList.add("item-input", "item-price");

    td1.appendChild(textfield1);
    td2.appendChild(textfield2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
  }

}

function addItem() {
  const table = document.querySelector('#items-table');

  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');

  var textfield1 = document.createElement("input");
  textfield1.type = "text";
  textfield1.placeholder = "Item Name";
  textfield1.classList.add("item-input", "item-name");

  var textfield2 = document.createElement("input");
  textfield2.type = "number";
  textfield2.placeholder = "Item Price";
  textfield2.classList.add("item-input", "item-price");
  textfield2.oninput = getTotal;

  td1.appendChild(textfield1);
  td2.appendChild(textfield2);
  tr.appendChild(td1);
  tr.appendChild(td2);

  table.appendChild(tr);
}

function deleteItem() {
  const table = document.querySelector('#items-table');
  table.deleteRow(-1);
  getTotal();
}

function generatePDF() {
  getTotal();
  // Choose the element that our invoice is rendered in.
  const element = document.getElementById("invoice");
  const invoiceNumber = document.getElementsByClassName("invoice-number")[0].value || "no_number";
  console.log(invoiceNumber);

  console.log(element);
  // Choose the element and save the PDF for our user.
  html2pdf()
    .set({
      html2canvas: {
        scale: 4,
        useCORS: true,
      },
      // pagebreak: {
      // mode: ['avoid-all', 'css', 'legacy']
      // },
      margin: [0.6, 0],
      filename: `invoice_${invoiceNumber}.pdf`,
      jsPDF: {
        unit: "in"
      }
    })
    .from(element)
    .save();
}