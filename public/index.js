$(document).ready(() => {
  $('#run').click(() => {
    $.ajax({
      url: '/schema',
      method: 'POST',
      success(res) {
        console.log(res);
        $('#schema').text('Schema was successfully saved');
      },
    });
  });
});
