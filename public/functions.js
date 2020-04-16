const checkBox = function(key1){
    if($('#'+ key1 + ':checked').val()){
      return true;
    }
    else{
      return false;
    }
  }
  const inputFromCheckBox = function(obj){
    for (let [key, value] of Object.entries(obj)){
      for(let[key1, value1] of Object.entries(obj[key])){
        val = checkBox(key1);
        value1[1] = val;
      }
    }
  }
  const columnListInAccordion = function(data){
    for (let [key, value] of Object.entries(data)){
      myAccord.find("button").text(key);
      myAccord.find("button").attr("data-target", "#"+key);
      myAccord.find(".collapse").attr("id", key);
      myFrom.attr("id", key);
      myFrom.text(key);
      $("#from").append(myFrom.clone());
      value.forEach(function(val){
        for(let[key1, value1] of Object.entries(val)){
          myCheck.find('input').attr("id", key1);
          myCheck.find('label').text(' -' + key1);
          myAccord.find(".card-body").append(myCheck.clone());
        }
      })
      $("#accordion").append(myAccord.clone());
      myAccord.find(".card-body").text("");
    }
  }
  
  const copyOfDataWithArray = function(data){
    var newObj = {};
    for (let [key, value] of Object.entries(data)){
      var tempObj = {};
      value.forEach(function(val){
        for(let[key1, value1] of Object.entries(val)){  
          var newVal = Array(3); 
          newVal[0] = value1;
          tempObj[key1] = newVal;
        }
      })
      newObj[key] = tempObj;
    }
    return newObj;
  }
  const getColumnArray = function(arr, obj){
    str = "";
    for (let [key, value] of Object.entries(obj)){
      for(let[key1, value1] of Object.entries(obj[key])){
        if(value1[1]==true){
            str = key + "." + key1;
            arr.push(str);
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
    newObj = copyOfDataWithArray(data);
    inputFromCheckBox(newObj);
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
    data[from].forEach(function(val){
      for (let [key, value] of Object.entries(val)){
        myWhere.text(key);
        myWhere.attr("href", `javascript:whereConditions('${key}', '${value}');`)
        $(".dropdown-menu").append(myWhere.clone());
      }
    })
  }
  const whereConditions = function(key1, value1){
    if(value1=='boolean'){$("#boolDiv").show(); $("#boolLab").text(key1);}
    else if(value1 == "text"){
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
      $("#where2"+current).text(val);
    } 
  const whereInDel = function(){
      val = $("#whereIn").val();
      val = val.substring(0, val.length - 1);
      $("#whereIn").val(val);
      $("#where2"+current).text(val);
    } 

const getQueryArr = function(count){
    arr = [];
    for(i=0; i <= count; i++){
      temp = {};
      str1 = $("#from2"+i).text();
      str2 = $("#where2"+i).text();
      temp[str1]=str2;
      arr.push(temp);
    }
   return arr;
}
const remPar = function(str1){
    str2 = "";
    for(j = 0; j < str1.length; j++){
        ch = str1.charAt(j);
        if(ch == '(' ||  ch == ')'){}
        else{
            str2 += ch;
        }
    }
    return str2;
}
const regEX =  /\s*(?:AND|$)\s*|\s*(?:OR|$)\s*/
const getSingleRequestArr = function(arr){
    newArr = [];
    for(i = 0; i < arr.length; i++){
        tempObj = {};
        temp = Object.entries(arr[i])[0];
        str1 = temp[0];
        str2 = temp[1];
        str2 = remPar(str2);
        tempArr = str2.split(regEX); 
        tempObj[str1] = tempArr;
        newArr.push(tempObj);
    }
    return newArr;
}
const ajaxSingleReq = function(arr){
  lic = 0;
  tempArr=[];
  str = "SELECT COUNT(*) ";
  arr.forEach(function(elem){
    temp = Object.entries(elem)[0];
    str1 = "FROM " + temp[0] + " WHERE ";
    newArr = temp[1];
    newArr.forEach(function(elem1){
      req1 = str1 + elem1;
      req = {request: str + req1 + ';'};
      tempArr.push(req1)
      console.log(req1);
      $.ajax({
        url: '/results',
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify({obj: req}),
        success: function(res){
          var myl =  `<li class="list-group-item d-flex justify-content-between align-items-center" >${tempArr[lic]} <span class="badge badge-primary badge-pill">${res[0].count}</span></li>`;
          $("#list").append(myl);
          lic++;
        }
      });
    })
  })
}
function CreateTableFromJSON(myTable) {
  var col = [];
  for (var i = 0; i < myTable.length; i++) {
    for (var key in myTable[i]) {
      if (col.indexOf(key) === -1) {
      col.push(key);
      }
    }
  }
  var table = document.createElement("table");
  var tr = table.insertRow(-1); 
  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th");  
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  for (var i = 0; i < myTable.length; i++) {
    tr = table.insertRow(-1);
    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = myTable[i][col[j]];
    }
  }
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

const queryFromAll = function(arr){
  newStr = "";
  for(i=0; i<arr.length; i++){
    temp = Object.entries(arr[i])[0];
    str0 = temp[0];
    str1 = temp[1];
    str2 = remPar(str1);
    tempArr = str2.split(regEX);
    for(j=0; j<tempArr.length; j++){
      str3=tempArr[j];
      if(str3 == '' || str3 == ' ' || str3 == '   '){}
      else{
        arr2=str3.split(' ', 1);
        str3 = str0+'.'+arr2[0];
        str1 = str1.replace(arr2[0], str3);
      }
    }
    newStr=newStr+str1+' ';
  }
  return newStr.substring(0, newStr.length - 1);
}
const createTable = function(str){
  req = {request: str};
  $.ajax({
    url: '/results',
    method: "POST",
    contentType: 'application/json',
    data: JSON.stringify({obj: req}),
    success: function(myTable){
      CreateTableFromJSON(myTable);
    }
});
}
//strJoin =  "FROM individuals JOIN medical_history ON individuals.subject_id = medical_history.subject_id JOIN biological_measurements ON medical_history.subject_id = biological_measurements.subject_id JOIN demographics ON biological_measurements.subject_id = demographics.subject_id JOIN psychiatric_disorders ON demographics.subject_id = psychiatric_disorders.subject_id JOIN project_enrollments ON psychiatric_disorders.subject_id = project_enrollments.individual_id JOIN projects ON project_enrollments.project_id = projects.id JOIN category_individuals ON individuals.subject_id = category_individuals.subject_id JOIN categories ON category_individuals.category_id = categories.id JOIN category_markers ON categories.id = category_markers.category_id JOIN markers ON category_markers.marker_name = markers_marker_name JOIN blood_samples ON individuals.subject_id = blood_samples.subject.id ";
//strSelect = "SELECT individuals.sex, medical_history.allergies, individuals.name, individuals.is_genotyped, biological_measurements.weight_kg "
strJoin =  " FROM individuals JOIN medical_history ON individuals.subject_id = medical_history.subject_id JOIN biological_measurements ON medical_history.subject_id = biological_measurements.subject_id JOIN demographics ON biological_measurements.subject_id = demographics.subject_id JOIN psychiatric_disorders ON demographics.subject_id = psychiatric_disorders.subject_id "
//strSelect = "SELECT individuals.sex, individuals.name, individuals.is_genotyped "
//strJoin =  "FROM individuals JOIN category_individuals ON individuals.subject_id = category_individuals.subject_id " 

strWhere = "WHERE individuals.sex = 'M' AND individuals.is_genotyped = true AND biological_measurements.weight_kg  > 100;"

