function select_option(){
    if(document.getElementById("option_based").value==="sys"){
        document.getElementById("enable_monthly_investment").style.display="block";
        document.getElementById("enable_investment").style.display="none";
        document.getElementById("answer_one").innerHTML=''

    }
    else{
        document.getElementById("enable_monthly_investment").style.display="none";
        document.getElementById("enable_investment").style.display="block";
        document.getElementById("answer_one").innerHTML=''


    }
}

function select_yrmnth(){
    if(document.getElementById("select_year_month").value==="year"){
        document.getElementById("month_select").style.display="none";
        document.getElementById("year_select").style.display="block";
        document.getElementById("answer_one").innerHTML=''

    }
    else{
        document.getElementById("month_select").style.display="block";
        document.getElementById("year_select").style.display="none";
        document.getElementById("answer_one").innerHTML=''

    }
}
$.get('../Descriptions/Mutual_Funds.txt', function(data){
    console.log(data);
    document.getElementById("description_display").innerHTML=data;
})
function calc(){
    if(document.getElementById("Desc")){
        document.getElementById("Desc").remove();
    }
    let investing_amount=+document.getElementById("i_amount").value;
    let annual_return=+document.getElementById("a_return").value;
    var Mutual_Data=0,Invest_Data=0;
    
    if(document.getElementById("option_based").value==="one"){
        if(document.getElementById("select_year_month").value==="year"){
            let investmemnt_period=document.getElementById("y").value;
            console.log(investmemnt_period);
            let x=investing_amount*(Math.pow(1+(annual_return/100),investmemnt_period))
            Mutual_Data=x;
            Invest_Data=investing_amount;
            console.log(x);
            document.getElementById("answer_one").innerHTML=numberwithcommas(x);
        }
        else{
            let investmemnt_period=document.getElementById("m").value
            console.log(investmemnt_period);
            let x=investing_amount*(Math.pow(1+(annual_return/100),(investmemnt_period/12)));
            document.getElementById("answer_one").innerHTML=numberwithcommas(x);
            Mutual_Data=x;
            Invest_Data=investing_amount;
            console.log(x);    
        }
    }
    else{
         if(document.getElementById("select_year_month").value==="year"){
            let investmemnt_period=document.getElementById("y").value;
            console.log(investmemnt_period);
            let i=(annual_return/100)/12
            let x=investing_amount*((Math.pow(1+i,(investmemnt_period*12))-1)/i)*(1+i)
            console.log(x);
            Mutual_Data=x;
            Invest_Data=investing_amount*(investmemnt_period*12);
            console.log(Invest_Data);
            document.getElementById("answer_one").innerHTML=numberwithcommas(x);
        }
        else{
            let investmemnt_period=document.getElementById("m").value;
            console.log(investmemnt_period);
            let i=(annual_return/100)/12
            let x=investing_amount*((Math.pow(1+i,investmemnt_period)-1)/i)*(1+i)
            console.log(x);
            Mutual_Data=x;
            Invest_Data=investing_amount*investmemnt_period;
            console.log(Invest_Data);
            document.getElementById("answer_one").innerHTML=numberwithcommas(x);
        }
        
        

    }
    console.log(Mutual_Data,Invest_Data);
    document.getElementById('visualization').style.display = "block";
    Mutual_Fund_Data(Mutual_Data,Invest_Data);
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