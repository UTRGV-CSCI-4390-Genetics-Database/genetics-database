$(document).ready(function(){
    var Id = 0;
    $('.temp').hide();
    $("#listElem").hide();
    $("#update").prop('disabled', true);
    $("#btnSub").click(function(){
      $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
      $("#btnMar").prop('disabled', true); $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
      $("#alert").empty();
      Id = $("#valSub").val();
      rest = 'sub';
      col="subject_id"
      obj=restricton(data, rest);
      deleteRecord(obj, col, Id)
    });
    $("#btnPro").click(function(){
      $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
      $("#btnMar").prop('disabled', true);  $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
      $("#alert").empty();
      Id = $("#valPro").val();
      rest = 'pro';
      col="project_id"
      obj=restricton(data, rest);
      deleteRecord(obj, col, Id)
    });
    $("#btnCat").click(function(){
      $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
      $("#btnMar").prop('disabled', true);  $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
      $("#alert").empty();
      Id = $("#valCat").val();
      rest = 'cat';
      col="category_id"
      obj=restricton(data, rest);
      deleteRecord(obj, col, Id)
    });
    $("#btnMar").click(function(){
      $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
      $("#btnMar").prop('disabled', true);  $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
      $("#alert").empty();
      Id = $("#valMar").val();
      rest = 'mar';
      col="marker_name";
      Id=`'${Id}'`
      obj=restricton(data, rest);
      deleteRecord(obj, col, Id)
    });
    $("#btnBio").click(function(){
        $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
        $("#btnMar").prop('disabled', true);  $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
        $("#alert").empty();
        Id = $("#valBio").val();
        rest = 'bio';
        col="biological_measurements_id";
        obj=restricton(data, rest);
        deleteRecord(obj, col, Id)
      });
      $("#btnBlo").click(function(){
        $("#btnSub").prop('disabled', true); $("#btnCat").prop('disabled', true); $("#btnPro").prop('disabled', true); 
        $("#btnMar").prop('disabled', true); $("#btnBlo").prop('disabled', true); $("#btnBio").prop('disabled', true); 
        $("#alert").empty();
        Id = $("#valBlo").val();
        rest = 'blo';
        col="blood_sample_id"
        Id=`'${Id}'`
        obj=restricton(data, rest);
        deleteRecord(obj, col, Id)
      }); 
      $('#reset').click(function(){
        location.reload();
      })
});
  