var table = '';
obj = {};
str3 = "SELECT COUNT(*) FROM actor;";
str1 = {request: "SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';"}
function tableNames(res){
    var myArr = [];
    for(i = 0; i < res.length; i++){
        myArr.push(res[i].tablename);
    }
    return myArr;
}
//var elem = jQuery('<h5>');
//$(elem).text(res[i].tablename);
//$("#place").append(elem.clone());
$(document).ready(function(){
    $("#bt1").click(function(){
        $.ajax({
            url: '/results',
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify({obj: str1}),
            success: function(res){
                console.log(tableNames(res));
            }
        });
    })
    $("#bt2").click(function(){
        var myTables = [];
        $.ajax({
            url: '/results',
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify({obj: str1}),
            success: function(res){
                myTables = tableNames(res);
                myTables.forEach(function(elem){
                    str2 = {request: `SELECT column_name, data_type FROM information_schema.columns WHERE TABLE_NAME = '${elem}';`};
                    $.ajax({
                        url: '/results',
                        method: "POST",
                        contentType: 'application/json',
                        data: JSON.stringify({obj: str2}),
                        success: function(res){
                            obj[elem] = res;
                            console.log(elem);
                        }
                    });         
                })
            }
        });
        console.log(obj);
    })
    $("#bt3").click(function(){
        $.ajax({
            url: '/schema',
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify({obj: obj}),
            success: function(res){
            console.log(res);
            }
        });
    })
});
  