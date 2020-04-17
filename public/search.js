columnArray = [];
nameOfColumns = "";
$(document).ready(function(){
    count = 0;
    current = 0;
    from = $("#from").val();
    myCheck = $("#check").clone(); 
    myCheckDis = $("#checkDis").clone(); 
    myAccord = $(".card").clone();
    myFrom = $("#from1").clone();
    myWhere = $("#where1").clone();
    $(".temp").hide(); 
    columnListInAccordion(data);
    $("#accordion").hide();
    $("#bt1").click(function() {
      if(even) {doEven();} 
      else {nameOfColumns=doOdd();}
      even = !even;
    });
    $("#from").blur(function(){
      from = $("#from").val(); 
      if(from == "Select table..."){
        alert("You have to choose the table");
      }
      else{
        $('#from').prop("disabled", true);
        $("#from2"+count).text(from);
      }
    });
    $('#where').on('show.bs.dropdown', function(){
      if(from == "Select table..."){
        alert("You have to choose the table");
      }
      else{
        $(".dropdown-menu").empty();
        whereColList(from);
        $('#from').prop("disabled", true);
      }
    })
    $( "#sexIn" ).blur(function(){str = $("#sexLab").text() + " = " + `'${$("#sexIn").val()}'`; whereIn(str); $("#sexDiv").hide();});
    $( "#ethnicIn" ).blur(function(){
      str1 = $("#ethnicLab").text() +" "+ $("#intIne").val() + " ";
      str2 = $("#ethnicIn").val(); str=str1+str2; whereIn(str); $("#ethnicDiv").hide();});
    $( "#ethCaIn" ).blur(function(){
      str1 = $("#ethCaLab").text() +" "+ $("#intInec").val() + " ";
      str2 = $("#ethCaIn").val(); str=str1+str2; whereIn(str); $("#ethCaDiv").hide();}); 
    $( "#incomeIn" ).blur(function(){
      str1 = $("#incomeLab").text() + " " + $("#intIni").val() + " ";
      str2 = $("#incomeIn").val(); str=str1+str2; whereIn(str); $("#incomeDiv").hide();});
    $( "#raceIn" ).blur(function(){
      str1 = $("#raceLab").text() + " " + $("#intInr").val() + " ";
      str2 = $("#raceIn").val(); str=str1+str2; whereIn(str); $("#raceDiv").hide();});
    $( "#marIn" ).blur(function(){
      str1 = $("#marLab").text() + " " + $("#intInmar").val() + " ";
      str2 = $("#marIn").val(); str=str1+str2; whereIn(str); $("#marDiv").hide();});
    $( "#mildIn" ).blur(function(){
      str1 = $("#mildLab").text() + " " + $("#intInmd").val() + " ";
      str2 = $("#mildIn").val(); str=str1+str2; whereIn(str); $("#mildDiv").hide();});
    $( "#milrIn" ).blur(function(){
      str1 = $("#milrLab").text() + " " + $("#intInmr").val() + " ";
      str2 = $("#milrIn").val(); str=str1+str2; whereIn(str); $("#milrDiv").hide();}); 
    $( "#relIn" ).blur(function(){
      str1 = $("#relLab").text() + " " + $("#intInrl").val() + " ";
      str2 = $("#relIn").val(); str=str1+str2; whereIn(str); $("#relDiv").hide();}); 
    $( "#cigIn" ).blur(function(){
      str1 = $("#cigLab").text() + " " + $("#intIncg").val() + " ";
      str2 = $("#cigIn").val(); str=str1+str2; whereIn(str); $("#cigDiv").hide();});
    $( "#schIn" ).blur(function(){
      str1 = $("#schLab").text() + " " + $("#intInsh").val() + " ";
      str2 = $("#schIn").val(); str=str1+str2; whereIn(str); $("#schDiv").hide();});
    $( "#boolIn" ).blur(function(){str = $("#boolLab").text() + " = " + $("#boolIn").val(); whereIn(str); $("#boolDiv").hide();});
    $( "#textIn2" ).blur(function(){str1 = $("#textLab").text() + " " + $("#textIn1").val() + " ";
      str2 = `'${$("#textIn2").val()}'`; str = str1 + str2; whereIn(str); $("#textDiv").hide();});
    $( "#dateIn2" ).blur(function(){str1 = $("#dateLab").text() + " " + $("#dateIn1").val() + " ";
      str2 = `'${$("#dateIn2").val()}'`; str = str1 + str2; whereIn(str); $("#dateDiv").hide();});
    $( "#intIn2" ).blur(function(){
      str1 = $("#intLab").text() + " " + $("#intIn1").val() + " ";
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
    $("#moreTable").click(function(){
      $('#from').prop("disabled", false); 
      var szlag = $('#szlag'+count).clone(true);
      szlag.find("#from2"+count).text('');
      szlag.find("#where2"+count).text('');
      count++; 
      current = count;
      szlag.find("#from2"+(count-1)).attr('id',"from2"+count);
      szlag.find("#where2"+(count-1)).attr('id',"where2"+count);
      szlag.attr('id',"szlag"+count);
      $("#fromContainer").append(szlag.clone(true));
      $("#whereIn").val('');
    });
    $('a.font').click(function() { 
      var val = $(this).attr('id');
      current = val.substring(6, val.length);
      str =  $("#where2"+current).text();
      $("#whereIn").val('');
      whereIn(str);
    });
    $('#run').on('click', function(){
      var qArr=[];
      qArr = getQueryArr(count);
      singleRequstArr = getSingleRequestArr(qArr);
      $("#list").show();
       $("#btexcel").show();
      $("#list").empty();
      arrAllSing = arrOfAllsigleReq(singleRequstArr);
      ajaxSingleReq(arrAllSing);
      var fromAll = queryFromAll(qArr);
      strSelect=$('#select').val();
      queryStr='SELECT '+strSelect+strJoin+' WHERE '+fromAll+';';
      createTable(queryStr);
      //console.log(queryStr);
    });  
    $("#excel").click(function(){
      $("#showData").table2excel({
        exclude:".noExl",
        name:"Worksheet Name",
        filename:"NewTable",
        fileext:".xls" 
      });
    })
});