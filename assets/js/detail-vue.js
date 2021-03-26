var awsBaseUrl = `https://martyr.s3.amazonaws.com/`
var cityName;
var cityNameMm;
var totDeath;
var martyrList;
var dateList;

const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    cityName = urlParams.get('city');
    totDeath = urlParams.get('totDeath');
    cityNameMm = cityArray[cityName];

(async function(){

    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/[MM]Detail Cases!A2:AB1094?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
    .then(res=>res.json())
    .then(response =>{
        martyrList = response.values;
        var tmpList = []
        martyrList.forEach(item => {
            console.log("City Eng " + cityName)
            console.log("City Name " + item[4])
            console.log("City Name in Array " + cityArray[cityName])
           
            if(cityName == "Bago" && item[0]=="ကိုမျိုးမင်းထွန်း"){

            }else if(cityName == "Yangon"){
            
                if(item[5]==cityArray[cityName]){
                    tmpList.push(item);
                    tmpList.sort(function(a,b){
                        var tmpDateA = new Date(a[1])
                        var tmpDateB = new Date(b[1])
                        return parseInt(tmpDateB.getTime())-parseInt(tmpDateA.getTime())
                    })
                }
            }else{
                
                if(item[4].replace(/ဦ/g,'ဦ')==cityArray[cityName]){
                    console.log("city " + item[4])
                    tmpList.push(item);
                    tmpList.sort(function(a,b){
                        var tmpDateA = new Date(a[1])
                        var tmpDateB = new Date(b[1])
                        return parseInt(tmpDateB.getTime())-parseInt(tmpDateA.getTime())
                    })
                }
            }
       
        });
       
        detailVM.martyrList = tmpList;
    }).catch(err => {

    });
    
    detailVM.totalDeath = totDeath
   
})();

var count = 0;

var img = `<img style="height:120px; width:120px !important;" v-bind:src="getImage(this.cname,todo[1],todo[0],todo[2])" @error="getDefaultImg" class="w-50 border mb-2">`
var mName = `<h6 class="card-title m-name"><strong>{{todo[0]}}</strong></h6>`;
var date = `<small class="date mt-1">{{dateModifyWithSlash(todo[1],"/")}}</small>`;
var age = `<small>အသက်({{todo[2]}})နှစ်</small>`;
var sex = `<small v-if="todo[3]=='M'">(ကျား)</small><small v-else-if="todo[3]=='F'">(မ)</small><small v-else>{{todo[3]}}</small>`;
var cod = `<td style="width: 10%;">{{todo[4]}}</td>`;
var state = `<td style="width: 10%;">{{todo[5]}}</td>`;
var pod = `<small class="pod mt-1 mb-2">{{todo[6]}}</small>`;
var address = `<small class="address mb-2">{{todo[7]}}</small>`;
var rod = `<td style="width: 18%;">{{todo[8]}}</td>`;
var contact = `<td style="width: 10%;">{{todo[9]}}</td>`;
// var profile = `<td style="width: 10%;">{{todo[10]}}</td>`;

var count1 = 0;
Vue.component('martyr-list', {
    props: ['todo'],
    template: `<div class="col-6 col-md-2 mt-2">
    <div class="card bg-dark">
    <div class="card-body text-center">
    ${img}
    ${mName}${age}<br>
    ${sex}
    <hr class="m-2">
    <small class="label">ကျဆုံးသည့်နေရက်</small>${date}
    <small class="label">ကျဆုံးသည့်နေရာ</small>${pod}
    <small class="label">နေရပ်လိပ်စာ</small>${address}
    </div></div>
    </div>`,
    data:function(){
        return{
            cc1 : 0,
            cname:cityName,
        }
    },
    mounted:
        function(){
            count1 += 1;
            this.cc1 = count1
            this.c
        
    },
    methods:{
        nameModify: function(name){
            // var tmp = name.replace("ဦ","ဦ");
            return name.replace(/ဦ/g,'ဦ');
        },
        dateModify: function(date){
            var tmp = new Date(date)
            var d = ("0"+tmp.getDate()).slice(-2)
            var m = ("0"+(tmp.getMonth()+1)).slice(-2)
            var y = tmp.getFullYear()
            return d+""+m+""+y
        },
        dateModifyWithSlash: function(date,divider){
            var tmp = new Date(date)
            var d = ("0"+tmp.getDate()).slice(-2)
            var m = ("0"+(tmp.getMonth()+1)).slice(-2)
            var y = tmp.getFullYear()
            return d+" "+divider+" "+m+" "+divider+" "+y
        },
        getImage: function(city,date,name,age){
           return `${awsBaseUrl}${city}/${this.dateModify(date)}/${this.nameModify(name)}-${age}.jpg`
        },
        getDefaultImg: function(event){
            event.target.src = `/assets/img/person.svg`
        }

    }
})

var detailVM = new Vue({
    el:'#detail',
    data:{
        cityName:cityNameMm,
        totalDeath:totDeath,
        martyrList: martyrList,
    }
})
