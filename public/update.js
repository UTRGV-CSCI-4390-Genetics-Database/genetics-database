$(document).ready(function(){
    $('#confirmId').on('click', function(){
        console.log($("#inputId").val());
        str = 'SELECT (*)'+strJoin+' WHERE '+str+';';
        getSubjectData(str);
      /*var result = $('#builder').queryBuilder('getSQL', 'question_mark');
      if (result.sql.length) {
        arr=JSON.stringify(result.params, null, 2)
        arr=JSON.parse(arr);
        str = trueSQL(result.sql, arr, colTypeObj);
        $("#btexcel").show();
        queryStr='SELECT '+nameOfColumns+strJoin+' WHERE '+str+';';
        createTable(queryStr);
      }*/
    });  
});