var viz=document.getElementById("viz_selection");
var flag=0,res=[],temp=[],tot_int="",tot_bal="";
var vizdata;

function time_data(data){
  console.log(data);
  vizdata=Data_Convert(data);
  console.log(vizdata);
  flag=1;

  if(flag==1){
    res=vizdata.map(x=> Object.keys(x));
    temp=res[0];
    console.log(temp);
    tot_int=temp[3];
    tot_bal=temp[4];
  }

  Make_Charts();
}
function additional_data(data){
  console.log(data);
  vizdata=Data_Convert_2(data);
  
  res=vizdata.map(x=> Object.keys(x));
  temp=res[0];
  flag=temp.length;
  tot_int=temp[4];
  tot_bal=temp[5];

  if(flag==6){
    Make_Charts();
  }
}

function other_data(data,flag_value){
  console.log(data,flag_value);
  vizdata=Data_Convert(data);
  flag=flag_value;

  if(flag==2){
    res=vizdata.map(x=> Object.keys(x));
    temp=res[0];
    console.log(temp);
    tot_int=temp[3];
    tot_bal=temp[4];
  }

  Make_Charts();
}

function Data_Convert(data){

  var flat=[].concat.apply([],data);
  console.log(flat);
  var len=flat.length;

  var flask=[];
  var ob1,ob2,ob3,ob4,ob5;
  for(var k=0;k<len;k=k+5){
      ob1=flat[k];
      ob2=flat[k+1];
      ob3=flat[k+2];
      ob4=flat[k+3];
      ob5=flat[k+4];
      flask.push({
        ...ob1,
        ...ob2,
        ...ob3,
        ...ob4,
        ...ob5

      });
    }

   var keys_arr=flask.map(x=> Object.keys(x));
   var keys=keys_arr[0];
   var one=keys[1];
   var two=keys[2];
   var three=keys[3];
   var four=keys[4];
   var objects;

   for(var i=0;i<flask.length;i++){
       objects=flask[i];

       if(objects[one].toString().indexOf(',')>-1){
          objects[one]=parseFloat((objects[one]).replace(/,/g,''));
       }
       else
       {
          objects[one]=parseFloat(objects[one]);
       }

       if(objects[two].toString().indexOf(',')>-1){
          objects[two]=parseFloat((objects[two]).replace(/,/g,''));
       }
       else
       {
          objects[two]=parseFloat(objects[two]);
       }

       
       if(objects[three].toString().indexOf(',')>-1){
          objects[three]=parseFloat((objects[three]).replace(/,/g,''));
       }
       else
       {
          objects[three]=parseFloat(objects[three]);
       }
        
       if(objects[four].toString().indexOf(',')>-1){
          objects[four]=parseFloat((objects[four]).replace(/,/g,''));
       }
       else
       {
          objects[four]=parseFloat(objects[four]);
       }
  }
  return(flask); 
}

function Data_Convert_2(data){

  var flat=[].concat.apply([],data);
  var len=flat.length;
 
  var flask=[];
  var ob1,ob2,ob3,ob4,ob5,ob6;
  for(var k=0;k<len;k=k+6){
      ob1=flat[k];
      ob2=flat[k+1];
      ob3=flat[k+2];
      ob4=flat[k+3];
      ob5=flat[k+4];
      ob6=flat[k+5];
      flask.push({
        ...ob1,
        ...ob2,
        ...ob3,
        ...ob4,
        ...ob5,
        ...ob6
      });
    }

   var keys_arr=flask.map(x=> Object.keys(x));
   var keys=keys_arr[0];
   var one=keys[1];
   var two=keys[2];
   var three=keys[3];
   var four=keys[4];
   var five=keys[5];
   var objects;

   for(var i=0;i<flask.length;i++){
       objects=flask[i];

       if(objects[one].toString().indexOf(',')>-1){
          objects[one]=parseFloat((objects[one]).replace(/,/g,''));
       }
       else
       {
          objects[one]=parseFloat(objects[one]);
       }

       if(objects[two].toString().indexOf(',')>-1){
          objects[two]=parseFloat((objects[two]).replace(/,/g,''));
       }
       else
       {
          objects[two]=parseFloat(objects[two]);
       }
 
       if(objects[three].toString().indexOf(',')>-1){
          objects[three]=parseFloat((objects[three]).replace(/,/g,''));
       }
       else
       {
          objects[three]=parseFloat(objects[three]);
       }
        
       if(objects[four].toString().indexOf(',')>-1){
          objects[four]=parseFloat((objects[four]).replace(/,/g,''));
       }
       else
       {
          objects[four]=parseFloat(objects[four]);
       }

       if(objects[five].toString().indexOf(',')>-1){
          objects[five]=parseFloat((objects[five]).replace(/,/g,''));
       }
       else
       {
          objects[five]=parseFloat(objects[five]);
       }
  }
  return(flask); 
}

function VizData(output,value,tot_bal,tot_int,flag){
  //BAR VARIABLES
  var x="",y="",res=output.map(x=> Object.keys(x)),headers=res[0];
  //PIE VARIABLES
  var tot_pri="",Maximum_Tot_Investment=0,Maximum_Tot_Bal=0,Maximum_Tot_Int=0, Percentage_of_Int_in_Bal=0,Percentage_of_Inves_in_Bal=0,pie_res=[],pie_temp=[];
  var contributions;
  var Pie_Datas;
  //STACK VARIABLES
  var clone,stack_keys_arr,new_stack_keys_arr,stack_keys,new_stack_keys,zero="",one="",two="",three="",four="",five="",objects,Years;
  var xs="",ys="",ps="",y_max=0,max_principal=0;
  var Stacked_Datas;
  //LINE VARIABLES
  var xl="",yl="",bl="",line_res=output.map(x=> Object.keys(x)),line_headers=line_res[0],line_keys=[],j=0,yl_max=0,bl_max=0,line_clone;
  var line_keys_arr,lines_keys,zerol="",onel="",twol="",threel="",fourl="",fivel="",line_objects,new_line_objects,Year_array=[],Principal_array=[],Intrest_array=[],Balance_array=[];
  var line_arr=[],Line_Datas;

  if(flag==2 || flag==1){
      /* BAR DATA PROCESSING STARTS HERE */
      console.log(headers);
      x=headers[0];
      y=headers[3];
      /* BAR DATA PROCESSING ENDS HERE */

      /* PIE DATA PROCESSING STARTS HERE */
      pie_res=output.map(x=> Object.keys(x));
      pie_temp=pie_res[0];
      tot_pri=pie_temp[1];

      Maximum_Tot_Investment=Math.max.apply(Math,output.map(function(o){
          return o[tot_pri];
      }))
      console.log(Maximum_Tot_Investment);
      Maximum_Tot_Bal=Math.max.apply(Math,output.map(function(o){
          return o[tot_bal];
      }))
      Maximum_Tot_Int=Math.max.apply(Math,output.map(function(o){
          return o[tot_int];
      }))

      Percentage_of_Int_in_Bal=(Maximum_Tot_Int/Maximum_Tot_Bal)*100;
      Percentage_of_Int_in_Bal=Math.round(Percentage_of_Int_in_Bal*100)/100;
      Percentage_of_Inves_in_Bal=(Maximum_Tot_Investment/Maximum_Tot_Bal)*100;
      Percentage_of_Inves_in_Bal=Math.round(Percentage_of_Inves_in_Bal*100)/100;
  
      Pie_Datas=[{"type":"Interest Earned", "amount":Percentage_of_Int_in_Bal},
                  {"type":"Initial Investment", "amount":Percentage_of_Inves_in_Bal}];
      /* PIE DATA PROCESSING ENDS HERE */

      /* STACKED DATA PROCESSING STARTS HERE*/
      clone= JSON.parse(JSON.stringify(output));

      stack_keys_arr=clone.map(x=> Object.keys(x));
      stack_keys=stack_keys_arr[0];
      zero=stack_keys[0];
      one=stack_keys[1];
      two=stack_keys[2];
      three=stack_keys[3];
      four=stack_keys[4];

      Years = d3.map(clone, function(d){return(d[zero])}).keys()

      for(var i=0;i<clone.length;i++){
          objects=clone[i];
          objects[zero]=objects[zero].toString();
          objects[one]=objects[one].toString();
          objects[two]=objects[two].toString();
          delete objects[two];
          objects[three]=objects[three].toString();
          objects[four]=objects[four].toString();
          delete objects[four];
      }

      new_stack_keys_arr=clone.map(x=> Object.keys(x));
      new_stack_keys=new_stack_keys_arr[0];
      new_stack_keys.shift();
      console.log(new_stack_keys);

      Stacked_Datas= d3.stack()
      .keys(new_stack_keys)
      (clone);
      console.log(Stacked_Datas);

      xs=stack_keys[0];
      ys=stack_keys[3];
      ps=stack_keys[1];
      y_max=d3.max(output,function(d){
      return d[ys];
      });
      max_principal=d3.max(output,function(d){
      return d[ps];
      });
      /* STACKED DATA PROCESSING ENDS HERE */

      /* LINE DATA PROCESSING STARTS HERE */
      xl=line_headers[0];
      var YI=line_headers[2];
      console.log(xl);
      for(var i=0;i<line_headers.length;i++){
        if(i==1||i==3||i==4){
          line_keys[j]=line_headers[i];
          j++;
        }
      }

      bl=line_keys[2];
      console.log(bl);
      yl_max=d3.max(output,function(d){
          return d[bl];
      });
      var P=line_keys[0];
      var TI=line_keys[1];
      var TB=line_keys[2];

      Year_array= output.map(a => a[xl]);
      Principal_array=output.map(a=> a[P]);
      Intrest_array=output.map(a=> a[TI]);
      Balance_array=output.map(a=>a[TB]);

      for(var i=0;i<Year_array.length;i++){
        new_line_objects={};
        new_line_objects.Year=Year_array[i];
        new_line_objects.Name="Principal";
        new_line_objects.Value=Principal_array[i];
        line_arr.push(new_line_objects);
      }
      for(var i=0;i<Year_array.length;i++){
        new_line_objects={};
        new_line_objects.Year=Year_array[i];
        new_line_objects.Name="Interest";
        new_line_objects.Value=Intrest_array[i];
        line_arr.push(new_line_objects);
      }
      for(var i=0;i<Year_array.length;i++){
        new_line_objects={};
        new_line_objects.Year=Year_array[i];
        new_line_objects.Name="Balance";
        new_line_objects.Value=Balance_array[i];
        line_arr.push(new_line_objects);
      }

      line_clone=JSON.parse(JSON.stringify(line_arr));
      var output_clone=JSON.parse(JSON.stringify(output));
      line_keys_arr=line_clone.map(x=> Object.keys(x));
      lines_keys=line_keys_arr[0];
      zerol=lines_keys[0];
      onel=lines_keys[1];
      twol=lines_keys[2];

      for(var i=0;i<line_clone.length;i++){
        line_objects=line_clone[i];
        line_objects[zerol]=line_objects[zerol].toString();
        // line_objects[onel]=line_objects[onel].toString();
        // line_objects[twol]=line_objects[twol].toString();
      }

      for(var i=0;i<output_clone.length;i++){
        line_objects=output_clone[i];
        line_objects[zerol]=line_objects[zerol].toString();
        delete line_objects[YI];
        // line_objects[onel]=line_objects[onel].toString();
        // line_objects[twol]=line_objects[twol].toString();
      }

      console.log(line_clone);
      Line_Datas=d3.nest()
      .key(function(d){return d.Name})
      .entries(line_clone);

      console.log(line_arr);
      console.log(Line_Datas);
      /* LINE DATA PROCESSING ENDS HERE */
  }

  if(flag==6){
      /* BAR DATA PROCESSING STARTS HERE */
      console.log(headers);
      x=headers[0];
      y=headers[4];
      /* BAR DATA PROCESSING ENDS HERE */

      /* PIE DATA PROCESSING STARTS HERE */
      pie_res=output.map(x=> Object.keys(x));
      pie_temp=pie_res[0];
      tot_pri=pie_temp[2];
      
      var Initial_Tot_Investment=Math.min.apply(Math,output.map(function(o){
        return o[tot_pri];
      }))
      Maximum_Tot_Bal=Math.max.apply(Math,output.map(function(o){
        return o[tot_bal];
      })) 
      Maximum_Tot_Int=Math.max.apply(Math,output.map(function(o){
        return o[tot_int];
      }))

      var keys_arr=output.map(x=> Object.keys(x));
      var keys=keys_arr[0];
      contributions=keys[1];
      var contibution_money=0;
      var contribution_amounts_arr=output.map(function(el){return el[contributions]});
      for(var i=0;i<contribution_amounts_arr.length;i++){
        contibution_money=contibution_money+contribution_amounts_arr[i];
      }
      console.log(contibution_money);

      var Total_Contribution=contibution_money;

      Percentage_of_Int_in_Bal= (Maximum_Tot_Int/Maximum_Tot_Bal)*100;
      Percentage_of_Int_in_Bal=Math.round(Percentage_of_Int_in_Bal*100)/100;
      Percentage_of_Inves_in_Bal=(Initial_Tot_Investment/Maximum_Tot_Bal)*100;
      Percentage_of_Inves_in_Bal=Math.round(Percentage_of_Inves_in_Bal*100)/100;
      var Percentage_of_Contribution_in_Bal=(Total_Contribution/Maximum_Tot_Bal)*100;
      Percentage_of_Contribution_in_Bal=Math.round(Percentage_of_Contribution_in_Bal*100)/100;
      console.log(Percentage_of_Contribution_in_Bal);

      Pie_Datas=[{"type":"Interest Earned", "amount":Percentage_of_Int_in_Bal},
      {"type":"Initial Investment", "amount":Percentage_of_Inves_in_Bal},
      {"type":"Total Contributions", "amount":Percentage_of_Contribution_in_Bal}];
      /* PIE DATA PROCESSING ENDS HERE */

      /* STACKED DATA PROCESSING STARTS HERE*/
      clone= JSON.parse(JSON.stringify(output));

      stack_keys_arr=clone.map(x=> Object.keys(x));
      stack_keys=stack_keys_arr[0];
      zero=stack_keys[0];
      one=stack_keys[1];
      two=stack_keys[2];
      three=stack_keys[3];
      four=stack_keys[4];
      five=stack_keys[5];

      Years = d3.map(clone, function(d){return(d[zero])}).keys()

      for(var i=0;i<clone.length;i++){
          objects=clone[i];
          objects[zero]=objects[zero].toString();
          objects[one]=objects[one].toString();
          delete objects[one];
          objects[two]=objects[two].toString();
          objects[three]=objects[three].toString();
          delete objects[three];
          objects[four]=objects[four].toString();
          objects[five]=objects[five].toString();
          delete objects[five];
      }
      console.log(clone);
      new_stack_keys_arr=clone.map(x=> Object.keys(x));
      new_stack_keys=new_stack_keys_arr[0];
      new_stack_keys.shift();
      console.log(new_stack_keys);

      Stacked_Datas= d3.stack()
      .keys(new_stack_keys)
      (clone);
      console.log(Stacked_Datas);

      xs=stack_keys[0];
      ys=stack_keys[4];
      ps=stack_keys[2];
      y_max=d3.max(output,function(d){
      return d[ys];
      });
      max_principal=d3.max(output,function(d){
      return d[ps];
      });
      /* STACKED DATA PROCESSING ENDS HERE */

      /* LINE DATA PROCESSING STARTS HERE */
      xl=line_headers[0];
      console.log(xl);
      var YI=line_headers[3];
      var YD=line_headers[1];
      var PA=line_headers[2];
      var TIN=line_headers[4];
      var TBAL=line_headers[5];
      for(var i=0;i<line_headers.length;i++){
          if(i==2||i==4||i==5){
              line_keys[j]=line_headers[i];
              j++;
          }
      }
      var line_Years=xl[0];
      console.log(line_Years);
      bl=line_keys[2];
     
      yl_max=d3.max(output,function(d){
          return d[bl];
      });
      console.log(yl_max);

      Year_array= output.map(a => a[xl]);
      Principal_array=output.map(a=> a[PA]);
      Intrest_array=output.map(a=> a[TIN]);
      Balance_array=output.map(a=>a[TBAL]);

      for(var i=0;i<Year_array.length;i++){
        new_line_objects={};
        new_line_objects.Year=Year_array[i];
        new_line_objects.Name="Principal";
        new_line_objects.Value=Principal_array[i];
        line_arr.push(new_line_objects);
      }
      for(var i=0;i<Year_array.length;i++){
        new_line_objects={};
        new_line_objects.Year=Year_array[i];
        new_line_objects.Name="Interest";
        new_line_objects.Value=Intrest_array[i];
        line_arr.push(new_line_objects);
      }
      for(var i=0;i<Year_array.length;i++){
        new_line_objects={};
        new_line_objects.Year=Year_array[i];
        new_line_objects.Name="Balance";
        new_line_objects.Value=Balance_array[i];
        line_arr.push(new_line_objects);
      }

      line_clone=JSON.parse(JSON.stringify(line_arr));
      var output_clone=JSON.parse(JSON.stringify(output));
      console.log(output_clone);
      line_keys_arr=line_clone.map(x=> Object.keys(x));
      lines_keys=line_keys_arr[0];
      zerol=lines_keys[0];
      console.log(zerol);
      onel=lines_keys[1];
      twol=lines_keys[2];

      for(var i=0;i<output_clone.length;i++){
        line_objects=output_clone[i];
        line_objects[xl]=line_objects[xl].toString();
        delete line_objects[YI];
        delete line_objects[YD];
      }
      console.log(output_clone);
      // for(var i=0;i<line_clone.length;i++){
      //   line_objects=line_clone[i];
      //   line_objects[zerol]=line_objects[zerol].toString();
      //   // line_objects[onel]=line_objects[onel].toString();
      //   // line_objects[twol]=line_objects[twol].toString();
      // }

      // console.log(line_clone);
      // Line_Datas=d3.nest()
      // .key(function(d){return d.Name})
      // .entries(line_clone);

      // console.log(line_arr);
      // console.log(Line_Datas);
      /* LINE DATA PROCESSING ENDS HERE */

  }

  if(value=="Pie Chart"){
    createPie(Pie_Datas,value);
  }
  if(value=="Bar Chart"){
    createBar(output,x,y,value);
  }
  if(value=="Stacked Bar Chart"){
    createStacks(Stacked_Datas,xs,y_max,max_principal,Years,value);
  }
  if(value=="Line Chart"){
    createLine(output,xl,line_keys,bl,yl_max,value,Line_Datas,output_clone);
  }
}

function Make_Charts(){
$(document).ready(function(){
  var value=viz.value;
  if($("#viz_selection option:selected") && value=="Bar Chart"){
      VizData(vizdata,value,tot_bal,tot_int,flag);
  }
});

document.getElementById("viz_selection").onchange =function(){
  var value=viz.value;
  if(value=="Pie Chart"){
    document.getElementById("Pie Chart").selected="true";
    VizData(vizdata,value,tot_bal,tot_int,flag);
  }
  if(value=="Bar Chart"){
    document.getElementById("Bar Chart").selected="true";
    VizData(vizdata,value,tot_bal,tot_int,flag);
  }
  if(value=="Stacked Bar Chart"){
    document.getElementById("Stacked Bar Chart").selected="true";
    VizData(vizdata,value,tot_bal,tot_int,flag);
  }
  if(value=="Line Chart"){
    document.getElementById("Line Chart").selected="true";
    VizData(vizdata,value,tot_bal,tot_int,flag);
  }
}

$(document).ready(function(){
  var value=viz.value;
  if($("#viz_selection option:selected") && value=="Pie Chart"){
      VizData(vizdata,value,tot_bal,tot_int,flag);
  }
});
$(document).ready(function(){
  var value=viz.value;
  if($("#viz_selection option:selected") && value=="Stacked Bar Chart"){
      VizData(vizdata,value,tot_bal,tot_int,flag);
  }
});
$(document).ready(function(){
  var value=viz.value;
  if($("#viz_selection option:selected") && value=="Pie and Bars"){
      VizData(vizdata,value,tot_bal,tot_int,flag);
  }
});
$(document).ready(function(){
  var value=viz.value;
  if($("#viz_selection option:selected") && value=="Line Chart"){
      VizData(vizdata,value,tot_bal,tot_int,flag);
  }
});

}
