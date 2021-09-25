// window.onresize = function(){ location.reload();}
$.get('../Descriptions/Compound_Interest.txt', function(data){
    console.log(data);
    document.getElementById("description_display").innerHTML=data;
})
var flags=0;
function calc(){
    flags++;
    console.log(flags);
    if(flags==1){
    document.getElementById("show_description").style.display="none";
    }

    console.log(screen.width)
    console.log(document.getElementById("additional_deposit").value)
    if(document.getElementById("mytable").rows.length){
        table_delete()
    }
    if(document.getElementById("additional_deposit").value!=="never"){
        var additional_deposit_value=document.getElementById("additional_deposi_input").value;
        var balance=document.getElementById("inital-balance").value;
    var bal=+balance
    var intrest=document.getElementById("intrest").value;
    var term;
    var rem_months;
    if(document.getElementById("term_year_month").value==="year"){
        if(screen.width<600){
            term=document.getElementById("term_year_res").value
        }
        else{
            term=document.getElementById("term_year").value;
        }
    }
    else if(document.getElementById("term_year_month").value==="month"){
       
        if(screen.width<600){
            term=document.getElementById("term_month_res").value;
            rem_months=term%12;
            term=Math.trunc(term/12);
            console.log(rem_months)
        }
        else{
            term=document.getElementById("term_month").value;
            rem_months=term%12;
            term=Math.trunc(term/12);
            console.log(rem_months)

        }
    }
    var cf=document.getElementById("Compounding-frequency").value
    console.log(cf)
    let intrest_cal=[];
    let totalIntrest=0;
    let x,dintrest=0;
    let freq=additional_Deposit_often()
    let annual_rate=document.getElementById("annual_rate").value;
    let l=0
    for(let i=0;i<term;i++){
        for(let j=0;j<freq.cfp;j++){
            balance=+balance;
           intrest=+intrest;
           additional_deposit_value=+additional_deposit_value;
           if(l!==0&&annual_rate){
               let a=(additional_deposit_value*(annual_rate/freq.cfp))/100;
               additional_deposit_value=additional_deposit_value+a;
            }
            l++;
           bal=bal+additional_deposit_value
           balance=balance+additional_deposit_value;
            x=(balance*(intrest/freq.per))/100;
            dintrest=x+dintrest;
           totalIntrest=x+totalIntrest;
           balance=x+balance;
        }
        console.log(dintrest)
       intrest_cal.push([
        {"Year":i+1},
        {"Yearly_deposit":numberwithcommas((additional_deposit_value*freq.cfp).toFixed(2))},
        {"Principal":numberwithcommas(bal.toFixed(2))},
        {"Yearly_Intrest":numberwithcommas(+dintrest)},
        {"Total_Intrest":numberwithcommas(totalIntrest)},
        {"Total_Balance":numberwithcommas(balance)}
       ]
       )
       dintrest=0;
    }
    intrest_cal.unshift([
        {"Year":0},
        {"Yearly_deposit":0},
        {"Principal":numberwithcommas(+document.getElementById("inital-balance").value)},
        {"Yearly_Intrest":0},
        {"Total_Intrest":0},
        {"Total_Balance":numberwithcommas(+document.getElementById("inital-balance").value)}
    ])
    if(rem_months){
        let final_result=calculate_month(rem_months,intrest_cal,intrest);
        final_result.intrest=+final_result.intrest
        intrest_cal.push(
            [
                {"Year":"...and "+rem_months +" month(s)"},
                {"Yearly_deposit":numberwithcommas((((additional_deposit_value*freq.cfp)/12)*rem_months).toFixed(2))},
                {"Principal":numberwithcommas((bal+((additional_deposit_value*freq.cfp)/12)*rem_months).toFixed(2))},
                {"Yearly_Intrest":numberwithcommas(final_result.intrest)},
                {"Total_Intrest":numberwithcommas(final_result.intrest+parseFloat(intrest_cal[intrest_cal.length-1][4].Total_Intrest.replace(/,/g, '')))},
                {"Total_Balance":numberwithcommas(final_result.total_balance)}
            ]
        )
    }

    document.getElementById("final_balance").innerHTML=(intrest_cal[intrest_cal.length-1][5].Total_Balance)
    document.getElementById("compond_intrest").innerHTML=(intrest_cal[intrest_cal.length-1][4].Total_Intrest)
    document.getElementById('result').style.display = "block";
    
    var cioib=document.getElementById("inital-balance").value;
    console.log(cioib)
    var cioyd=document.getElementById("additional_deposi_input").value;
    var additionl_deposit_term=document.getElementById("additional_deposit").value;
    additionl_deposit_term=additional_Deposit_often(additionl_deposit_term)
    console.log(intrest)
    cioyd=+cioyd
    cioib=+cioib
    var cioib_=[]
    for(i=0;i<term;i++){
        
     
        
            let x=(cioib*intrest)/100
            cioib=x+cioib
            // x=(cioyd*intrest)/100
            // cioyd=x+cioyd
        
        cioib_.push([
            {cib:cioib},
            // {ciy:cioyd}
        ])
    }
document.getElementById("cioib").innerHTML=numberwithcommas(cioib_[cioib_.length-1][0].cib)
// document.getElementById("cioyd").innerHTML=numberwithcommas(cioib_[cioib_.length-1][1].ciy)
// document.getElementById("cioyd").innerHTML=calc_cioad(cioyd,additionl_deposit_term,term,intrest)
console.log(intrest_cal[intrest_cal.length-1][1])
document.getElementById("soad").innerHTML=numberwithcommas(parseFloat(intrest_cal[intrest_cal.length-1][1].Yearly_deposit.replace(/,/g, ''))*term);
document.getElementById("tp").innerHTML=intrest_cal[intrest_cal.length-1][2].Principal
document.getElementById("fbad").innerHTML=calc_final_deposit(parseFloat(intrest_cal[intrest_cal.length-1][1].Yearly_deposit.replace(/,/g, '')),term,intrest)
document.getElementById("fbim").innerHTML=final_initial_money(parseFloat(intrest_cal[intrest_cal.length-1][2].Principal.replace(/,/g, '')),term,intrest,parseFloat(intrest_cal[intrest_cal.length-1][3].Yearly_Intrest.replace(/,/g, '')))
createadditionalTable(intrest_cal)
additional_data(intrest_cal);


    }
  
    else{
        // if(document.getElementById("Compounding-frequency").value==="yearly") yearly()
        var balance=document.getElementById("inital-balance").value;
    var bal=+balance
    var intrest=document.getElementById("intrest").value;
    var term;
    var rem_months;
    if(document.getElementById("term_year_month").value==="year"){
        if(screen.width<600){
            term=document.getElementById("term_year_res").value;
        }
        else{
            term=document.getElementById("term_year").value;
        }
    }
    else if(document.getElementById("term_year_month").value==="month"){
        if(screen.width<600){
            term=document.getElementById("term_month_res").value;
            rem_months=term%12;
            term=Math.trunc(term/12);
            console.log(rem_months)
        }
        else{
            term=document.getElementById("term_month").value;
            rem_months=term%12;
            term=Math.trunc(term/12);
            console.log(rem_months)

        }
    }
    console.log(term)
    var cf=document.getElementById("Compounding-frequency").value
    console.log(cf)
    let intrest_cal=[];
    let totalIntrest=0;
    let x,dintrest=0;
    
   freq=frequecy()
    console.log(freq.cfp,freq.per)
    for(let i=0;i<term;i++){
        for(let j=0;j<freq.cfp;j++){
            balance=+balance
            intrest=+intrest
            x=(balance*(intrest/freq.per))/100;
            dintrest=x+dintrest
            totalIntrest=x+totalIntrest
            balance=x+balance
            

        }
                intrest_cal.push([
                    {"Year":i+1},
                    {"Principal":numberwithcommas(bal)},
                    {"Yearly_Intrest":numberwithcommas(dintrest)},
                    {"Total_Intrest":numberwithcommas(totalIntrest)},
                    {"Total_Balance":numberwithcommas(balance)}
                   ]
                   )
        dintrest=0;
      
    }
    intrest_cal.unshift([
        {"Year":0},
        {"Principal":numberwithcommas(bal)},
        {"Yearly_Intrest":0},
        {"Total_Intrest":0},
        {"Total_Balance":numberwithcommas(bal)}
    ])
    if(rem_months){
        let final_result=calculate_month(rem_months,intrest_cal,intrest);
        final_result.intrest=+final_result.intrest
        console.log(final_result.intrest,intrest_cal[intrest_cal.length-1][3].Total_Intrest)
        intrest_cal.push(
            [
                {"Year":"...and "+rem_months+" month(s)"},
                {"Principal":+bal},
                {"Yearly_Intrest":numberwithcommas(final_result.intrest)},
                {"Total_Intrest":numberwithcommas(final_result.intrest+parseFloat(intrest_cal[intrest_cal.length-1][3].Total_Intrest.replace(/,/g,'')))},
                {"Total_Balance":numberwithcommas(final_result.total_balance)}
            ]
        )
        console.log(intrest_cal)
    }

    console.log(intrest_cal[intrest_cal.length-1][4].Total_Balance)
    document.getElementById("final_balance").innerHTML=intrest_cal[intrest_cal.length-1][4].Total_Balance;
    document.getElementById("compond_intrest").innerHTML=intrest_cal[intrest_cal.length-1][3].Total_Intrest;
    document.getElementById('result').style.display = "block";
    createTable(intrest_cal);
    usual_data(intrest_cal);
}
}

function createTable(data){
    document.getElementById("yr_deposit").style.display="none"
    var table=document.getElementById("mytable");
    for(let i=0;i<data.length;i++){
        console.log(data)
        var row=`<tr>
                    <td>${(data[i][0].Year)}</td>
                    <td>${data[i][1].Principal}</td>
                    <td>${data[i][2].Yearly_Intrest}</td>
                    <td>${data[i][3].Total_Intrest}</td>
                    <td>${data[i][4].Total_Balance}</td>
                </tr>
        `
        table.innerHTML+=row

    }
    document.getElementById('resultant_table').style.display = "block";
    console.log(document.getElementById("mytable").rows.length);
    document.getElementById('visualization').style.display = "block";
  

}

function createadditionalTable(data){
  document.getElementById("yr_deposit").style.display="block"
  document.getElementById("additional").style.display="block"

    var table=document.getElementById("mytable");
    for(let i=0;i<data.length;i++){
        console.log(data)
        var row=`<tr>
                    <td>${(data[i][0].Year)}</td>
                    <td>${data[i][1].Yearly_deposit}</td>
                    <td>${data[i][2].Principal}</td>
                    <td>${(data[i][3].Yearly_Intrest)}</td>
                    <td>${(data[i][4].Total_Intrest)}</td>
                    <td>${(data[i][5].Total_Balance)}</td>
                </tr>
        `
        table.innerHTML+=row

    }
    document.getElementById('resultant_table').style.display = "block";
    document.getElementById('visualization').style.display = "block";
    console.log(document.getElementById("mytable").rows.length);
    //document.getElementById('visualization').style.display = "block";

}

function table_delete(){
    var Parent = document.getElementById("mytable");
while(Parent.hasChildNodes())
{
   Parent.removeChild(Parent.firstChild);
}
   
   
}

function additional_Deposit(){
    if(document.getElementById("additional_deposit").value!=="never"){
        document.getElementById('display_additional_deposit').style.display = "block";
        document.getElementById("display_additional_deposit_when").style.display="block"
        document.getElementById("annual_growth_rate").style.display="block"

    }
    else{
        document.getElementById('display_additional_deposit').style.display = "none";
        document.getElementById("display_additional_deposit_when").style.display="none";
        document.getElementById("annual_growth_rate").style.display="none"
        document.getElementById("additional").style.display="none"
    }
}

function frequecy(){
    if(document.getElementById("Compounding-frequency").value==="yearly"){
        fre={
            cfp:1,
            per:1
        } 
        return fre
    }
    else if(document.getElementById("Compounding-frequency").value==="semi-annualy"){
        fre={
            cfp:2,
            per:2
        }
        return fre
    }
    else if(document.getElementById("Compounding-frequency").value==="quarterly"){
        fre={
            cfp:4,
            per:4
        }
        return fre
    }
    else if(document.getElementById("Compounding-frequency").value==="bi-monthly"){
        fre={
            cfp:6,
            per:6
        }
        return fre
    }
    else if(document.getElementById("Compounding-frequency").value==="monthly"){
        fre={
            cfp:12,
            per:12
        }
        return fre
    }
    else if(document.getElementById("Compounding-frequency").value==="bi-weekly"){
        fre={
            cfp:26,
            per:26
        }
        return fre
    }
    else if(document.getElementById("Compounding-frequency").value==="weekly"){
        fre={
            cfp:52,
            per:52
        }
        return fre
    }
    else if(document.getElementById("Compounding-frequency").value==="daily"){
        fre={
            cfp:360,
            per:360
        }
        return fre
    }
    else if(document.getElementById("Compounding-frequency").value==="daily_F"){
        fre={
            cfp:365,
            per:365
        }
        return fre
    }
}

function mon_year(){
    if(document.getElementById("term_year_month").value==="month"){
        if(screen.width<600){
            document.getElementById("mon_res").style.display="block";
            document.getElementById("year").style.display="none"
            document.getElementById("year_res").style.display="none"
        }
        else{
            document.getElementById("mon").style.display="block";
            document.getElementById("year").style.display="none"
            document.getElementById("year_res").style.display="none"
        }


    }
    else if(document.getElementById("term_year_month").value==="year"){
        if(screen.width<600){
            document.getElementById("mon_res").style.display="none";
            document.getElementById("year_res").style.display="block"

        }
        else{
            document.getElementById("year").style.display="block"
            document.getElementById("mon").style.display="none";
        }
    }
}

function calculate_month(data,intrest_cal,intrest){
    if(document.getElementById("additional_deposit").value==="never"){

    }
   
        console.log(intrest_cal[intrest_cal.length-1])
        let cal=0,cal_int,total_balance=intrest_cal[intrest_cal.length-1][document.getElementById("additional_deposit").value==="never"?4:5].Total_Balance;
        total_balance=parseFloat(total_balance.replace(/,/g, ''))
        total_balance=+total_balance
        for(let i=0;i<data;i++){
            cal_int=(total_balance*(intrest/12))/100;
            total_balance=total_balance+cal_int;
            cal=cal+cal_int
    
        }
        console.log(cal)
        result={
            intrest:cal,
            total_balance:total_balance
        }
        return result
}

function additional_Deposit_often(){
    if(document.getElementById("additional_deposit").value==="a_yearly"){
        fre={
            cfp:1,
            per:1
        } 
        return fre
    }
    else if(document.getElementById("additional_deposit").value==="a_semi-annualy"){
        fre={
            cfp:2,
            per:2
        }
        return fre
    }
    else if(document.getElementById("additional_deposit").value==="a_quarterly"){
        fre={
            cfp:4,
            per:4
        }
        return fre
    }
    
    else if(document.getElementById("additional_deposit").value==="a_monthly"){
        fre={
            cfp:12,
            per:12
        }
        return fre
    }
    else if(document.getElementById("additional_deposit").value==="a_bi-weekly"){
        fre={
            cfp:26,
            per:26
        }
        return fre
    }
    else if(document.getElementById("additional_deposit").value==="a_weekly"){
        fre={
            cfp:52,
            per:52
        }
        return fre
    }
   
    else if(document.getElementById("additional_deposit").value==="a_daily_F"){
        fre={
            cfp:365,
            per:365
        }
        return fre
    }

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

function calc_final_deposit(deposit,term,intrest){
    deposit=deposit*term;
    let x=(deposit*(term*intrest)/100);
    deposit=deposit+x
    return numberwithcommas(deposit);

}
function final_initial_money(principal,term,intrest,yintrest){
    term=term*intrest;
    let x=(principal*term)/100;
    x=x+principal;
    return numberwithcommas(x-yintrest)


}
function calc_cioad(deposit,freq,term,intrest){
    console.log(deposit)
    console.log(freq)
    for(let i=0;i<term;i++){
        for(let j=0;j<freq.per;j++){
            let x=(deposit*intrest)/100;
            deposit=deposit+x;
            
        }
    }
    return numberwithcommas(deposit)
}