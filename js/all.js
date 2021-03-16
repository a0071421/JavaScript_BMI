var resultBMI = "" ; // BMI結果



var data =  JSON.parse(localStorage.getItem("bmiList")) || [];
var list = document.querySelector(".list");
var resultBtn = document.querySelector(".resultBtn");
var refresh = document.querySelector(".refresh");
var height = document.getElementById("Height");
var weight = document.getElementById("Weight");
var cleanBtn = document.querySelector(".cleanBtn");
var deleteBtn = document.querySelector(".deleteBtn");


var bmiStatus = {
  ideal : {
    name : '理想',
    class : 'ideal'
  },

  underweight : {
    name : '過輕',
    class : 'underweight'
  },

   
  overweight : {
    name : '過重',
    class : 'overweight'
  },

  s_overweight : {
    name : '輕度肥胖',
    class : 's_overweight'
  },

  m_overweight : {
    name : '中度肥胖',
    class : 'm_overweight'
  },

  h_overweight : {
    name : '重度肥胖',
    class : 'h_overweight'
  }
}

ShowList();



// 加入監聽
resultBtn.addEventListener('click',BMI, false);
refresh.addEventListener('click', Refresh, false );
cleanBtn.addEventListener('click', CleanRecord, false);
list.addEventListener('click', DeleteRecord, false);


// 取得身高、體重，計算BMI
function BMI(e){
  e.preventDefault();
  var correct = false ;
  if( ! DataCheck( correct ) )
    return;
  var h = parseInt(height.value);
  var w = parseInt(weight.value);
  resultBMI =   ( w / Math.pow(( h / 100 ), 2 ) ).toFixed(2);
  var bmiRecord = {
    status : Status(),
    bmi : resultBMI,
    weight : w,
    height : h,
    time : GetNowTime()
  };
 
  data.push(bmiRecord);
  localStorage.setItem("bmiList", JSON.stringify(data));
  ShowList();
  ChangeBtn( bmiRecord.status );
  
} // BMI()


// 判斷BMI屬於何種體位
function Status(){
  if( resultBMI >= 18.5 && resultBMI < 24 )
    return 'ideal' ;

  else if( resultBMI < 18.5 )
    return 'underweight' ;

  else if( resultBMI >= 24 && resultBMI < 27 )
    return 'overweight';

  else if( resultBMI >= 27 && resultBMI < 30 )
    return 's_overweight';

  else if( resultBMI >= 30 && resultBMI < 35 )
    return 'm_overweight';

  else // resultBMI >= 35
    return 'h_overweight';

  

} // Status()

// 判斷身高、體重資料正確性
function DataCheck(){

    if(  height.value == "" ||  weight.value == "" ) {
      alert('請輸入身高、體重!!!');
      return false;
    } // if

    if ( height.value <= 50 || height.value >= 300 ){
      alert('修但幾勒，有人有這種身高??!!!');
      return false
    } // if

    if ( weight.value <= 0 || weight.value >= 800 ){
      alert('修但幾勒，有人有這種體重??!!!');
      return false
    } // if

  
    return true;

} // DataCheck


function ShowList(){
  if( data.length != 0 )
    document.querySelector(".clean").style.display = "block";
  else  document.querySelector(".clean").style.display = "none";
  
  var li = "";
  
  for( var i = 0 ; i < data.length ; i++ ) {
    var status = data[i].status;
    li += '<li><div class="lightbar ' + bmiStatus[status].class + '"></div>' + 
       '<span class="status">' + bmiStatus[status].name + '</span>' + 
       '<h3 class="bmi_label">BMI<span class="bmi_value"> ' + data[i].bmi +  '</span></h2>' + 
       '<h3 class="weight">Weight<span class="weight_value"> ' +  data[i].weight + "kg" + '</span></h3>' + 
       '<h3 class="height">Height<span class="height_value"> ' + data[i].height + "cm" +  '</span></h3>' +
       '<span class="time">' + data[i].time + '</span><a class="deleteBtn" href="#" data-index="' +
       i + '">刪除</a></li>' ;
    
  } // for
  
  
  list.innerHTML = li;
  //LightBar();
} // ShowList()


/*
// 設定每個record代表顏色
function LightBar(){
  var lightbar = document.querySelectorAll(".lightbar");
  for( var i = 0 ; i < lightbar.length ; i ++ ) {
    switch( data[i].status ){
        case "理想" :
          lightbar[i].classList.add("ideal");
          break;
        
        case "過輕" :
          lightbar[i].classList.add("underweight");
          break;
        
        case "過重" :
          lightbar[i].classList.add("overweight");
          break;

        case "輕度肥胖" :
          lightbar[i].classList.add("s_overweight");
          break;

        case "中度肥胖" :
          lightbar[i].classList.add("m_overweight");
          break;

        case "重度肥胖" :
          lightbar[i].classList.add("h_overweight");
          break;

        default :
          break;

    } // switch()
  } // for
} // LightBar()


*/

// 更新結果按紐

function ChangeBtn( status ){
  resultBtn.style.display = "none";
  document.querySelector('.resultContainer').style.display = "flex";
  
  // 更新結果顏色
  var resultContent = document.querySelector('.resultContent');
  var bmiLabel = document.querySelector('.resultCircle span:nth-child(2)');
  var resultSituation = document.querySelector('.resultContainer > span');
  var refreshBtn = document.querySelector('.refresh');
  var bmiStatusObj = bmiStatus[status];

 

  switch( bmiStatusObj.class ){
      case "ideal" :
        resultContent.style.borderColor = "#86D73F";
        resultContent.style.color = "#86D73F";
        bmiLabel.style.color = "#86D73F";
        resultSituation.style.color = "#86D73F";
        refreshBtn.style.backgroundColor = "#86D73F";
        break;
      
      case "underweight" :
        resultContent.style.borderColor = "#31BAF9";
        resultContent.style.color = "#31BAF9";
        bmiLabel.style.color = "#31BAF9";
        resultSituation.style.color = "#31BAF9";
        refreshBtn.style.backgroundColor = "#31BAF9";
        break;
      
      case "overweight" :
        resultContent.style.borderColor = "#FF982D";
        resultContent.style.color = "#FF982D";
        bmiLabel.style.color = "#FF982D";
        resultSituation.style.color = "#FF982D";
        refreshBtn.style.backgroundColor = "#FF982D";
        break;

      case "s_overweight" :
        resultContent.style.borderColor = "#FF6C03";
        resultContent.style.color = "#FF6C03";
        bmiLabel.style.color = "#FF6C03";
        resultSituation.style.color = "#FF6C03";
        refreshBtn.style.backgroundColor = "#FF6C03";
        break;

      case "m_overweight" :
        resultContent.style.borderColor = "#FF6C03";
        resultContent.style.color = "#FF6C03";
        bmiLabel.style.color = "#FF6C03";
        resultSituation.style.color = "#FF6C03";
        refreshBtn.style.backgroundColor = "#FF6C03";
        break;

      case "h_overweight" :
        resultContent.style.borderColor = "#FF1200";
        resultContent.style.color = "#FF1200";
        bmiLabel.style.color = "#FF1200";
        resultSituation.style.color = "#FF1200";
        refreshBtn.style.backgroundColor = "#FF1200";
        break;

      default :
        break;

  } // switch()
 
  resultContent.textContent = resultBMI;
  resultSituation.textContent = bmiStatusObj.name;
} // ChangeBtn() 

function Refresh(e){
  e.preventDefault();
  resultBtn.style.display = "block";
  document.querySelector('.resultContainer').style.display = "none";
  height.value = "";
  weight.value = "" ;
} // Refresh()


function GetNowTime(){
    var date = new Date(); 
    var month = date.getMonth()+1; 
    var day = date.getDate(); 
   
    var output = (day<10 ? '0' : '') + day + "-"  + 
    (month<10 ? '0' : '') + month + '-' + date.getFullYear() ;
    return output;
} // GetNowTime()


function CleanRecord(e){
  e.preventDefault();
  data = [];
  list.innerHTML = "";
  localStorage.setItem("bmiList", JSON.stringify(data));
  document.querySelector(".clean").style.display = "none";
} // CleanRecord()

function DeleteRecord(e){
  if( e.target.nodeName == "A") {
    e.preventDefault();
    data.splice(e.target.dataset.index, 1 );
    localStorage.setItem("bmiList", JSON.stringify(data));
    ShowList();
  } // if
} // DeleteRecord