$.get('../Descriptions/NVP.txt', function(data){
    console.log(data);
    document.getElementById("description_display").innerHTML=data;
})
calc=()=>{
    if(document.getElementById("Desc")){
        document.getElementById("Desc").remove();
    }
    let cash_flow=[];
    let final_cash_flow=[];
    let discount_rate=+document.getElementById("discount_rate").value;
    let initial_cost=+document.getElementById("initial_rate").value;
    for(let i=0;i<document.getElementsByClassName("year").length;i++){
        cash_flow.push(+document.getElementsByClassName("year")[i].value)
    }
    console.log(cash_flow)
   for(let i=1;i<=cash_flow.length;i++){
       let x=cash_flow[i-1]/Math.pow(1+(discount_rate/100),i);
       final_cash_flow.push(x);
   }
   var sum = final_cash_flow.reduce(function(a, b){
    return a + b;
}, 0);
   console.log(sum)

   document.getElementById("net_present_value").innerHTML= numberwithcommas(sum);
   document.getElementById("expected_cash_flow").innerHTML=numberwithcommas(sum-initial_cost);
}

function numberwithcommas(x){
    x=+x;
    x=x.toFixed(2)
    x=x.toString();
    var afterPoint = '';
    if(x.indexOf('.') > 0)
       afterPoint = x.substring(x.indexOf('.'),x.length);
    x = Math.floor(x);
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
}