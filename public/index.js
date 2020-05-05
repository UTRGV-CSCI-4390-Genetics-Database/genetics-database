$(document).ready(() => {
  $('#schema').hide();
  $('#run').click(() => {
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
