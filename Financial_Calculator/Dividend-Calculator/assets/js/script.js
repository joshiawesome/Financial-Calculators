$.get('../Descriptions/Dividend.txt', function(data){
    console.log(data);
    document.getElementById("description_display").innerHTML=data;
})
var flags=10;
calc=()=>{
    if(document.getElementById("Desc")){
        document.getElementById("Desc").remove();
    }
    // flags++;
    // console.log(flags);
    // if(flags==1){
    // document.getElementById("show_description").style.display="none";
    // }
   let share_price=+document.getElementById("share_price").value;
   let dividend_yield=+document.getElementById("dividend_yield").value;
   let adps=+document.getElementById("adps").value;
   var Dividend_data=0,Invest_Data=0;
   var flag=0;
   if(adps===0){
       let x=(share_price*dividend_yield)/100;
       document.getElementById("adps").value=x
       Dividend_data= document.getElementById("dividend_yield").value;
       console.log(Dividend_data);
   }
   else if(dividend_yield===0){
    let x=((adps/share_price)*100)
    document.getElementById("dividend_yield").value=x
    Dividend_data=x;
    console.log(Dividend_data);
   }
   else if(share_price===0){
       let x=(adps/dividend_yield)*100;
       document.getElementById("share_price").value=x
       Dividend_data= document.getElementById("dividend_yield").value;
       console.log(Dividend_data);
   }
   document.getElementById('visualization').style.display = "block";
   console.log(Dividend_data);
   Dividend_Data(Dividend_data,0);
   
}

cf=()=>{
    if(document.getElementById("Compunding_frequency").value!=="never"){
        document.getElementById("com_freq_one").style.display="block";
        document.getElementById("com_freq_two").style.display="block";
        document.getElementsByClassName("btn").style.display="none"
    }
    else{
        document.getElementById("com_freq_one").style.display="none";
        document.getElementById("com_freq_two").style.display="none";
        
    }
}



heelo=()=>{

    if(document.getElementById("Desc")){
        document.getElementById("Desc").remove();
    }
    let x__=+document.getElementById("dividend_yield").value
    let c_f=document.getElementById("Compunding_frequency").value;
   let freq=calc_freq[c_f];
   var money=0,final_bal=0,profits=0;
   console.log(freq)
    if(document.getElementById("Compunding_frequency").value!=="never"){
        let money_invested=document.getElementById("money_invested").value;
        let noYears=document.getElementById("no_years").value;
        let x=money_invested*Math.pow(1+((x__/100)/freq),freq*noYears);
        money=money_invested;
        final_bal=x;
        profits=x-money_invested;
       document.getElementById("final_balance").innerHTML=numberwithcommas(x);
       document.getElementById("profit").innerHTML=numberwithcommas(x-money_invested);

    }
    document.getElementById('visualization').style.display = "block";
    Dividend_Data_2(money,final_bal,profits);
}

calc_freq={
    yearly:1,
    monthly:12,
    half_yearly:6,
    quartely:4,
    weekly:52,
    daily:365
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