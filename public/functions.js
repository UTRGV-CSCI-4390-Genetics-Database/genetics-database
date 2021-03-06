// functions for search
function moveObjectElement(currentKey, afterKey, obj) {
  const result = {};
  const val = obj[currentKey];
  delete obj[currentKey];
  let next = -1;
  let i = 0;
  if (typeof afterKey === 'undefined' || afterKey == null) afterKey = '';
  $.each(obj, (k, v) => {
    if ((afterKey == '' && i == 0) || next == 1) {
      result[currentKey] = val;
      next = 0;
    }
    if (k == afterKey) { next = 1; }
    result[k] = v;
    ++i;
  });
  if (next == 1) {
    result[currentKey] = val;
  }
  if (next !== -1) return result; return obj;
}
function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { return false; }
  }
  return true;
}
const dataToObj = function (data) {
  const newObj = {};
  for (const [key, value] of Object.entries(data)) {
    var tempObj = {};
    value.forEach((val) => {
      for (const [key1, value1] of Object.entries(val)) {
        tempObj[key1] = value1;
      }
    });
    newObj[key] = tempObj;
  }
  return newObj;
};
const dataInObj = dataToObj(data);
const checkBox = function (key1) {
  if ($(`#${key1}:checked`).val()) {
    return true;
  }

  return false;
};
const inputFromCheckBox = function (obj) {
  for (const [key, value] of Object.entries(obj)) {
    for (const [key1, value1] of Object.entries(obj[key])) {
      val = checkBox(key1);
      value1[1] = val;
    }
  }
};
const columnListInAccordion = function (data) {
  for (const [key, value] of Object.entries(data)) {
    myAccord.find('button').text(key);
    myAccord.find('button').attr('data-target', `#${key}`);
    myAccord.find('.collapse').attr('id', key);
    myFrom.attr('id', key);
    myFrom.text(key);
    $('#from').append(myFrom.clone());
    value.forEach((val) => {
      for (const [key1, value1] of Object.entries(val)) {
        myCheck.find('input').attr('id', key1);
        myCheck.find('label').text(` -${key1}`);
        myAccord.find('.card-body').append(myCheck.clone());
      }
    });
    $('#accordion').append(myAccord.clone());
    myAccord.find('.card-body').text('');
  }
};

const copyOfDataWithArray = function (data) {
  const newObj = {};
  for (const [key, value] of Object.entries(data)) {
    var tempObj = {};
    value.forEach((val) => {
      for (const [key1, value1] of Object.entries(val)) {
        const newVal = Array(3);
        newVal[0] = value1;
        tempObj[key1] = newVal;
      }
    });
    newObj[key] = tempObj;
  }
  return newObj;
};
const getColumnArray = function (arr, obj) {
  str = '';
  for (const [key, value] of Object.entries(obj)) {
    for (const [key1, value1] of Object.entries(obj[key])) {
      if (value1[1] == true) {
        str = `${key}.${key1}`;
        arr.push(str);
      }
    }
  }
};

let even = true;
const doEven = function () {
  $('#accordion').show();
  $('#bt1').text('Confirm selection');
};
const doOdd = function () {
  newObj = copyOfDataWithArray(data);
  inputFromCheckBox(newObj);
  columnArray = [];
  getColumnArray(columnArray, newObj);
  $('#bt1').text('Select...');
  str = '';
  for (i = 0; i < columnArray.length; i++) {
    str = `${str + columnArray[i]}, `;
  }
  str = str.slice(0, str.length - 2);
  $('#select').val(str);
  $('#select2').text(str);
  $('#accordion').hide();
  $('#run').attr('disabled', false);
  return str;
};
function CreateTableFromJSON(myTable) {
  const col = [];
  for (var i = 0; i < myTable.length; i++) {
    for (const key in myTable[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  const table = document.createElement('table');
  let tr = table.insertRow(-1);
  for (var i = 0; i < col.length; i++) {
    const th = document.createElement('th');
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  for (var i = 0; i < myTable.length; i++) {
    tr = table.insertRow(-1);
    for (let j = 0; j < col.length; j++) {
      const tabCell = tr.insertCell(-1);
      tabCell.innerHTML = myTable[i][col[j]];
    }
  }
  const divContainer = document.getElementById('showData');
  divContainer.innerHTML = '';
  divContainer.appendChild(table);
}

const createTable = function (str) {
  req = { request: str };
  $.ajax({
    url: '/results',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ obj: req }),
    success(myTable) {
      if (isEmpty(myTable[0])) {
        $('#alert').text('No results found for this search.');
      } else {
        CreateTableFromJSON(myTable);
      }
    },
  });
};

const trueSQL = function (str, arr, obj) {
  newStr = '';
  newArr = str.split('?');
  for (i = 0; i < arr.length; i++) {
    arr1 = newArr[i].split('.');
    if (arr1.length > 1) {
      arr10 = arr1[0].split(' ');
      arr11 = arr1[1].split(' ');
      str0 = arr10[arr10.length - 1];
      str1 = arr11[0];
      str2 = `${str0}.${str1}`;
      if (obj[str2] == 'boolean') {
        if (arr[i] == 1) { myval = true; } else { myval = false; }
      } else if (obj[str2] == 'string' || obj[str2] == 'character') {
        myval = `'${arr[i]}'`;
      } else { myval = arr[i]; }
    } else { myval = arr[i]; }
    newStr = newStr + newArr[i] + myval;
  }
  newStr += newArr[newArr.length - 1];
  return newStr;
};

strJoin = ' FROM individuals JOIN demographics ON individuals.subject_id = demographics.subject_id JOIN medical_history ON individuals.subject_id = medical_history.subject_id JOIN psychiatric_disorders ON individuals.subject_id = psychiatric_disorders.subject_id LEFT JOIN biological_measurements ON individuals.subject_id = biological_measurements.subject_id LEFT JOIN blood_samples ON individuals.subject_id = blood_samples.subject_id LEFT JOIN project_enrollments ON individuals.subject_id = project_enrollments.individual_id LEFT JOIN projects ON project_enrollments.project_id = projects.project_id LEFT JOIN category_individuals ON individuals.subject_id = category_individuals.subject_id LEFT JOIN categories ON category_individuals.category_id = categories.category_id LEFT JOIN category_markers ON categories.category_id = category_markers.category_id LEFT JOIN markers ON category_markers.marker_name = markers.marker_name';


// functions for update


const Accordion = function (data) {
  let count = 0;
  myAccord = $('#card').clone(true);
  $('#accordion').empty();
  for (const [key, value] of Object.entries(data)) {
    myAccord.find('button').attr('data-target', `#${key}`).text(key).attr('id', `#${key}`);
    myAccord.find('.collapse').attr('id', key);
    value.forEach((val) => {
      for (const [key1, value1] of Object.entries(val)) {
        if (key == 'biological_measurements' && key1 == 'biological_measurements_id') {} else if ((key == 'demographics' || key == 'psychiatric_disorders' || key == 'medical_history' || key == 'individuals') && key1 == 'subject_id') {} else if (key == 'projects' && key1 == 'project_id') {} else if (key == 'categories' && key1 == 'category_id') {} else if (key == 'blood_samples' && key1 == 'blood_sample_id') {} else {
          if (value1 == 'boolean' || value1 == 'text' || value1 == 'character') {
            myVar = $('#textDiv').clone(true); myVar.find('input').attr('id', `${key}_${key1}`);
          } else if (value1 == 'integer' || value1 == 'smallint' || value1 == 'bigint') {
            if (key1 == 'ethnicity' || key1 == 'father_ethnicity_1' || key1 == 'father_ethnicity_2' || key1 == 'father_ethnicity_3' || key1 == 'father_ethnicity_4' || key1 == 'mother_ethnicity_1' || key1 == 'mother_ethnicity_2' || key1 == 'mother_ethnicity_3' || key1 == 'mother_ethnicity_4') { myVar = $('#ethnicDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'ethnic_category') { myVar = $('#ethCaDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'approximate_income') { myVar = $('#incomeDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'reported_race') { myVar = $('#raceDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'marital_status') { myVar = $('#marDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'military_discharge') { myVar = $('#mildDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'military_rejected') { myVar = $('#milrDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'religion') { myVar = $('#relDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'smoked_cigarettes') { myVar = $('#cigDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'schizophrenia') { myVar = $('#schDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else { myVar = $('#intDiv').clone(true); myVar.find('input').attr('id', `${key}_${key1}`); }
          } else if (value1 == 'date') { myVar = $('#dateDiv').clone(true); myVar.find('input').attr('id', `${key}_${key1}`); } else if (value1 == 'real') { myVar = $('#realDiv').clone(true); myVar.find('input').attr('id', `${key}_${key1}`); }
          myVar.removeClass('temp');
          myVar.find('label').text(key1);
          myAccord.find('.card-body').append(myVar.clone(true));
        }
      }
    });
    myAccord.removeAttr('id');
    $('#accordion').append(myAccord.clone(true));
    myAccord.find('.card-body').text('');
    count++;
  }
};
const restricton = function (data, rest) {
  newObj = {};
  if (rest == 'sub') {
    newObj.demographics = data.demographics; newObj.psychiatric_disorders = data.psychiatric_disorders;
    newObj.medical_history = data.medical_history; newObj.individuals = data.individuals;
  } else if (rest == 'pro') {
    newObj.projects = data.projects;
  } else if (rest == 'cat') {
    newObj.categories = data.categories;
  } else if (rest == 'mar') {
    newObj.markers = data.markers;
  } else if (rest == 'bio') {
    newObj.biological_measurements = data.biological_measurements;
  } else if (rest == 'blo') {
    newObj.blood_samples = data.blood_samples;
  }
  return newObj;
};
const accordWihtRestriction = function (data, rest) {
  Accordion(restricton(data, rest));
};
const checkSubjectId = function (str, str2, rest) {
  req = { request: str };
  $.ajax({
    url: '/results',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ obj: req }),
    success(res) {
      if (res.length > 0) {
        $('.temp').show();
        $('#card').show();
        accordWihtRestriction(data, rest);
        $('.temp').hide();
        $('#update').prop('disabled', false);
        $('#card').hide();
      } else if (res.length == 0) {
        $('#btnSub').prop('disabled', false); $('#btnCat').prop('disabled', false); $('#btnPro').prop('disabled', false); $('#btnMar').prop('disabled', false);
        $('#alert').text(`There are no results for ${str2}`);
      } else {
        $('#alert').text('We\'re experiencing a problem connecting to the database; please try again later.');
      }
    },
  });
};
const getSubjectData = function (table, str, obj) {
  let myVar;
  req = { request: str };
  $.ajax({
    url: '/results',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ obj: req }),
    success(res) {
      newObj = res[0];
      if (newObj) {
        for (let [key, value] of Object.entries(newObj)) {
          type = dataInObj[table][key];
          if (type == 'date') {
            const date = moment(value);
            value = date.format('YYYY-MM-DD');
          }
          str = `${table}_${key}`;
          $(`#${str}`).val(value);
        }
        obj[table] = newObj;
        for (i = 1; i < res.length; i++) {
          for (const [key, value] of Object.entries(res[i])) {
            str = `${table}_${key}`;
            myVar = $(`#${str}`).clone();
            myVar.attr('id', str + i);
            myVar.val(value);
            $(`#${str}`).parent().append(myVar.clone());
          }
        }
      } else {
        alert(`There are no results in ${table} for this id. Use the 'New Record' page if you wish to add this id.`);
      }
    },
  });
};

const checkChanges = function (obj) {
  newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    tempObj = {};
    for (const [key1, value1] of Object.entries(obj[key])) {
      if (key1 != 'subject_id') {
        str = `${key}_${key1}`;
        val2 = $(`#${str}`).val();
        if (val2 == '') {
          val2 = null;
        } else if (val2 == 'false') {
          val2 = false;
        } else if (val2 == 'true') {
          val2 = true;
        }
        if (value1 != val2) {
          tempObj[key1] = val2;
        }
      }
    }
    newObj[key] = tempObj;
  }
  return newObj;
};

const updateDB = function (obj, id) {
  str4 = ' RETURNING';
  if (Object.entries(obj)[0][0] == 'blood_samples') {
    str3 = ` WHERE blood_sample_id = '${id}'`;
  } else if (Object.entries(obj)[0][0] == 'categories' || Object.entries(obj)[0][0] == 'category_markers' || Object.entries(obj)[0][0] == 'category_individuals') {
    str3 = ` WHERE category_id = ${id}`;
  } else if (Object.entries(obj)[0][0] == 'biological_measurements') {
    str3 = ` WHERE biological_measurements_id = ${id}`;
  } else if (Object.entries(obj)[0][0] == 'projects') {
    str3 = ` WHERE project_id = ${id}`;
  } else if (Object.entries(obj)[0][0] == 'markers') {
    str3 = ` WHERE marker_name = '${id}'`;
  } else {
    str3 = ` WHERE subject_id = ${id}`;
  }
  for (const [key, value] of Object.entries(obj)) {
    str4 = ' RETURNING';
    str2 = '';
    str1 = `UPDATE ${key} SET`;
    for (const [key1, value1] of Object.entries(obj[key])) {
      type = dataInObj[key][key1];
      if (type == 'date' || type == 'text' || type == 'character') {
        str2 += ` ${key1} = '${value1}',`;
      } else { str2 = `${str2} ${key1} = ${value1},`; }
      str4 += ` ${key1},`;
    }
    if (str2 == '' || str2 == ' ') {} else {
      str2 = str2.slice(0, str2.length - 1);
      str4 = str4.slice(0, str4.length - 1);
      str4 += ';';
      str = str1 + str2 + str3 + str4;
      req = { request: str };
      $.ajax({
        url: '/results',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ obj: req }),
        success(res) {
          $('#listElem').show();
          updateResults(key, res[0]);
          $('#listElem').hide();
        },
      });
    }
  }
};
const updateResults = function (table, obj) {
  const li = $('#listElem').clone();
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      li.removeAttr('id', 'listElem');
      li.find('#li1').text(table);
      li.find('#li2').text(key);
      li.find('.badge-pill').text(value);
      $('#lista').append(li.clone());
    }
  }
};


// functions for new record


const getInput = function () {
  const Obj = {};
  const newObj = {};
  for (const [key, value] of Object.entries(dataInObj)) {
    var tempObj = {};
    for (const [key1, value1] of Object.entries(value)) {
      val = $(`#${key}_${key1}`).val();
      tempObj[key1] = val;
    }
    Obj[key] = tempObj;
  }
  for (const [key, value] of Object.entries(Obj)) {
    var tempObj = {};
    for (const [key1, value1] of Object.entries(value)) {
      if (value1) {
        if (!value1 == '' || !value1 == ' ') {
          tempObj[key1] = value1;
        }
      }
    }
    if (!isEmpty(tempObj)) {
      newObj[key] = tempObj;
    }
  }
  return newObj;
};

const insertToTable = function (obj) {
  if (isEmpty(obj)) {
    $('#alert').text('Invalid input. Ensure all fields marked with an asterisk have been correctly filled.');
  } else {
    for (const [key, value] of Object.entries(obj)) {
      str1 = `INSERT INTO ${key} (`;
      str3 = ' VALUES (';
      str2 = '';
      str4 = '';
      for (const [key1, value1] of Object.entries(value)) {
        type = dataInObj[key][key1];
        str2 = `${str2 + key1}, `;
        if (type == 'text' || type == 'date' || type == 'character') {
          str4 = `${str4}'${value1}'` + ', ';
        } else {
          str4 = `${str4 + value1}, `;
        }
      }
      str2 = str2.slice(0, str2.length - 2);
      str4 = str4.slice(0, str4.length - 2);
      str2 += ')';
      str4 += ')';
      str = `${str1 + str2 + str3 + str4} RETURNING *;`;
      req = { request: str };
      $.ajax({
        url: '/results',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ obj: req }),
        success(res) {
          if (!isEmpty(res[0])) {
            $('#listElem').show();
            $('#sukces').show();
            updateResults(key, res[0]);
            $('#listElem').hide();
          } else {
            $('#alert').text('Invalid input. Ensure all fields marked with an asterisk have been correctly filled.');
          }
        },
      });
    }
  }
};


// function for delete

const deleteRecord = function (obj, col, id) {
  console.log(obj);
  for (const [key, value] of Object.entries(obj)) {
    if (key == 'project_enrollments') { column = 'individual_id'; } else { column = col; }
    str = `DELETE FROM ${key} WHERE ${column} = ${id} RETURNING *;`;
    // str = "DELETE FROM individuals WHERE subject_id = 208072018;"
    req = { request: str };
    $.ajax({
      url: '/results',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ obj: req }),
      success(res) {
        if (isEmpty(res[0])) {
          $('#alert').text(`There is no record with id = ${id}`);
        } else {
          $('#alert').hide();
          $('#listElem').show();
          $('#sukces').show();
          updateResults(key, res[0]);
          $('#listElem').hide();
        }
      },
    });
  }
};


const AccordionForPost = function (data) {
  let count = 0;
  myAccord = $('#card').clone(true);
  $('#accordion').empty();
  for (const [key, value] of Object.entries(data)) {
    myAccord.find('button').attr('data-target', `#${key}`).text(key).attr('id', `#${key}`);
    myAccord.find('.collapse').attr('id', key);
    value.forEach((val) => {
      for (const [key1, value1] of Object.entries(val)) {
        if (key == 'biological_measurements' && key1 == 'biological_measurements_id') {} else if ((key == 'demographics' || key == 'psychiatric_disorders' || key == 'medical_history' || key == 'individuals') && key1 == 'subject_id') {} else if (key == 'projects' && key1 == 'project_id') {} else if (key == 'categories' && key1 == 'category_id') {}
        // else if(key=="blood_samples" && key1=="blood_sample_id"){}
        else {
          if (value1 == 'boolean' || value1 == 'text' || value1 == 'character') {
            myVar = $('#textDiv').clone(true); myVar.find('input').attr('id', `${key}_${key1}`);
          } else if (value1 == 'integer' || value1 == 'smallint' || value1 == 'bigint') {
            if (key1 == 'ethnicity' || key1 == 'father_ethnicity_1' || key1 == 'father_ethnicity_2' || key1 == 'father_ethnicity_3' || key1 == 'father_ethnicity_4' || key1 == 'mother_ethnicity_1' || key1 == 'mother_ethnicity_2' || key1 == 'mother_ethnicity_3' || key1 == 'mother_ethnicity_4') { myVar = $('#ethnicDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'ethnic_category') { myVar = $('#ethCaDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'approximate_income') { myVar = $('#incomeDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'reported_race') { myVar = $('#raceDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'marital_status') { myVar = $('#marDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'military_discharge') { myVar = $('#mildDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'military_rejected') { myVar = $('#milrDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'religion') { myVar = $('#relDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'smoked_cigarettes') { myVar = $('#cigDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else if (key1 == 'schizophrenia') { myVar = $('#schDiv').clone(true); myVar.find('select').attr('id', `${key}_${key1}`); } else { myVar = $('#intDiv').clone(true); myVar.find('input').attr('id', `${key}_${key1}`); }
          } else if (value1 == 'date') { myVar = $('#dateDiv').clone(true); myVar.find('input').attr('id', `${key}_${key1}`); } else if (value1 == 'real') { myVar = $('#realDiv').clone(true); myVar.find('input').attr('id', `${key}_${key1}`); }
          myVar.removeClass('temp');
          if (key1 == 'sex' || key1 == 'subject_id' || key1 == 'project_id' || key1 == 'individual_id' || key1 == 'measurements_date'
              || key1 == 'category_name' || key1 == 'blood_sample_id' || key1 == 'date_of_birth' || key1 == 'project_name' || key1 == 'marker_name'
              || key1 == 'date_collected' || key1 == 'category_id' || key1 == 'blood_sample_id') {
            myVar.find('label').html(`<span>${key1}</span><span class="red">*</span> `);
          } else {
            myVar.find('label').text(key1);
          }
          myAccord.find('.card-body').append(myVar.clone(true));
        }
      }
    });
    myAccord.removeAttr('id');
    $('#accordion').append(myAccord.clone(true));
    myAccord.find('.card-body').text('');
    count++;
  }
};

const restrictonForPost = function (data, rest) {
  if (rest == 'sub') {
    newObj = data;
    delete newObj.categories; delete newObj.projects; delete newObj.category_markers; delete newObj.markers;
    delete newObj.biological_measurements; delete newObj.blood_samples; delete newObj.project_enrollments; delete newObj.category_individuals;
  } else if (rest == 'pro') {
    newObj = data;
    delete newObj.project_enrollments; /* delete newObj["projects"]; */ delete newObj.demographics; delete newObj.biological_measurements;
    delete newObj.psychiatric_disorders; delete newObj.medical_history; delete newObj.blood_samples; delete newObj.individuals;
    delete newObj.markers; delete newObj.categories; delete newObj.category_markers; delete newObj.category_individuals;
  } else if (rest == 'cat') {
    newObj = data;
    delete newObj.project_enrollments; delete newObj.projects; delete newObj.demographics; delete newObj.biological_measurements;
    delete newObj.psychiatric_disorders; delete newObj.medical_history; delete newObj.blood_samples; delete newObj.individuals;
    delete newObj.markers; /* delete newObj["categories"]; */ delete newObj.category_markers; delete newObj.category_individuals;
  } else if (rest == 'mar') {
    newObj = data;
    delete newObj.project_enrollments; delete newObj.projects; delete newObj.demographics; delete newObj.biological_measurements;
    delete newObj.psychiatric_disorders; delete newObj.medical_history; delete newObj.blood_samples; delete newObj.individuals;
    delete newObj.categories; delete newObj.category_markers; delete newObj.category_individuals;
  } else if (rest == 'bio') {
    newObj = data;
    delete newObj.project_enrollments; delete newObj.projects; delete newObj.demographics; delete newObj.markers;
    delete newObj.psychiatric_disorders; delete newObj.medical_history; delete newObj.blood_samples; delete newObj.individuals;
    delete newObj.categories; delete newObj.category_markers; delete newObj.category_individuals;
  } else if (rest == 'blo') {
    newObj = data;
    delete newObj.project_enrollments; delete newObj.projects; delete newObj.demographics; delete newObj.markers;
    delete newObj.psychiatric_disorders; delete newObj.medical_history; delete newObj.biological_measurements; delete newObj.individuals;
    delete newObj.categories; delete newObj.category_markers; delete newObj.category_individuals;
  } else if (rest == 'subcat') {
    newObj = data;
    delete newObj.project_enrollments; delete newObj.projects; delete newObj.demographics; delete newObj.biological_measurements;
    delete newObj.psychiatric_disorders; delete newObj.medical_history; delete newObj.blood_samples; delete newObj.individuals;
    delete newObj.markers; delete newObj.categories; delete newObj.category_markers; /* delete newObj["category_individuals"]; */
  } else if (rest == 'subpro') {
    newObj = data;
    /* delete newObj["project_enrollments"]; */ delete newObj.projects; delete newObj.demographics; delete newObj.biological_measurements;
    delete newObj.psychiatric_disorders; delete newObj.medical_history; delete newObj.blood_samples; delete newObj.individuals;
    delete newObj.markers; delete newObj.categories; delete newObj.category_markers; delete newObj.category_individuals;
  } else if (rest == 'marcat') {
    newObj = data;
    delete newObj.project_enrollments; delete newObj.projects; delete newObj.demographics; delete newObj.biological_measurements;
    delete newObj.psychiatric_disorders; delete newObj.medical_history; delete newObj.blood_samples; delete newObj.individuals;
    delete newObj.markers; delete newObj.categories; /* delete newObj["category_markers"]; */ delete newObj.category_individuals;
  }

  AccordionForPost(newObj);
};

const insertToTableSub = function (obj) {
  if (isEmpty(obj)) {
    $('#alert').text('Invalid input. Ensure all fields marked with an asterisk have been correctly filled.');
  } else {
    str1 = 'INSERT INTO individuals (';
    str3 = ' VALUES (';
    str2 = '';
    str4 = '';
    for (const [key1, value1] of Object.entries(obj.individuals)) {
      type = dataInObj.individuals[key1];
      str2 = `${str2 + key1}, `;
      if (type == 'text' || type == 'date' || type == 'character') {
        str4 = `${str4}'${value1}'` + ', ';
      } else {
        str4 = `${str4 + value1}, `;
      }
    }
    str2 = str2.slice(0, str2.length - 2);
    str4 = str4.slice(0, str4.length - 2);
    str2 += ')';
    str4 += ')';
    str = `${str1 + str2 + str3 + str4} RETURNING *;`;
    req = { request: str };
    $.ajax({
      url: '/results',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ obj: req }),
      success(res) {
        if (isEmpty(res[0])) {
          $('#alert').text('Incorrect input. Check if all fields marked with an asterisk have been completed correctly.');
        } else {
          newId = res[0].subject_id;
          $('#listElem').show();
          $('#sukces').show();
          updateResults('individuals', res[0]);
          str1 = 'INSERT INTO psychiatric_disorders (subject_id, ';
          str3 = ` VALUES (${newId}, `;
          str2 = '';
          str4 = '';
          if (!isEmpty(obj.psychiatric_disorders)) {
            for (const [key1, value1] of Object.entries(obj.psychiatric_disorders)) {
              type = dataInObj.psychiatric_disorders[key1];
              str2 = `${str2 + key1}, `;
              if (type == 'text' || type == 'date' || type == 'character') {
                str4 = `${str4}'${value1}'` + ', ';
              } else {
                str4 = `${str4 + value1}, `;
              }
            }
          } else {
            str1 = str1.slice(0, str1.length - 2);
            str3 = str3.slice(0, str3.length - 2);
          }
          str2 = str2.slice(0, str2.length - 2);
          str4 = str4.slice(0, str4.length - 2);
          str2 += ')';
          str4 += ')';
          str = `${str1 + str2 + str3 + str4} RETURNING *;`;
          req = { request: str };
          console.log(req);
          $.ajax({
            url: '/results',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ obj: req }),
            success(res) {
              updateResults('psychiatric_disorders', res[0]);
            },
          });
          str1 = 'INSERT INTO medical_history (subject_id, ';
          str3 = ` VALUES (${newId}, `;
          str2 = '';
          str4 = '';
          if (!isEmpty(obj.medical_history)) {
            for (const [key1, value1] of Object.entries(obj.medical_history)) {
              type = dataInObj.medical_history[key1];
              str2 = `${str2 + key1}, `;
              if (type == 'text' || type == 'date' || type == 'character') {
                str4 = `${str4}'${value1}'` + ', ';
              } else {
                str4 = `${str4 + value1}, `;
              }
            }
          } else {
            str1 = str1.slice(0, str1.length - 2);
            str3 = str3.slice(0, str3.length - 2);
          }
          str2 = str2.slice(0, str2.length - 2);
          str4 = str4.slice(0, str4.length - 2);
          str2 += ')';
          str4 += ')';
          str = `${str1 + str2 + str3 + str4} RETURNING *;`;
          req = { request: str };
          console.log(req);
          $.ajax({
            url: '/results',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ obj: req }),
            success(res) {
              updateResults('medical_history', res[0]);
            },
          });
          str1 = 'INSERT INTO demographics (subject_id, ';
          str3 = ` VALUES (${newId}, `;
          str2 = '';
          str4 = '';
          if (!isEmpty(obj.demographics)) {
            for (const [key1, value1] of Object.entries(obj.demographics)) {
              type = dataInObj.demographics[key1];
              str2 = `${str2 + key1}, `;
              if (type == 'text' || type == 'date' || type == 'character') {
                str4 = `${str4}'${value1}'` + ', ';
              } else {
                str4 = `${str4 + value1}, `;
              }
            }
          } else {
            str1 = str1.slice(0, str1.length - 2);
            str3 = str3.slice(0, str3.length - 2);
          }
          str2 = str2.slice(0, str2.length - 2);
          str4 = str4.slice(0, str4.length - 2);
          str2 += ')';
          str4 += ')';
          str = `${str1 + str2 + str3 + str4} RETURNING *;`;
          req = { request: str };
          console.log(req);
          $.ajax({
            url: '/results',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ obj: req }),
            success(res) {
              updateResults('demographics', res[0]);
              $('#listElem').hide();
            },
          });
        }
      },
    });
  }
};
