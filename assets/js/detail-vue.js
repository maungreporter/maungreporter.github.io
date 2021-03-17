
var cityName;
var totDeath;
var martyrList;


// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
var cityArray = {"Yangon":"ရန်ကုန်",
                "Mandalay":"မန္တလေး",
                "Monywa":"မုံရွာ",
                "Myaing":"မြိုင်",
                "Dawei":"ထားဝယ်",
                "Bago":"ပဲခူး",
                "Myingyan":"မြင်းခြံ",
                "Pathein":"ပုသိမ်",
                "Mawlamyaing":"မော်လမြိုင်",
                "Pwint Phyu":"ပွင့်ဖြူ",
                "Myitkyina":"မြစ်ကြီးနား",
                "Pyay":"ပြည်",
                "Aunglan":"အောင်လံ",
                "Pakokku":"ပခုက္ကူ",
                "Naypyidaw":"နေပြည်တော်",
                "Myeik":"မြိတ်",
                "Taungdwingyi":"တောင်တွင်းကြီး",
                "Salin":"စလင်း",
                "Kalay":"ကလေး",
                "Htilin":"ထီးလင်း",
                "Pyapon":"ဖျာပုံ",
                "Chauk":"ချောက်",
                "Hpakan":"ဖားကန့်",
                "Aungban":"အောင်ပန်း",
                "Thabeikkyin":"သပိတ်ကျင်း",
                "Kawlin":"ကောလင်း",
                "Gyobingauk":"ကြို့ပင်ကောက်",
                "Pyigyimandaing":"ပြည်ကြီးမဏ္ဍိုင်",
                "Muse":"မူဆယ်",
                };

(async function(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    cityName = urlParams.get('city');
    totDeath = urlParams.get('totDeath');
    console.log(cityName);
    


    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/[MM]Detail Cases!A2:AB1094?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
    .then(res=>res.json())
    .then(response =>{
        martyrList = response.values;
        var tmpList = []
       martyrList.forEach(item => {
        if(cityName == "Yangon"){
            if(item[5]==cityArray[cityName]){
                tmpList.push(item);
            }
        }else{
            if(item[4]==cityArray[cityName]){
                tmpList.push(item);
            }
        }
       
       });
       
        detailVM.martyrList = tmpList;
    }).catch(err => {

    });
    
    detailVM.cityName = cityName
    detailVM.totalDeath = totDeath
   
})();






var count = 0;

var img = `<img src="/assets/img/person.svg" class="w-50 border mb-2">`
var mName = `<h6 class="card-title m-name"><strong>{{todo[0]}}</strong></h6>`;
var date = `<small class="date mt-1">{{todo[1]}}</small>`;
var age = `<small>အသက်({{todo[2]}})နှစ်</small>`;
var sex = `<small v-if="todo[3]=='M'">(ကျား)</small><small v-else-if="todo[3]=='F'">(မ)</small><small v-else>{{todo[3]}}</small>`;
var cod = `<td style="width: 10%;">{{todo[4]}}</td>`;
var state = `<td style="width: 10%;">{{todo[5]}}</td>`;
var pod = `<small class="pod mt-1 mb-2">{{todo[6]}}</small>`;
var address = `<small class="address">{{todo[7]}}</small>`;
var rod = `<td style="width: 18%;">{{todo[8]}}</td>`;
var contact = `<td style="width: 10%;">{{todo[9]}}</td>`;
// var profile = `<td style="width: 10%;">{{todo[10]}}</td>`;

var count1 = 0;
Vue.component('martyr-list', {
    props: ['todo'],
    template: `<div class="col-12 col-md-2 mt-2">
    <div class="card">
    <div class="card-body text-center">
    ${img}
    ${mName}${age}<br>
    ${sex}
    <hr class="m-2">
    <small class="label">ကျဆုံးသည့်နေရက်</small>${date}
    <small class="label">ကျဆုံးသည့်နေရာ</small>${pod}
    <small class="label">နေရပ်လိပ်စာ</small>${address}
    </div></div></div>`,
    data:function(){
        return{
            cc1 : 0
        }
    },
    mounted:
        function(){
            console.log(count1);
            count1 += 1;
            this.cc1 = count1
        
    }
})

var detailVM = new Vue({
    el:'#detail',
    data:{
        cityName:cityName,
        totalDeath:totDeath,
        martyrList: martyrList,
    }
})

