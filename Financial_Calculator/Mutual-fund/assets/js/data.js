var viz=document.getElementById("viz_selection");

function Mutual_Fund_Data(data1,data2){
  console.log(data1,data2);
  var Initial_Investment=data2;
  var Maturity_Investment=data1;
  var Interest=Maturity_Investment-Initial_Investment;
  console.log(Interest);
  var Per_of_Principal_in_Final=0,Per_of_Interest_in_Final=0;

  Per_of_Interest_in_Final= (Interest/Maturity_Investment)*100;
  Per_of_Interest_in_Final=Math.round(Per_of_Interest_in_Final*100)/100;
  Per_of_Principal_in_Final= (Initial_Investment/Maturity_Investment)*100;
  Per_of_Principal_in_Final=Math.round(Per_of_Principal_in_Final*100)/100;
  console.log(Per_of_Interest_in_Final,Per_of_Principal_in_Final);

  var  Pie_Datas=[{"type":"Principal", "amount":Per_of_Principal_in_Final},
  {"type":"Interest", "amount":Per_of_Interest_in_Final}];

  // console.log(Pie_Datas);
  // var value=viz.value;
  // createPie(Pie_Datas,value);

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