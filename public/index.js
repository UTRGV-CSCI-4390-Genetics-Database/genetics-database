$(document).ready(() => {
  $('#schema').hide();
  $('#run').click(() => {
    console.log(req);
    $.ajax({
      url: '/schema',
      method: 'POST',
      success(res) {
        console.log(res);
        $('#schema').show();
      },
    });
  });
});
