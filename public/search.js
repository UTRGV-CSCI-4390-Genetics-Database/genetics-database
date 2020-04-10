const checkBox = function(key1){
    if($('#'+ key1 + ':checked').val()){
      return true;
    }
    else{
      return false;
    }
  }
const checkInput = function(obj){
    for (let [key, value] of Object.entries(obj)){
      for(let[key1, value1] of Object.entries(obj[key])){
          val = checkBox(key1);
          value1[1] = val;
        }
    }
  }
const columnList = function(data){
  for (let [key, value] of Object.entries(data)){
    myAccord.find("button").text(key);
    myAccord.find("button").attr("data-target", "#"+key);
    myAccord.find(".collapse").attr("id", key);
    myFrom.attr("id", key);
    myFrom.text(key);
    $("#from").append(myFrom.clone());
    for(let[key1, value1] of Object.entries(data[key])){
      if(key1 == "subject_id" && key != "individuals"){}
      else {
        if(!(key == "projects" || key == "project_enrollments" || key == "markers")){
          myCheck.find('input').attr("id", key1);
          myCheck.find('label').text(' -' + key1);
          myAccord.find(".card-body").append(myCheck.clone());}
        else{
          myCheckDis.find('input').attr("id", key1);
          myCheckDis.find('label').text(' -' + key1);
          myAccord.find(".card-body").append(myCheckDis.clone());}
        }
      }
    $("#accordion").append(myAccord.clone());
    myAccord.find(".card-body").text("");
  }
}
var newObj = {};
for (let [key, value] of Object.entries(data)){
  var tempObj = {};
  for(let[key1, value1] of Object.entries(data[key])){
    var newVal = Array(3); 
    newVal[0] = value1;
    tempObj[key1] = newVal;
  }
  newObj[key] = tempObj;
}
columnArray = [];
const getColumnArray = function(arr, obj){
    str = "";
    for (let [key, value] of Object.entries(obj)){
      if(!(key == "projects" || key == "project_enrollments" || key == "markers")){
        for(let[key1, value1] of Object.entries(obj[key])){
          if(value1[1]==true){
            if(key1 == "subject_id" && key != "individuals"){}
            else {
              str = key + "." + key1;
              arr.push(str);
            }
          }
        }    
      }
    }
  }

var even = true;
const doEven = function(){
  $("#accordion").show();
  $("#bt1").text("Confirm selection")
};
const doOdd = function(){
  checkInput(newObj);
  columnArray = [];
  getColumnArray(columnArray, newObj);
  $("#bt1").text("Select...")
  str = "";
  for(i = 0; i < columnArray.length; i++){
    str = str + columnArray[i] + ", ";
   }
   str = str.slice(0, str.length -2)
  $ ("#select").val(str);
  $ ("#select2").text(str);
  $("#accordion").hide();
  return str;
};
const whereColList = function(from){
  for (let [key, value] of Object.entries(data[from])){
    if(!(from == "individuals") && key == "subject_id"){}
    else{
      myWhere.text(key);
      myWhere.attr("href", `javascript:whereConditions('${key}', '${value}');`)
      $(".dropdown-menu").append(myWhere.clone());
    }
  }
}
const whereConditions = function(key1, value1){
  if(value1=='boolean'){$("#boolDiv").show(); $("#boolLab").text(key1);}
  else if(value1 == "text" || value1 == "char(1)"){
    if(key1 == "ethnicity" || key1 == "father_ethnicity_1" || key1 == "father_ethnicity_2" || key1 == "father_ethnicity_3" || key1 == "father_ethnicity_4" || key1 == "mother_ethnicity_1" || key1 == "mother_ethnicity_2" ||key1 == "mother_ethnicity_3" ||key1 == "mother_ethnicity_4")
      {$("#ethnicDiv").show(); $("#ethnicLab").text(key1);}
    else if(key1 == "approximate_income"){$("#incomeDiv").show(); $("#incomeLab").text(key1);}
    else if(key1 == "marital_status"){$("#marDiv").show(); $("#marLab").text(key1);}
    else if(key1 == "sex" || key1 == "gender"){$("#sexDiv").show(); $("#sexLab").text(key1);}
    else{$("#textDiv").show(); $("#textLab").text(key1);}
    }
  else if(value1 == "integer" || value1 == "smallint" || value1 == 'bigint')
                          {$("#intDiv").show(); $("#intLab").text(key1); $("#intLabB").text(key1+ " BETWEEN");}
  else if(value1 == "date"){$("#dateDiv").show(); $("#dateLab").text(key1); $("#dateLabB").text(key1 + " BETWEEN");}
  else if(value1 == "real"){$("#realDiv").show(); $("#realLab").text(key1); $("#realLabB").text(key1 + " BETWEEN");}
}
const whereIn = function(str){
    val = $("#whereIn").val();
    val = val + str;
    $("#whereIn").val(val);
    $("#where2"+count).text(val);
    whereArray[count] = val;
   } 
const appendFromWhere = function(str){
  myFromWhere.find("#from2" + count).attr("id", "from2"+ (count + 1));
  myFromWhere.find("#where2" + count).attr("id", "where2"+ (count+1));
  myFromWhere.find("#and0").text(str);
  $("#fromContainer").append(myFromWhere.clone());
}
nameOfColumns = "";
fromArray = [null, null, null, null, null, null, null, null];
whereArray = [null, null, null, null, null, null, null, null];

$(document).ready(function(){
    count = 0;
    from = $("#from").val();
    myCheck = $("#check").clone(); 
    myCheckDis = $("#checkDis").clone(); 
    myAccord = $(".card").clone();
    myFrom = $("#from1").clone();
    myWhere = $("#where1").clone();
    myFromWhere = $(".fromWhere").clone();
    $(".temp").hide(); 
    columnList(data);
    $("#accordion").hide();
    $("#bt1").click(function() {
      if(even) {doEven();} 
      else {nameOfColumns=doOdd();}
      even = !even;
    });
    $("#from").click(function(){from = $("#from").val(); $("#from2"+count).text(from); fromArray[count]=from;});
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
    $("#and1").click(function(){appendFromWhere("AND"); count+= 1; $('#from').prop("disabled", false); $("#whereIn").val("");});
    $("#or1").click(function(){appendFromWhere("OR"); count+= 1; $('#from').prop("disabled", false); $("#whereIn").val("");});
    $("#bt").click(function(){
      console.log(nameOfColumns);
      console.log(fromArray[count]);
      console.log(whereArray)
   });
   $("#b").click(function(){
    str = "SELECT gender, is_genotyped FROM " + fromArray[0] + " WHERE " + whereArray[0];
    console.log(str)
    $('#in').val(str);
    $('#form').submit();
  });
  $('#run').on('click', function() {
    $.ajax({
        url: '/results',
        contentType: 'application/json',
        success: function(response) {
          console.log(response);
        }
    });
  });  
});