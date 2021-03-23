var awsBaseUrl = `https://martyr.s3.amazonaws.com/`
var cityName;
var totDeath;
var martyrList;
var dateList;

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
                "Chaung Oo":"ချောင်းဦး",
                "Hpakan":"ဖားကန့်",
                "Aungban":"အောင်ပန်း",
                "Thabeikkyin":"သပိတ်ကျင်း",
                "Kawlin":"ကောလင်း",
                "Gyobingauk":"ကြို့ပင်ကောက်",
                "Pyigyimandaing":"ပြည်ကြီးမဏ္ဍိုင်",
                "Muse":"မူဆယ်",
                "Taunggyi":"တောင်ကြီး",
                "Loikaw":"လွိုင်ကော်",
                "Mogok":"မိုးကုတ်",
                "Singu":"စဉ့်ကူး"
                };

(async function(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    cityName = urlParams.get('city');
    totDeath = urlParams.get('totDeath');
    


    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/[MM]Detail Cases!A2:AB1094?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
    .then(res=>res.json())
    .then(response =>{
        martyrList = response.values;
        var tmpList = []
        martyrList.forEach(item => {
           
            if(cityName == "Bago" && item[0]=="ကိုမျိုးမင်းထွန်း"){

            }else if(cityName == "Yangon"){
            
                if(item[5]==cityArray[cityName]){
                    tmpList.push(item);
                    tmpList.sort(function(a,b){

                        var tmpDateA = new Date(a[1])
                        var tmpDateB = new Date(b[1])

                        // var tmpDateA = a[1].split("/")
                        // var dateA = tmpDateA[2]+tmpDateA[0]+tmpDateA[0]
                        // var tmpDateB = b[1].split("/")
                        // var dateB = tmpDateB[2]+tmpDateB[1]+tmpDateB[0]
                        
                        return parseInt(tmpDateB.getTime())-parseInt(tmpDateA.getTime())
                        // console.log(parseInt(a[1].replace(/\//g,'')))
                        // return (parseInt(a[1].replace(/\//g,''))-parseInt(b[1].replace(/\//g,'')))
                    })
                }
            }else{
                
                if(item[4]==cityArray[cityName]){
                    tmpList.push(item);
                    tmpList.sort(function(a,b){
                        var tmpDateA = new Date(a[1])
                        var tmpDateB = new Date(b[1])
                        return parseInt(tmpDateB.getTime())-parseInt(tmpDateA.getTime())
                        // var tmpDateA = a[1].split("/")
                        // var dateA = tmpDateA[2]+tmpDateA[1]+tmpDateA[0]
                        // var tmpDateB = b[1].split("/")
                        // var dateB = tmpDateB[2]+tmpDateB[1]+tmpDateB[0]
                        // return parseInt(dateB)-parseInt(dateA)
                    })
                }
            }
       
        });
       
        detailVM.martyrList = tmpList;
        // tmpDateList = tmpDateList.filter((x,i,a)=>a.indexOf(x) == i)
    }).catch(err => {

    });
    
    detailVM.cityName = cityName
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
            var tmp = name.replace("ဦ","ဦ");
            return tmp.replace("ဦ","ဦ");
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
        cityName:cityName,
        totalDeath:totDeath,
        martyrList: martyrList,
    }
})
