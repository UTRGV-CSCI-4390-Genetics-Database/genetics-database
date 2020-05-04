$(document).ready(() => {
  $('#schema').hide();
  req = { request: "SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';" };
  $('#run').click(() => {
    console.log(req);
    $.ajax({
      url: '/schema',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ obj: req }),
      success(res) {
        console.log(res);
        $('#schema').show();
      },
    });
  });
});
