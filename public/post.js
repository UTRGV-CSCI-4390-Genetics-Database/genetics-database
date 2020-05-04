const prepa = function () {
  $('.temp').show();
  $('#card').show();
  $('#war').show();
  $('#btnSub').prop('disabled', true); $('#btnPro').prop('disabled', true); $('#btnCat').prop('disabled', true);
  $('#btnMar').prop('disabled', true); $('#btnBio').prop('disabled', true); $('#btnBlo').prop('disabled', true);
  $('#btnSubPro').prop('disabled', true); $('#btnSubCat').prop('disabled', true); $('#btnMarCat').prop('disabled', true);
};
$(document).ready(() => {
  let rest = '';
  $('.temp').hide();
  $('#card').hide();
  $('#listElem').hide();
  $('#update').prop('disabled', true);
  $('#war').hide();
  $('#btnSub').click(() => {
    prepa();
    restrictonForPost(data, 'sub');
    $('.temp').hide();
    $('#update').prop('disabled', false);
    $('#card').hide();
    rest = 'sub';
  });
  $('#btnPro').click(() => {
    prepa();
    restrictonForPost(data, 'pro');
    $('.temp').hide();
    $('#update').prop('disabled', false);
    $('#card').hide();
  });
  $('#btnCat').click(() => {
    prepa();
    restrictonForPost(data, 'cat');
    $('.temp').hide();
    $('#update').prop('disabled', false);
    $('#card').hide();
  });
  $('#btnMar').click(() => {
    prepa();
    restrictonForPost(data, 'mar');
    $('.temp').hide();
    $('#update').prop('disabled', false);
    $('#card').hide();
  });
  $('#btnBio').click(() => {
    prepa();
    restrictonForPost(data, 'bio');
    $('.temp').hide();
    $('#update').prop('disabled', false);
    $('#card').hide();
  });
  $('#btnBlo').click(() => {
    prepa();
    restrictonForPost(data, 'blo');
    $('.temp').hide();
    $('#update').prop('disabled', false);
    $('#card').hide();
  });
  $('#btnSubPro').click(() => {
    prepa();
    restrictonForPost(data, 'subpro');
    $('.temp').hide();
    $('#update').prop('disabled', false);
    $('#card').hide();
  });
  $('#btnSubCat').click(() => {
    prepa();
    restrictonForPost(data, 'subcat');
    $('.temp').hide();
    $('#update').prop('disabled', false);
    $('#card').hide();
  });
  $('#btnMarCat').click(() => {
    prepa();
    restrictonForPost(data, 'marcat');
    $('.temp').hide();
    $('#update').prop('disabled', false);
    $('#card').hide();
  });
  $('#update').click(() => {
    obj = getInput();
    console.log(obj);
    if (rest == 'sub') {
      insertToTableSub(obj);
    } else {
      insertToTable(obj);
    }
  });
  $('#reset').click(() => {
    location.reload();
  });
});
