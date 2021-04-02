var awsBaseUrl = `https://martyr.s3.amazonaws.com/`
var cityArraycityName;
var cityNameMm;
var totDeath = 0;
var martyrList;
var dateList;



(async function(){

    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/[MM]Detail Cases!A2:AB1094?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
    .then(res=>res.json())
    .then(response =>{
        martyrList = response.values;
        var tmpList = []
        martyrList.forEach(item => {
            if(item[2]!="" && parseInt(item[2]) < 18){
                totDeath ++
                tmpList.push(item);
                tmpList.sort(function(a,b){
                    var tmpAgeA = parseInt(a[2])
                    var tmpAgeB = parseInt(b[2])
                    return tmpAgeA-tmpAgeB
                })
            }
            
       
        });
       
        underEighteenVM.martyrList = tmpList;
    }).catch(err => {

    });
    
    underEighteenVM.totalDeath = totDeath
   
})();

var count = 0;

var img = `<img style="height:120px; width:120px !important;" v-bind:src="getImage(todo[5],todo[4],todo[1],todo[0],todo[2])" @error="getDefaultImg" class="w-50 border mb-2">`
var mName = `<h6 class="card-title m-name mm"><strong>{{todo[0]}}</strong></h6>`;
var date = `<small class="date mt-1">{{dateModifyWithSlash(todo[1],"/")}}</small>`;
var age = `<small class="mm">အသက်({{todo[2]}})နှစ်</small>`;
var sex = `<small class="mm" v-if="todo[3]=='M'">(ကျား)</small><small class="mm" v-else-if="todo[3]=='F'">(မ)</small><small class="mm" v-else>(-)</small>`;
var cod = `<td style="width: 10%;">{{todo[4]}}</td>`;
var state = `<td style="width: 10%;">{{todo[5]}}</td>`;
var pod = `<small class="pod mt-1 mb-2 mm">{{todo[6]}}</small>`;
var address = `<small class="address mb-2 mm">{{todo[7]}}</small>`;
var rod = `<td style="width: 18%;">{{todo[8]}}</td>`;
var contact = `<td style="width: 10%;">{{todo[9]}}</td>`;
// var profile = `<td style="width: 10%;">{{todo[10]}}</td>`;

var count1 = 0;
Vue.component('martyr-list', {
    props: ['todo'],
    template: `<div class="col-6 col-md-4 col-lg-3 col-xl-2 mt-2">
    <div class="card bg-dark">
    <div class="card-body text-center">
    ${img}
    ${mName}${age}<br>
    ${sex}
    <hr class="m-2">
    <small class="label mm">ကျဆုံးသည့်နေရက်</small>${date}
    <small class="label">ကျဆုံးသည့်နေရာ</small>${pod}
    <small class="label mm">နေရပ်လိပ်စာ</small>${address}
    </div></div>
    </div>`,
    methods:{
        nameModify: function(name){
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
        getKeyByValue: function(object,value){
            return Object.keys(object).find(key => object[key] === value);
        },
        getImage: function(division,city,date,name,age){
            var tmpCityName = this.getKeyByValue(cityArray,city)
            if(division == "ရန်ကုန်"){
                tmpCityName = this.getKeyByValue(cityArray,division)
            }
           return `${awsBaseUrl}${tmpCityName}/${this.dateModify(date)}/${this.nameModify(name)}-${age}.jpg?2021032802`
        },
        getDefaultImg: function(event){
            event.target.src = `/assets/img/person.svg`
        }

    }
})

var underEighteenVM = new Vue({
    el:'#underEighteen',
    data:{
        title:`အသက်(၁၈)နှစ်အောက် ကျဆုံးသူများ`,
        totalDeath:totDeath,
        martyrList: martyrList,
    }
})
