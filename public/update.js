// 208072018, 200687016, 208213012
$(document).ready(() => {
  let Id = 0;
  const myObj = {};
  $('.temp').hide();
  $('#card').hide();
  $('#listElem').hide();
  $('#update').prop('disabled', true);
  $('#btnSub').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true); $('#btnMar').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valSub').val();
    str2 = `subject_id = ${Id}`;
    str = `SELECT subject_id FROM individuals WHERE ${str2};`;
    rest = 'sub';
    checkSubjectId(str, str2, rest);
  });
  $('#btnPro').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true); $('#btnMar').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valPro').val();
    str2 = `project_id = ${Id}`;
    str = `SELECT project_id FROM projects WHERE ${str2};`;
    rest = 'pro';
    checkSubjectId(str, str2, rest);
  });
  $('#btnCat').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true); $('#btnMar').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valCat').val();
    str2 = `category_id = ${Id}`;
    str = `SELECT category_id FROM categories WHERE ${str2};`;
    rest = 'cat';
    checkSubjectId(str, str2, rest);
  });
  $('#btnMar').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true); $('#btnMar').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valMar').val();
    str2 = `marker_name = '${Id}'`;
    str = `SELECT marker_name FROM markers WHERE ${str2};`;
    rest = 'mar';
    checkSubjectId(str, str2, rest);
  });
  $('.btn-outline-secondary').one('click', function () {
    table = $(this).text();
    if (table == 'project_enrollments') {
      str = `SELECT * FROM ${table} WHERE individual_id = ${Id} OR project_id = ${Id};`;
    } else if (table == 'categories' || table == 'category_markers' || table == 'category_individuals') {
      str = `SELECT * FROM ${table} WHERE category_id = ${Id};`;
    } else if (table == 'projects') {
      str = `SELECT * FROM ${table} WHERE project_id  = ${Id};`;
    } else if (table == 'markers') {
      str = `SELECT * FROM ${table} WHERE marker_name = '${Id}';`;
    } else {
      str = `SELECT * FROM ${table} WHERE subject_id = ${Id};`;
    }
    getSubjectData(table, str, myObj);
  });
  $('#update').click(() => {
    obj = checkChanges(myObj);
    $('#accordion').empty();
    $('#update').prop('disabled', true);
    updateDB(obj, Id);
    $('#sukces').show();
  });
  $('#reset').click(() => {
    location.reload();
  });
});
