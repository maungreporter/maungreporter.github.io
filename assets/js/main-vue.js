var martyrList ;
var cityList;


(async function(){
    
    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/[MM]Detail Cases?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
    .then(res=>res.json())
    .then(response =>{
        martyrList = response.values;
        var yangon = []
       martyrList.forEach(item => {
        if(item[5]=="ရန်ကုန်"){
            yangon.push(item);
        }
       });
       
        martyrVM.martyrList = martyrList;
    }).catch(err => {

    });

    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/Dashboard!A2:AJ30?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
    .then(res=>res.json())
    .then(response =>{
        var result = response.values;
        var tmpList = []
        var tcount = 0
        result.forEach(item => {
            tmpList.push({"city":item[0],"totalDeath":item[item.length-1]});
            tcount += parseInt(item[item.length-1]);
        });
       cityList = tmpList;
        martyrVM.cityList = cityList;
        martyrVM.vmCount = tcount;
    }).catch(err => {

    });
    
   
   

})();





var count = 0;


var no = `<td style="width: 2%;" v-if="this.cc1 > 1">{{this.cc1-1}}</td><td style="width: 2%;" v-else="this.cc == 1" ></td>`;
var mName = `<td style="width: 10%;">{{todo[0]}}</td>`;
var date = `<td style="width: 10%;">{{todo[1]}}</td>`;
var age = `<td style="width: 4%;text-align:center;">{{todo[2]}}</td>`;
var sex = `<td style="width: 4%; text-align:center;" v-if="todo[3]=='M'">ကျား</td><td style="width: 4%; text-align:center;" v-else-if="todo[3]=='F'">မ</td><td style="width: 4%; text-align:center;" v-else>{{todo[3]}}</td>`;
var cod = `<td style="width: 10%;">{{todo[4]}}</td>`;
var state = `<td style="width: 10%;">{{todo[5]}}</td>`;
var pod = `<td style="width: 16%;">{{todo[6]}}</td>`;
var address = `<td style="width: 16%;">{{todo[7]}}</td>`;
var rod = `<td style="width: 18%;">{{todo[8]}}</td>`;
var contact = `<td style="width: 10%;">{{todo[9]}}</td>`;
// var profile = `<td style="width: 10%;">{{todo[10]}}</td>`;

var count1 = 0;
Vue.component('martyr-list', {
    props: ['todo'],
    template: `<tr>${no}${mName}${date}${age}${sex}${cod}${pod}${rod}${address}${contact}</tr>
    `,
    data:function(){
        return{
            cc1 : 0
        }
    },
    mounted:
        function(){
            console.log(count1);
            count1 += 1;
            martyrVM.vmCount = count1-1
            this.cc1 = count1
        
    }
})

var showCity = `<h5 class="card-title">{{todo.city}}</h5>`
var showTotDeath = `<h6>Total Detah : {{todo.totalDeath}}</h6>`
var showList = `<a :href="'/detail-info/?city='+todo.city+'&totDeath='+todo.totalDeath"><small>အသေးစိတ် အချက်အလက်ကြည့်ရန် နှိပ်ပါ</small></a>`
Vue.component('city-list',{
    props:['todo'],
    template:`<div class="col-12 col-md-2 mt-2">
    <div class="card"><div class="card-body">
    ${showCity}${showTotDeath}${showList}
    </div></div></div>`
})

var martyrVM = new Vue({
    el:'#martyr',
    data:{
        martyrList: martyrList,
        cityList:cityList,
        vmCount: 0
    }
})



