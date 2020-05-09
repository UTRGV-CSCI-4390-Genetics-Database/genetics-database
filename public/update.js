// 208072018, 200687016, 208213012 rs2534636 DELETE FROM individuals WHERE subject_id = 208072018
$(document).ready(() => {
  let Id = 0;
  const myObj = {};
  $('.temp').hide();
  $('#card').hide();
  $('#listElem').hide();
  $('#update').prop('disabled', true);
  $('#btnSub').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true);
    $('#btnMar').prop('disabled', true); $('#btnBlo').prop('disabled', true); $('#btnBio').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valSub').val();
    str2 = `subject_id = ${Id}`;
    str = `SELECT subject_id FROM individuals WHERE ${str2};`;
    rest = 'sub';
    checkSubjectId(str, str2, rest);
  });
  $('#btnPro').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true);
    $('#btnMar').prop('disabled', true); $('#btnBlo').prop('disabled', true); $('#btnBio').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valPro').val();
    str2 = `project_id = ${Id}`;
    str = `SELECT project_id FROM projects WHERE ${str2};`;
    rest = 'pro';
    checkSubjectId(str, str2, rest);
  });
  $('#btnCat').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true);
    $('#btnMar').prop('disabled', true); $('#btnBlo').prop('disabled', true); $('#btnBio').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valCat').val();
    str2 = `category_id = ${Id}`;
    str = `SELECT category_id FROM categories WHERE ${str2};`;
    rest = 'cat';
    checkSubjectId(str, str2, rest);
  });
  $('#btnMar').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true);
    $('#btnMar').prop('disabled', true); $('#btnBlo').prop('disabled', true); $('#btnBio').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valMar').val();
    str2 = `marker_name = '${Id}'`;
    str = `SELECT marker_name FROM markers WHERE ${str2};`;
    rest = 'mar';
    checkSubjectId(str, str2, rest);
  });
  $('#btnBio').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true);
    $('#btnMar').prop('disabled', true); $('#btnBlo').prop('disabled', true); $('#btnBio').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valBio').val();
    str2 = `biological_measurements_id = ${Id}`;
    str = `SELECT biological_measurements_id FROM biological_measurements WHERE ${str2};`;
    rest = 'bio';
    checkSubjectId(str, str2, rest);
  });
  $('#btnBlo').click(() => {
    $('#btnSub').prop('disabled', true); $('#btnCat').prop('disabled', true); $('#btnPro').prop('disabled', true);
    $('#btnMar').prop('disabled', true); $('#btnBlo').prop('disabled', true); $('#btnBio').prop('disabled', true);
    $('#alert').empty();
    Id = $('#valBlo').val();
    str2 = `blood_sample_id = '${Id}'`;
    str = `SELECT blood_sample_id FROM blood_samples WHERE ${str2};`;
    rest = 'blo';
    checkSubjectId(str, str2, rest);
  });


  $('.btn-outline-secondary').one('click', function () {
    table = $(this).text();
    if (table == 'blood_samples') {
      str = `SELECT * FROM ${table} WHERE blood_sample_id = '${Id}';`;
    } else if (table == 'categories' || table == 'category_markers' || table == 'category_individuals') {
      str = `SELECT * FROM ${table} WHERE category_id = ${Id};`;
    } else if (table == 'projects') {
      str = `SELECT * FROM ${table} WHERE project_id  = ${Id};`;
    } else if (table == 'markers') {
      str = `SELECT * FROM ${table} WHERE marker_name = '${Id}';`;
    } else if (table == 'biological_measurements') {
      str = `SELECT * FROM ${table} WHERE biological_measurements_id = ${Id};`;
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
