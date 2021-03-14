var martyrList ;

(async function(){

    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/[MM]Detail Cases?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
    .then(res=>res.json())
    .then(response =>{
        martyrList = response.values;
        
        console.log("martyrList" + martyrList);
        martyrVM.martyrList = martyrList;
    }).catch(err => {

    });
    
    
   

})();





var count = 0;


var no = `<td style="width: 2%;" v-if="this.cc1 > 1">{{this.cc1-1}}</td><td style="width: 2%;" v-else="this.cc == 1" ></td>`;
var mName = `<td style="width: 10%;">{{todo[0]}}</td>`;
var date = `<td style="width: 10%;">{{todo[1]}}</td>`;
var age = `<td style="width: 4%;">{{todo[2]}}</td>`;
var sex = `<td style="width: 4%;">{{todo[3]}}</td>`;
var cod = `<td style="width: 10%;">{{todo[4]}}</td>`;
var state = `<td style="width: 10%;">{{todo[5]}}</td>`;
var pod = `<td style="width: 16%;">{{todo[6]}}</td>`;
var address = `<td style="width: 16%;">{{todo[7]}}</td>`;
var rod = `<td style="width: 18%;">{{todo[8]}}</td>`;
var contact = `<td style="width: 10%;">{{todo[9]}}</td>`;
// var profile = `<td style="width: 10%;">{{todo[10]}}</td>`;




Vue.component('martyr-list', {
    props: ['todo'],
    template: `<thead v-if="this.cc ==1"><tr>${no}${mName}${date}${age}${sex}${cod}${pod}${rod}${address}${contact}</tr></thead>`,
    data:function(){
        return{
            cc : 0
        }
    },
    mounted:
        function(){
            console.log(count);
            count += 1;
            // martyrVM.vmCount = count-1
            this.cc = count
        
    }
})
var count1 = 0;
Vue.component('martyr-lists', {
    props: ['todo'],
    template: `<thead v-if="this.cc1 >1"><tr>${no}${mName}${date}${age}${sex}${cod}${pod}${rod}${address}${contact}</tr></thead>
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

var martyrVM = new Vue({
    el:'#martyr',
    data:{
        martyrList: martyrList,
        vmCount: 0
    }
})

