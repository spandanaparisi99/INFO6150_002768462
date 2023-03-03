//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

const tableRows = document.querySelectorAll("#myTable tr.dropDownTextArea");

tableRows.forEach(row => {
    row.style.display = "none";
});

const downIcons = document.querySelectorAll("#myTable tr td img[src='down.png']");

downIcons.forEach(icon => {
    icon.addEventListener("click", function() {
        const parentRow = this.closest("tr");
        const dropDownRow = parentRow.nextElementSibling;

        if (dropDownRow.style.display === "none") {
            dropDownRow.style.display = "table-row";
        } else {
            dropDownRow.style.display = "none";
        }
    });
});

document.getElementById("button").style.backgroundColor = "grey";
document.getElementById("button").disabled = true;

let count = 4;
  const addBtn = document.getElementById("add");
  addBtn.addEventListener("click", function() {
    try{
    const table = document.getElementById("myTable");
    const newRow = table.insertRow(-1);
    newRow.classList.add("student-row");
    newRow.innerHTML = `
      <td><input type="checkbox" /><br /><br /><img id="dropDownImg-${count}" src="down.png" width="25px" /></td>
      <td>Student ${count}</td>
      <td>Teacher ${count}</td>
      <td>Approved</td>
      <td>Fall</td>
      <td>TA</td>
      <td>${count}${count}${count}${count}</td>
      <td>100%</td>
      <td></td>
      <td></td>
    `;
    const dropDownRow = table.insertRow(-1);
    dropDownRow.classList.add("dropDownTextArea");
    dropDownRow.innerHTML = `
      <td colspan="8">
        Advisor:<br /><br />
        Award Details<br />
        Summer 1-2014(TA)<br />
        Budget Number: <br />
        Tuition Number: <br />
        Comments:<br /><br /><br />
        Award Status:<br /><br /><br />
      </td>
    `;
    document.getElementById(`dropDownImg-${count}`).addEventListener('click', function() {
      const dropDownTextArea = dropDownRow;
      if (dropDownTextArea.style.display === 'none') {
        dropDownTextArea.style.display = 'table-row';
      } else {
        dropDownTextArea.style.display = 'none';
      }
    });
    count++;
    alert("Record added successfully");}
    catch (error) {
      alert("Error adding record: " + error);
    }

    const checkboxes = document.querySelectorAll("input[type='checkbox']");

  for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", function() {
      this.closest("tr").style.backgroundColor = this.checked ? "yellow" : "";
    });
  }

const submitButton = document.querySelector("#button");

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", function() {
    let checked = false;
    for (let j = 0; j < checkboxes.length; j++) {
      if (checkboxes[j].checked) {
        checked = true;
        break;
      }
    }
    if (checked) {
      submitButton.style.backgroundColor = "orange";
      submitButton.disabled = false;
    } else {
      submitButton.style.backgroundColor = "gray";
      submitButton.disabled = true;
    }
  });
}

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", function() {
  const row = checkboxes[i].closest("tr");
  const deleteButton = row.querySelector("button.delete");
  const editButton = row.querySelector("button.edit");
  
  if (checkboxes[i].checked) {
    if (!deleteButton) {
      const newButton = document.createElement("button");
      newButton.innerHTML = "Delete";
      newButton.classList.add("delete");
      row.querySelector("td:nth-child(9)").appendChild(newButton);
  
      newButton.addEventListener("click", function() {
        row.remove();
        alert("Row has been deleted");
      });
    }

    if(!editButton){
      const newEditButton = document.createElement("button");
      newEditButton.innerHTML = "Edit";
      newEditButton.classList.add("edit");
      row.querySelector("td:nth-child(10)").appendChild(newEditButton);

      newEditButton.addEventListener("click", function() {
        alert("Details have been edited.");
      });
    }
  } else {
    if (deleteButton) {
      deleteButton.remove();
    }

    if(editButton){
      editButton.remove();
    }
  }
  });
  }

  });

  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", function() {
      this.closest("tr").style.backgroundColor = this.checked ? "yellow" : "";
    });
  }

const submitButton = document.querySelector("#button");

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", function() {
    let checked = false;
    for (let j = 0; j < checkboxes.length; j++) {
      if (checkboxes[j].checked) {
        checked = true;
        break;
      }
    }
    if (checked) {
      submitButton.style.backgroundColor = "orange";
      submitButton.disabled = false;
    } else {
      submitButton.style.backgroundColor = "gray";
      submitButton.disabled = true;
    }
  });
}

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", function() {
  const row = checkboxes[i].closest("tr");
  const deleteButton = row.querySelector("button.delete");
  const editButton = row.querySelector("button.edit");
  
  if (checkboxes[i].checked) {
    if (!deleteButton) {
      const newButton = document.createElement("button");
      newButton.innerHTML = "Delete";
      newButton.classList.add("delete");
      row.querySelector("td:nth-child(9)").appendChild(newButton);
  
      newButton.addEventListener("click", function() {
        row.remove();
        alert("Row has been deleted");
      });
    }

    if(!editButton){
      const newEditButton = document.createElement("button");
      newEditButton.innerHTML = "Edit";
      newEditButton.classList.add("edit");
      row.querySelector("td:nth-child(10)").appendChild(newEditButton);

      newEditButton.addEventListener("click", function() {
        alert("Details have been edited.");
      });
    }
  } else {
    if (deleteButton) {
      deleteButton.remove();
    }

    if(editButton){
      editButton.remove();
    }
  }
  });
  }

