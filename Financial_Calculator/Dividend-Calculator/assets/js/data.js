var viz=document.getElementById("viz_selection");

function Dividend_Data(data1,data2){
  console.log(data1,data2);
  var Per_of_Dividend_in_share;
  Per_of_Dividend_in_share=data1;
  var Per_of_Share=100-Per_of_Dividend_in_share;

  var  Pie_Datas=[{"type":"Share/Year", "amount":Per_of_Share},
  {"type":"Dividend/Year", "amount":Per_of_Dividend_in_share}];

  $(document).ready(function(){
    var value=viz.value;
    if($("#viz_selection option:selected") && value=="Pie Chart"){
      createPie(Pie_Datas,value);
    }
  });

  document.getElementById("viz_selection").onchange =function(){
    var value=viz.value;
    if(value=="Pie Chart"){
      document.getElementById("Pie Chart").selected="true";
      createPie(Pie_Datas,value);
    }
  };
}

function Dividend_Data_2(data1,data2,data3){
  console.log(data1,data2,data3);
  var money=data1;
  var final_bal=data2;
  var profits=data3;

  var Per_of_money_in_finalbal=(money/final_bal)*100;
  Per_of_money_in_finalbal=Math.round(Per_of_money_in_finalbal*100)/100;

  var Per_of_profits_in_finalbal=(profits/final_bal)*100;
  Per_of_profits_in_finalbal=Math.round(Per_of_profits_in_finalbal*100)/100;

  var  Pie_Datas=[{"type":"Initial Amount", "amount":Per_of_money_in_finalbal},
  {"type":"Profits", "amount":Per_of_profits_in_finalbal}];

  $(document).ready(function(){
    var value=viz.value;
    if($("#viz_selection option:selected") && value=="Pie Chart"){
      createPie(Pie_Datas,value);
    }
  });

  document.getElementById("viz_selection").onchange =function(){
    var value=viz.value;
    if(value=="Pie Chart"){
      document.getElementById("Pie Chart").selected="true";
      createPie(Pie_Datas,value);
    }
  };

}