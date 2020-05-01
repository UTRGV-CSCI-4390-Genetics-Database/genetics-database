$(document).ready(function(){
    var Id = 0;
    var myObj={};
    $('.temp').hide();
    $('#card').hide();
    $('#listElem').hide();
    $("#update").prop('disabled', true);
    $("#btnSub").click(function(){
      $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
      $("#btnMar").prop('disabled', true); $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
      $("#alert").empty();
      Id = $("#valSub").val();
      str2 = "subject_id = " +Id;
      str = "SELECT subject_id FROM individuals WHERE "+str2+";"
      rest = 'sub2';
      checkSubjectId2(str, str2, rest);
    });
    $("#btnPro").click(function(){
      $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
      $("#btnMar").prop('disabled', true);  $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
      $("#alert").empty();
      Id = $("#valPro").val();
      str2 = "project_id = " + Id;
      str = "SELECT project_id FROM projects WHERE "+str2+";"
      rest = 'pro';
      checkSubjectId2(str, str2, rest);
    });
    $("#btnCat").click(function(){
      $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
      $("#btnMar").prop('disabled', true);  $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
      $("#alert").empty();
      Id = $("#valCat").val();
      str2 = "category_id = " + Id;
      str = "SELECT category_id FROM categories WHERE "+str2+";"
      rest = 'cat';
      checkSubjectId2(str, str2, rest);
    });
    $("#btnMar").click(function(){
      $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
      $("#btnMar").prop('disabled', true);  $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
      $("#alert").empty();
      Id = $("#valMar").val();
      str2 = `marker_name = '${Id}'`;
      str = "SELECT marker_name FROM markers WHERE "+str2+";"
      rest = 'mar';
      checkSubjectId2(str, str2, rest);
    });
    $("#btnBio").click(function(){
        $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
        $("#btnMar").prop('disabled', true);  $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
        $("#alert").empty();
        Id = $("#valBio").val();
        str2 = `biological_measurements_id = ${Id}`;
        str = "SELECT biological_measurements_id FROM biological_measurements WHERE "+str2+";"
        rest = 'bio';
        checkSubjectId2(str, str2, rest);
      });
      $("#btnBlo").click(function(){
        $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
        $("#btnMar").prop('disabled', true); $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
        $("#alert").empty();
        Id = $("#valBlo").val();
        str2 = `blood_sample_id = '${Id}'`;
        str = "SELECT blood_sample_id FROM blood_samples WHERE "+str2+";"
        rest = 'blo';
        checkSubjectId2(str, str2, rest);
      }); 
    $('#update').click(function(){
        obj=getInput();
        obj = appendId(obj, Id, rest);
        insertToTable(obj);
    })
    $('#reset').click(function(){
      location.reload();
    })
});
  