var flag=0;
function to_know(){

document.getElementById("sdb").style.display="none";
document.getElementById("sii").style.display="block";
document.getElementById("srr").style.display="block";
document.getElementById("st").style.display="block";
document.getElementById("sair").style.display="block";
document.getElementById("disable_for_time_length").style.display="block"


if(document.getElementById("to_know_investment").value==="initial_investment"){
    document.getElementById("sdb").style.display="block";
    document.getElementById("sii").style.display="none";
}
else if(document.getElementById("to_know_investment").value==="rate_of_return"){
    document.getElementById("sdb").style.display="block";
    document.getElementById("sii").style.display="block";
    document.getElementById("srr").style.display="none"
}
else if(document.getElementById("to_know_investment").value==="periodic_contribution"){
    document.getElementById("sdb").style.display="block";
}
else if(document.getElementById("to_know_investment").value==="time_of_length"){
    document.getElementById("sdb").style.display="block";
    document.getElementById("st").style.display="none";
    document.getElementById("sair").style.display="none";
    document.getElementById("disable_for_time_length").style.display="none"

}
   
    
}
function select_month_year(){
    if(document.getElementById("ym").value==="month"){
        document.getElementById("tsm").style.display="block";
        document.getElementById("tsy").style.display="none";

    }
    else if(document.getElementById("ym").value==="year"){
        document.getElementById("tsm").style.display="none";

        document.getElementById("tsy").style.display="block";
    }
}

function calc_investment(){
    // flag++;
    // console.log(flag);
    // if(flag==1){
    // document.getElementById("show_description").style.display="none";
    // }
    if(document.getElementById("Desc")){
        document.getElementById("Desc").remove();
    }
    // $.get('../Descriptions/Investment.txt', function(data){
    //     console.log(data);
    //     document.getElementById("description_display").innerHTML="Hioo";
    // })
    let x=144000*(Math.pow(1+(.05/12),120))
    console.log(x)
    // document.getElementById("disable_for_periodic").style.display="block";
    
    var vizdata;

    if(document.getElementById("mytable").rows.length){
        table_delete()
    }
    let result_table=[],additional_reult_table=[],total_intrest=0,yearly_intrest=0,rem_month,aifr=0,intrest____
    let freq=calculate_frequency()
    console.log(freq)
    let to_calculate=calculate_to_know()
    console.log(to_calculate.annual_rate)
    console.log(freq)
        if(document.getElementById("to_know_investment").value==="time_of_length"){
          vizdata = calculate_time_of_length(to_calculate,freq)
        //   time_data(vizdata);
        }
        else if(document.getElementById("to_know_investment").value==="periodic_contribution" && document.getElementById("ac_select").value==="never"){
            display_on_off()
            document.getElementById("show_result__").style.display="block";
           
            document.getElementById("pc_never").style.display="block";
            document.getElementById("card_body_display").style.display="none"
            // document.getElementById("disable_for_periodic").style.display="none";
        }


        else{
            if(document.getElementById("ym").value==="month"){
                rem_month=to_calculate.term%12;
                to_calculate.term=Math.trunc(to_calculate.term/12)
            }
            if(document.getElementById("to_know_investment").value==="initial_investment"){
                let principal__;
                console.log(to_calculate.desired_investment);
                if(!document.getElementById("annual_fr_input_value").value){
                    principal__=(to_calculate.desired_investment)/Math.pow((1+((to_calculate.rate_of_return/100)/freq.per)),freq.per*to_calculate.term)
                }
                else{
                    let rate=+document.getElementById("annual_fr_input_value").value
                    to_calculate.desired_investment=to_calculate.desired_investment*(Math.pow(1+(rate/100),to_calculate.term))
                    console.log(to_calculate.desired_investment)
                    principal__=(to_calculate.desired_investment)/Math.pow((1+((to_calculate.rate_of_return/100)/freq.per)),freq.per*to_calculate.term)
                    console.log(principal__)
                }
                console.log(principal__)
                to_calculate.initial_investment=principal__
            }
            if(document.getElementById("to_know_investment").value==="rate_of_return"){
                let intrest;
                let rate=+document.getElementById("annual_fr_input_value").value
                //console.log(rate)
                if(rate!==0){
                    console.log(to_calculate.desired_balance)
                    to_calculate.desired_balance=to_calculate.desired_balance*(Math.pow(1+(rate/100),to_calculate.term))

                    intrest=freq.per*(Math.pow(to_calculate.desired_balance/to_calculate.initial_investment,(1/(to_calculate.term*freq.per)))-1)
                    to_calculate.rate_of_return=intrest*100
                    intrest____=intrest*100;
                    console.log(intrest);
                }
                else{
                    intrest=freq.per*(Math.pow(to_calculate.desired_balance/to_calculate.initial_investment,(1/(to_calculate.term*freq.per)))-1)
                    to_calculate.rate_of_return=intrest*100
                    console.log(to_calculate)
                }
            }
            if(document.getElementById("ac_select").value!=="never"){
                if(document.getElementById("to_know_investment").value==="rate_of_return"){
                    calculate_rate_of_return_ad()
                }
                
                let to_know_freq=calculate_additional_frequency(),yearly_intrest__=0,total_intrest__=0,tb=0,x__;
                let principal__=to_calculate.initial_investment;
                console.log(principal__)
                let additional_investment=+document.getElementById("ad_amount").value
               for(let i=0;i<to_calculate.term;i++){
                   x__=principal__+(additional_investment*to_know_freq.per)
                   for(j=0;j<freq.per;j++){
                       let y=(x__*(to_calculate.rate_of_return/freq.per))/100;
                       yearly_intrest__=y+yearly_intrest__;
                       total_intrest__=total_intrest__+y;
                       principal__=x__+y;
                       
                   }
                   if(document.getElementById("annual_growth_rate_calc").value!==0){
                       let x=(additional_investment*document.getElementById("annual_growth_rate_calc").value)/100;
                       additional_investment=additional_investment+x;
                   }
                   
                   additional_reult_table.push(
                    [
                        {"year":i+1},
                        {"yearly_contribution":numberwithcommas(additional_investment*to_know_freq.per)},
                        {"principal":numberwithcommas(principal__-yearly_intrest__)},
                        {"yearly_intrest":numberwithcommas(yearly_intrest__)},
                        {"total_intrest":numberwithcommas(total_intrest__)},
                        {"total_balance":numberwithcommas(principal__)}
                    ]
                )
                yearly_intrest__=0
               }
               createTable(additional_reult_table)         
               console.log(additional_reult_table)
               additional_data(additional_reult_table);


            }
            else{
                console.log(freq);
                let principal=to_calculate.initial_investment
                for(let i=0;i<to_calculate.term;i++){
                    for(let j=0;j<freq.per;j++){
                        let x=(to_calculate.initial_investment*(to_calculate.rate_of_return/freq.per))/100;
                        yearly_intrest=x+yearly_intrest
                        total_intrest=total_intrest+x;
                        to_calculate.initial_investment=to_calculate.initial_investment+x;
                    }
                    result_table.push(
                        [
                            {"Year":i+1},
                            {"Principal":numberwithcommas(principal)},
                            {"yeraly_intrest":numberwithcommas(yearly_intrest.toFixed(2))},
                            {"total_intrest":numberwithcommas(total_intrest.toFixed(2))},
                            {"total_balance":numberwithcommas(to_calculate.initial_investment.toFixed(2))}
                        ]
                    )
                    console.log(yearly_intrest)
                    yearly_intrest=0
                    console.log(yearly_intrest)
            
                    
                }
                result_table.unshift(
                    [
                        {"Year":0},
                        {"Principal":numberwithcommas(principal)},
                        {"yeraly_intrest":0},
                        {"total_intrest":0},
                        {"total_balance":numberwithcommas(principal)}
                    ]
                )
                if(rem_month){
                   let data=calculate_rem_month(rem_month,to_calculate.initial_investment,to_calculate.rate_of_return,total_intrest);
                   result_table.push(
                       [
                           {
                               "Year":"...and "+rem_month+ " month(s)"
                           },
                           {"Principal":numberwithcommas(principal)},
                           {"yeraly_intrest":data.yearly_intrest},
                           {"total_intrest":data.total_intrest},
                           {"total_balance":data.principal}
                       ]
                   )
                }
                console.log(to_calculate.initial_investment,total_intrest,result_table,intrest____)
                show_result(result_table,to_calculate.rate_of_return,to_calculate.annual_rate,to_calculate.term,intrest____)
                createTable(result_table)         
                other_data(result_table,to_calculate.flag); 
            }
        
             
        }
}

function calculate_to_know(){
    let term;
    if(document.getElementById("ym").value==="month"){
        term=+document.getElementById("term_month_input_value").value
    }
    else if(document.getElementById("ym").value==="year"){
        term=+document.getElementById("term_year_input_value").value
    }
    console.log(term)
    
    console.log(document.getElementById("ym").value==="month"?document.getElementById("term_month_input_value").value:document.getElementById("term_year_input_value").value,)
   
    if(document.getElementById("to_know_investment").value==="final_balance"){
        data={
            initial_investment:+document.getElementById("initial_investment_input_value").value,
            rate_of_return:+document.getElementById("rate_of_return_input_value").value,
            term:term,
            compund_frequency:document.getElementById("cf_input_value").value,
            annual_rate:+document.getElementById("annual_fr_input_value").value,
            flag:2
        }
        return data
    }

    else if(document.getElementById("to_know_investment").value==="time_of_length"){
        data={
            desired_balance:+document.getElementById("desired_balance_input_value").value,
            initial_investment:+document.getElementById("initial_investment_input_value").value,
            rate_of_return:+document.getElementById("rate_of_return_input_value").value,
            compund_frequency:document.getElementById("cf_input_value").value,
            flag:2
        }
       return data
    }

    else if(document.getElementById("to_know_investment").value==="periodic_contribution"){
        data={
            desired_balance:+document.getElementById("desired_balance_input_value").value,
            initial_investment:+document.getElementById("initial_investment_input_value").value,
            rate_of_return:+document.getElementById("rate_of_return_input_value").value,
            term:term,
            compund_frequency:document.getElementById("cf_input_value").value,
            annual_rate:+document.getElementById("annual_fr_input_value").value,
            flag:2
        }
       return data
    }
    else if(document.getElementById("to_know_investment").value==="rate_of_return"){
        data={
            desired_balance:+document.getElementById("desired_balance_input_value").value,
            initial_investment:+document.getElementById("initial_investment_input_value").value,
            term:term,
            compund_frequency:document.getElementById("cf_input_value").value,
            annual_rate:+document.getElementById("annual_fr_input_value").value,
            flag:2

        }
        console.log(data)
        return data
    }
    else if(document.getElementById("to_know_investment").value==="initial_investment"){
      data={
           desired_investment:+document.getElementById("desired_balance_input_value").value,
           rate_of_return:+document.getElementById("rate_of_return_input_value").value,
           term:term,
           compund_frequency:document.getElementById("cf_input_value").value,
           annual_rate:+document.getElementById("annual_fr_input_value").value,
           flag:2
    } 
    console.log(data)
    return data
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

function createTable(data){
    console.log(data)
    // document.getElementById("yr_deposit").style.display="none"
    var table=document.getElementById("mytable");
    for(let i=0;i<data.length;i++){
        document.getElementById("syc").style.display="block";
       if(document.getElementById("ac_select").value!=="never"){
        var row=`<tr>
        <td>${(data[i][0].year)}</td>
        <td>${data[i][1].yearly_contribution}</td>
        <td>${data[i][2].principal}</td>
        <td>${data[i][3].yearly_intrest}</td>
        <td>${data[i][4].total_intrest}</td>
        <td>${data[i][5].total_balance}</td>
    </tr>
`

       }
       else{
        document.getElementById("syc").style.display="none";

           var row=`<tr>
                       <td>${(data[i][0].Year)}</td>
                       <td>${data[i][1].Principal}</td>
                       <td>${data[i][2].yeraly_intrest}</td>
                       <td>${data[i][3].total_intrest}</td>
                       <td>${data[i][4].total_balance}</td>
                   </tr>
           `
       }
        table.innerHTML+=row

    }
    document.getElementById('resultant_table').style.display = "block";
    console.log(document.getElementById("mytable").rows.length);
    document.getElementById('visualization').style.display = "block";
  

}

function table_delete(){
    var Parent = document.getElementById("mytable");
while(Parent.hasChildNodes())
{
   Parent.removeChild(Parent.firstChild);
}
   
   
}

function calculate_frequency(){
    console.log(document.getElementById("cf_input_value").value==='yearly')
    if(document.getElementById("cf_input_value").value==="yearly"){
        cf={
            per:1
        }
        console.log(cf)
        return cf
    }
    else if(document.getElementById("cf_input_value").value==="monthly"){
        cf={
            per:12
        }
        return cf
        
    }
    else if(document.getElementById("cf_input_value").value==="semi_annualy"){
        cf={
            per:2
        }
        return cf

    }
    else if(document.getElementById("cf_input_value").value==="quartely"){
        cf={
            per:4
        }
        return cf

    }
    else if(document.getElementById("cf_input_value").value==="weekly"){
        cf={
            per:52
        }
        return cf

    }
    else if(document.getElementById("cf_input_value").value==="daily"){
        cf={
            per:365
        }
        return cf

    }

}

function calculate_rem_month(rem_month,final_principal,intrest,total_intrest_){
    console.log(final_principal)
    let totla_intrest=0;
    for(let i=0;i<rem_month;i++){
        let x=(final_principal*(intrest/12))/100;
        totla_intrest=totla_intrest+x;
        final_principal=final_principal+x;
    }
    data={
        principal:numberwithcommas(final_principal),
        yearly_intrest:numberwithcommas(totla_intrest),
        total_intrest:numberwithcommas(totla_intrest+total_intrest_)
    }
    

    return data
        

}

function calculate_time_of_length(props,freq){
    
        let c=document.getElementById("ad_amount").value*freq.per;
        let data=[],i=0,yeraly_intrest=0,total_intrest=0,principal,index=4,yc=0;
        principal=props.initial_investment;
        while(props.initial_investment<props.desired_balance){
            yc=c+yc;
            if(document.getElementById("to_know_investment").value==="time_of_length" && document.getElementById("ac_select").value!=="never"){
                let freq=calculate_additional_frequency();
                props.initial_investment=props.initial_investment+(document.getElementById("ad_amount").value*freq.per)
                index=5

            }
            for(let j=0;j<freq.per;j++){
                
                let x=(props.initial_investment*(props.rate_of_return)/freq.per)/100;
                yeraly_intrest=yeraly_intrest+x
                total_intrest=total_intrest+x;
                props.initial_investment=props.initial_investment+x;
            }
                    if(props.initial_investment>props.desired_balance){
                        let data_=parseFloat(data[data.length-1][index].total_balance.replace(/,/g,'')),yearly_intrest_=0,i=0;
            
                        while(data_<props.desired_balance){
                            let x=(data_*(props.rate_of_return/12))/100;
                            data_=data_+x;
                            yearly_intrest_=yearly_intrest_+x;
                            i++;
                        }
                        if(document.getElementById("ac_select").value!=="never"){
                           
                            
                            data.push(
                                [
                                    {"year":"... and "+i+" month(s)"},
                                    {"yearly_contribution":numberwithcommas(document.getElementById("ad_amount").value*freq.per)},
                                    {"principal":numberwithcommas(principal+yc)},
                                    {"yearly_intrest":numberwithcommas(yearly_intrest_)},
                                    {"total_intrest":numberwithcommas(parseFloat(data[data.length-1][4].total_intrest.replace(/,/g,''))+yearly_intrest_)},
                                    {"total_balance":numberwithcommas(data_)}
                                ]
                            )
                                additional_data(data);
                        }
                        else{
                            
                            data.push(
                                [
                                    {"Year":"... and "+i+" month(s)"},
                                    {"Principal":numberwithcommas(principal)},
                                    {"yeraly_intrest":numberwithcommas(yearly_intrest_)},
                                    {"total_intrest":numberwithcommas(parseFloat(data[data.length-1][3].total_intrest.replace(/,/g,''))+yearly_intrest_)},
                                    {"total_balance":numberwithcommas(data_)}
                                ]
                            )
                                time_data(data);
                        }
                        
                    }
                    else{
                        if(document.getElementById("ac_select").value!=="never"){
                           

                            data.push(
                                [
                                    {"year":i+1},
                                    {"yearly_contribution":numberwithcommas(c)},
                                    {"principal":numberwithcommas(principal+yc)},
                                    {"yearly_intrest":numberwithcommas(yeraly_intrest)},
                                    {"total_intrest":numberwithcommas(total_intrest)},
                                    {"total_balance": numberwithcommas(props.initial_investment)}
                                ]
                            )
                            i++;
                            yeraly_intrest=0
                            additional_data(data);
                                
                        }
                        else{
                            data.push(
                                [
                                    {"Year":i+1},
                                   
                                    {"Principal":numberwithcommas(principal)},
                                    {"yeraly_intrest":numberwithcommas(yeraly_intrest)},
                                    {"total_intrest":numberwithcommas(total_intrest)},
                                    {"total_balance": numberwithcommas(props.initial_investment)}
                                ]
                            )
                            i++;
                            yeraly_intrest=0
                            time_data(data);
                        }
                    }

                    
                }
                if(document.getElementById("ac_select").value==="never"){
                    data.unshift(
                        [
                            {"Year":0},
                            {"Principal":numberwithcommas(principal)},
                            {"yeraly_intrest":0},
                            {"total_intrest":0},
                            {"total_balance":numberwithcommas(principal)}
                        ]
                    )
                    
                    time_data(data);
                }
                else{
                    data.unshift(
                        [
                            {"year":0},
                            {"yearly_contribution":0},
                            {"principal":numberwithcommas(principal)},
                            {"yearly_intrest":0},
                            {"total_intrest":0},
                            {"total_balance":numberwithcommas(principal)}
                        ]
                    )
                    additional_data(data);
                }
        show_result(data,props.rate_of_return)
        createTable(data)
        //additional_data(data);
        console.log(data)
      

    
   

}

function show_result(data,rate_of_return,annual_rate,term,intrest_percent){
    console.log(data,rate_of_return,annual_rate)
    display_on_off()
   

    if(!annual_rate){
        if(document.getElementById("to_know_investment").value==="final_balance"){
            document.getElementById("show_final_balance").style.display="block";
            document.getElementById("show_final_balance_").innerHTML=data[data.length-1][4].total_balance;
            document.getElementById("show_final_balance_intrest").innerHTML=data[data.length-1][3].total_intrest
        }
        else if(document.getElementById("to_know_investment").value==="initial_investment"){
            document.getElementById("show_initial_investment").style.display="block";
            document.getElementById("show_initial_investment_").innerHTML=data[0][1].Principal;
            document.getElementById("show_initial_investment_intrest").innerHTML=data[data.length-1][3].total_intrest
        }
        else if(document.getElementById("to_know_investment").value==="time_of_length"){
            console.log(data)
            if(document.getElementById("ac_select").value!=="never"){
                document.getElementById("show_time_of_length").style.display="block";
                document.getElementById("show_time_of_length_year").innerHTML=data[data.length-2][0].year
                document.getElementById("show_time_of_length_month").innerHTML=data[data.length-1][0].year
                document.getElementById("show_time_of_length_intrest").innerHTML=data[data.length-1][4].total_intrest

            }
            else{
                document.getElementById("show_time_of_length").style.display="block";
                    document.getElementById("show_time_of_length_year").innerHTML=data[data.length-2][0].Year
                    document.getElementById("show_time_of_length_month").innerHTML=data[data.length-1][0].Year
                    document.getElementById("show_time_of_length_intrest").innerHTML=data[data.length-1][3].total_intrest

            }
        }
        else if(document.getElementById("to_know_investment").value="show_rate_of_return"){
            document.getElementById("show_rate_of_return").style.display="block";
            document.getElementById("show_rate_of_return_").innerHTML=rate_of_return.toFixed(2)
            document.getElementById("show_rate_of_return_intrest").innerHTML=data[data.length-1][3].total_intrest
        }

    }
    else{
        console.log(term)
        let changes=parseFloat(data[data.length-1][4].total_balance.replace(/,/g,''))/Math.pow(1+(annual_rate/100),term)
        console.log(changes)
        changes=+Math.trunc(changes)
        console.log(changes)
        if(document.getElementById("to_know_investment").value==="final_balance"){

           
            if(parseFloat(data[0][1].Principal.replace(/,/g,''))===changes){
                alert("hai")
                document.getElementById("annual_final_result_equal").style.display="block"
                document.getElementById("afrwf").innerHTML=data[data.length-1][4].total_balance
                document.getElementById("afrwwh").innerHTML=numberwithcommas(changes)
                document.getElementById("afreintrest").innerHTML=data[data.length-1][3].total_intrest
            }
            
            else if(changes<parseFloat(data[0][1].Principal.replace(/,/g,''))){
                document.getElementById("annual_final_result_loss").style.display="block";
                document.getElementById("afrl").innerHTML=data[data.length-1][4].total_balance;
                document.getElementById("afrl_loss").innerHTML= numberwithcommas(changes)
                document.getElementById("afrl_intrest").innerHTML=data[data.length-1][3].total_intrest;
                document.getElementById("aflrloss").innerHTML=numberwithcommas((parseFloat(data[0][1].Principal.replace(/,/g,'')))-changes)
            }
            else if(changes>parseFloat(data[0][1].Principal.replace(/,/g,''))){
                document.getElementById("annual_final_result_gain").style.display="block";
                document.getElementById("afrg").innerHTML=data[data.length-1][4].total_balance;
                document.getElementById("afrgain").innerHTML=numberwithcommas(changes);
                document.getElementById("afrgintrest").innerHTML=data[data.length-1][3].total_intrest;
                document.getElementById("afrintrestgain").innerHTML=numberwithcommas(changes-(parseFloat(data[0][1].Principal.replace(/,/g,''))))
            }
            
           
        }
        else if(document.getElementById("to_know_investment").value==="initial_investment"){
            // alert('hai')
            console.log(parseFloat(data[0][1].Principal.replace(/,/g,'')))
            if(parseFloat(data[0][1].Principal.replace(/,/g,''))===+document.getElementById("desired_balance_input_value").value){
                document.getElementById("annual_initial_result_equal").style.display="block";
                document.getElementById("aireq").innerHTML=data[0][1].Principal;
                document.getElementById("airfinal").innerHTML=data[data.length-1][4].total_balance;
            }
            
            else if(+document.getElementById("desired_balance_input_value").value<parseFloat(data[0][1].Principal.replace(/,/g,''))){
                document.getElementById("annual_initial_result_loss").style.display="block";
                document.getElementById("irid").innerHTML=data[0][1].Principal;
                document.getElementById("irfb").innerHTML=data[data.length-1][4].total_balance;
                document.getElementById("ibrintrest").innerHTML=data[data.length-1][3].total_intrest;
                document.getElementById("int").innerHTML= numberwithcommas(parseFloat(data[0][1].Principal.replace(/,/g,''))-document.getElementById("desired_balance_input_value").value)
                
            }
            else if(+document.getElementById("desired_balance_input_value").value>parseFloat(data[0][1].Principal.replace(/,/g,''))){
                document.getElementById("annual_result_gain").style.display="block";
                document.getElementById("argid").innerHTML=data[0][1].Principal;
                document.getElementById("anrtb").innerHTML=data[data.length-1][4].total_balance;
                document.getElementById("argintrest").innerHTML=data[data.length-1][3].total_intrest;
                document.getElementById("arminus").innerHTML= numberwithcommas(document.getElementById("desired_balance_input_value").value-parseFloat(data[0][1].Principal.replace(/,/g,'')))

            }
            
        }
        else if(document.getElementById("to_know_investment").value="rate_of_return"){
            document.getElementById("body_rate_of_return_").style.display="block";
            document.getElementById("rorpercent").innerHTML=intrest_percent.toFixed(2);
            document.getElementById("rorfinal_balance").innerHTML=data[data.length-1][4].total_balance;
            document.getElementById("h_a_").innerHTML=data[data.length-1][3].total_intrest
            // document.getElementById("he_l_o").innerHTML

          
        }
    }
    

}

function additional_contribution_select(){
    if(document.getElementById("ac_select").value!=="never"){
        document.getElementById("ac_one").style.display="block"
        document.getElementById("ad_two").style.display="block"
    }
    else{
        document.getElementById("ac_one").style.display="none"
        document.getElementById("ad_two").style.display="none"
    }
}

function calculate_additional_frequency(){
    if(document.getElementById("ac_select").value==="yearly"){
        cf={
            per:1
        }
        console.log(cf)
        return cf
    }
    else if(document.getElementById("ac_select").value==="monthly"){
        cf={
            per:12
        }
        return cf
        
    }
    else if(document.getElementById("ac_select").value==="semi_annualy"){
        cf={
            per:2
        }
        return cf

    }
    else if(document.getElementById("ac_select").value==="quartely"){
        cf={
            per:4
        }
        return cf

    }
    else if(document.getElementById("ac_select").value==="weekly"){
        cf={
            per:52
        }
        return cf

    }
    else if(document.getElementById("ac_select").value==="daily"){
        cf={
            per:365
        }
        return cf

    }


}

function display_on_off(){
    document.getElementById("card_body_display").style.display="block";
   document.getElementById("pc_never").style.display="none";
    document.getElementById("show_result__").style.display="block"
    document.getElementById("show_final_balance").style.display="none";
    document.getElementById("show_initial_investment").style.display="none";
    document.getElementById("show_time_of_length").style.display="none";
    document.getElementById("show_rate_of_return").style.display="none";
    document.getElementById("annual_final_result_equal").style.display="none"
    document.getElementById("annual_final_result_loss").style.display="none";
    document.getElementById("annual_final_result_gain").style.display="none";
    document.getElementById("annual_initial_result_loss").style.display="none";
    document.getElementById("annual_result_gain").style.display="none";
    document.getElementById("annual_initial_result_equal").style.display="none";
    document.getElementById("body_rate_of_return_").style.display="none";


}

function calculate_rate_of_return_ad(){

}