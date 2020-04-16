columnArray = [];
nameOfColumns = "";
$(document).ready(function(){
    count = 0;
    from = $("#from").val();
    myCheck = $("#check").clone(); 
    myCheckDis = $("#checkDis").clone(); 
    myAccord = $(".card").clone();
    myFrom = $("#from1").clone();
    myWhere = $("#where1").clone();
    //myFromWhere = $(".fromWhere").clone(true);

    //listElem = $(".listElem").clone(true);
    $(".temp").hide(); 
    columnListInAccordion(data);
    $("#accordion").hide();
    $("#bt1").click(function() {
      if(even) {doEven();} 
      else {nameOfColumns=doOdd();}
      even = !even;
    });
    $("#from").click(function(){from = $("#from").val(); $("#from2"+count).text(from);});
    $('#where').on('show.bs.dropdown', function () {
      if(from == "Select table..."){
        alert("You have to choose the table");
      }
      else{
        $(".dropdown-menu").empty();
        whereColList(from);
        $('#from').prop("disabled", true);
      }
    })
    $( "#marIn" ).blur(function(){str = $("#marLab").text() + " = " + `'${$("#marIn").val()}'`; whereIn(str); $("#marDiv").hide();});
    $( "#sexIn" ).blur(function(){str = $("#sexLab").text() + " = " + `'${$("#sexIn").val()}'`; whereIn(str); $("#sexDiv").hide();});
    $( "#ethnicIn" ).blur(function(){str = $("#ethnicLab").text() + " = " + `'${$("#ethnicIn").val()}'`; whereIn(str); $("#ethnicDiv").hide();});
    $( "#incomeIn" ).blur(function(){str = $("#incomeLab").text() + " = " + `'${$("#incomeIn").val()}'`; whereIn(str); $("#incomeDiv").hide();});
    $( "#boolIn" ).blur(function(){str = $("#boolLab").text() + " = " + $("#boolIn").val(); whereIn(str); $("#boolDiv").hide();});
    $( "#textIn2" ).blur(function(){str1 = $("#textLab").text() + " " + $("#textIn1").val() + " ";
      str2 = `'${$("#textIn2").val()}'`; str = str1 + str2; whereIn(str); $("#textDiv").hide();});
    $( "#dateIn2" ).blur(function(){str1 = $("#dateLab").text() + " " + $("#dateIn1").val() + " ";
      str2 = `'${$("#dateIn2").val()}'`; str = str1 + str2; whereIn(str); $("#dateDiv").hide();});
    $( "#intIn2" ).blur(function(){str1 = $("#intLab").text() + " " + $("#intIn1").val() + " ";
      str2 = $("#intIn2").val(); str = str1 + str2; whereIn(str); $("#intDiv").hide();});
    $( "#realIn2" ).blur(function(){str1 = $("#realLab").text() + " " + $("#realIn1").val() + " ";
      str2 = $("#realIn2").val(); str = str1 + str2; whereIn(str); $("#realDiv").hide();});
    $( "#dateIn1" ).blur(function(){
      if($("#dateIn1").val()=="between"){$("#dateDiv").hide(); $("#dateDivB").show();}});
    $( "#intIn1" ).blur(function(){
      if($("#intIn1").val()=="between"){$("#intDiv").hide(); $("#intDivB").show();}});
    $( "#realIn1" ).blur(function(){
      if($("#realIn1").val()=="between"){$("#realDiv").hide(); $("#realDivB").show();}}); 
    $( "#dateIn2B" ).blur(function(){str1 = $("#dateLabB").text() + " " + `'${$("#dateIn1B").val()}'`;
      str2 = " AND " + `'${$("#dateIn2B").val()}'`; str = str1 + str2; whereIn(str); $("#dateDivB").hide();});
    $( "#intIn2B" ).blur(function(){str1 = $("#intLabB").text() + " " + `'${$("#intIn1B").val()}'`;
      str2 = " AND " + `'${$("#intIn2B").val()}'`; str = str1 + str2; whereIn(str); $("#intDivB").hide();});
    $( "#realIn2B" ).blur(function(){str1 = $("#realLabB").text() + " " + `'${$("#realIn1B").val()}'`;
      str2 = " AND " + `'${$("#realIn2B").val()}'`; str = str1 + str2; whereIn(str); $("#realDivB").hide();});
    $("#par1").click(function(){whereIn("(");});
    $("#par2").click(function(){whereIn(")");});
    $("#and").click(function(){whereIn(" AND ");});
    $("#or").click(function(){whereIn(" OR ");});
    $("#del").click(function(){whereInDel();});
    $("#and1").click(function(){appendFromWhere(" AND"); count+= 1; $('#from').prop("disabled", false); $("#whereIn").val("");});
    $("#or1").click(function(){appendFromWhere(" OR"); count+= 1; $('#from').prop("disabled", false); $("#whereIn").val("");});
    $("#bt").click(function(){
   });
   $("#b").click(function(){

  });
  const zwrot = function(){
    console.log( $(this).attr('id'))
  }
  $(".fon").on("click", function(){
      console.log("cos tam")
      $(this).hide();
    });
  $('#run').on('click', function(){
    qArr = getQueryArr(count);
    singleRequstArr = getSingleRequestArr(qArr);
    $("#list").show();
    ajaxSingleReq(singleRequstArr);
  });  
  $("#bt").click(function(){
    console.log("klik on button")
    createTable(strRequest);
  });

  $('.font').click(function() { 
    //var id = $(this).attr('id');
    console.log("jestem")
});


});