const table = '';
obj = {};
str1 = { request: "SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';" };
function tableNames(res) {
  const myArr = [];
  for (i = 0; i < res.length; i++) {
    myArr.push(res[i].tablename);
  }
  return myArr;
}

$(document).ready(() => {
  $('#bt1').click(() => {
    $.ajax({
      url: '/results',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ obj: str1 }),
      success(res) {
        console.log(tableNames(res));
      },
    });
  });
  $('#bt2').click(() => {
    let myTables = [];
    $.ajax({
      url: '/results',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ obj: str1 }),
      success(res) {
        myTables = tableNames(res);
        myTables.forEach((elem) => {
          str2 = { request: `SELECT column_name, data_type FROM information_schema.columns WHERE TABLE_NAME = '${elem}';` };
          $.ajax({
            url: '/results',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ obj: str2 }),
            success(res) {
              obj[elem] = res;
              console.log(elem);
            },
          });
        });
      },
    });
    console.log(obj);
  });
  $('#bt3').click(() => {
    $.ajax({
      url: '/schema',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ obj }),
      success(res) {
        console.log(res);
      },
    });
  });
});
