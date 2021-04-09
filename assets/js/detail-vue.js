var awsBaseUrl = `https://martyr.s3.amazonaws.com/`
var cityArraycityName;
var totDeath;
var martyrList;
var dateList;

const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    cityName = urlParams.get('city');
    totDeath = urlParams.get('totDeath');
var mmCity = getCityName(cityName,"mm");
var enCity = cityName
var jpCity = getCityName(cityName,"jp");
var ln = urlParams.get('ln') ;


(async function(){

    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/[MM]Detail Cases!A2:AB1094?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
    .then(res=>res.json())
    .then(response =>{
        martyrList = response.values;
        var tmpList = []
        martyrList.forEach(item => {
           
            if(cityName == "Bago" && item[0]=="ကိုမျိုးမင်းထွန်း"){

            }else if(cityName == "Yangon" || cityName == "Naypyidaw"){
            
                if(item[5]==getCityName(cityName,"mm")){
                    tmpList.push(item);
                    tmpList.sort(function(a,b){
                        var tmpDateA = new Date(a[1])
                        var tmpDateB = new Date(b[1])
                        return parseInt(tmpDateB.getTime())-parseInt(tmpDateA.getTime())
                    })
                }
            }else{
                if(item[4].replace(/ဦ/g,'ဦ')==getCityName(cityName,"mm")||item[4] == getCityName(cityName,"mm")){
                   
                    tmpList.push(item);
                    tmpList.sort(function(a,b){
                        var tmpDateA = new Date(a[1])
                        var tmpDateB = new Date(b[1])
                        return parseInt(tmpDateB.getTime())-parseInt(tmpDateA.getTime())
                    })
                }
            }
       
        });
       
        appVM.martyrList = tmpList;
    }).catch(err => {

    });
    
    appVM.totalDeath = totDeath
   
})();

var count = 0;

var img = `<img style="height:120px; width:120px !important;" v-bind:src="getImage(this.cname,todo[1],todo[0],todo[2])" @error="getDefaultImg" class="w-50 border mb-2">`
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
           return `${awsBaseUrl}${city}/${this.dateModify(date)}/${this.nameModify(name)}-${age}.jpg?2021032802`
        },
        getDefaultImg: function(event){
            event.target.src = `/assets/img/person.svg`
        }

    }
})

var appVM = new Vue({
    el:'#app',
    data:{
        urlOne:`/`,
        urlTwo:`/under18/`,
        urlThree:`/dashboard/`,
        navOne:mmNavHome,
        navTwo:mmUnder18,
        navThree:mmDashboard,
        navFour:mmLanguage,
        mm:mmMyanmar,
        en:mmEnglsih,
        jp:mmJapanese,
        brandTitle: mmBrandTitle,
        mmLanClass : "p-1 rounded",
        enLanClass : "p-1 rounded",

        bodyTitle:mmBodyTitle,
        cityName:mmCity,
        totalDeathLabel : mmTotalDeathLabel,
        totalDeath:totDeath,
        martyrList: martyrList,
    },
    methods:{
        changeLang: function(lang){
            if(lang == "mm"){
                this.urlOne = `/?ln=mm`
                this.urlTwo = `/under18/?ln=mm`
                this.urlThree = `/dashboard/?ln=mm`
                this.brandTitle = mmBrandTitle
                this.navOne = mmNavHome
                this.navTwo = mmUnder18
                this.navThree = mmDashboard
                this.navFour = mmLanguage
                this.mm = mmMyanmar
                this.en = mmEnglsih
                this.jp = mmJapanese
                this.bodyTitle = mmBodyTitle
                this.cityName = mmCity

                this.totalDeathLabel = mmTotalDeathLabel

            }
            if(lang == "en"){
                this.urlOne = `/?ln=en`
                this.urlTwo = `/under18/?ln=en`
                this.urlThree = `/dashboard/?ln=en`
                this.brandTitle = enBrandTitle
                this.navOne = enNavHome
                this.navTwo = enUnder18
                this.navThree = enDashboard
                this.navFour = enLanguage
                this.mm = enMyanmar
                this.en = enEnglsih
                this.jp = enJapanese
                this.bodyTitle = enBodyTitle
                this.cityName = enCity

                this.totalDeathLabel = enTotalDeathLabel

            }
            if(lang == "jp"){
                this.urlOne = `/?ln=jp`
                this.urlTwo = `/under18/?ln=jp`
                this.urlThree = `/dashboard/?ln=jp`
                this.brandTitle = jpBrandTitle
                this.navOne = jpNavHome
                this.navTwo = jpUnder18
                this.navThree = jpDashboard
                this.navFour = jpLanguage
                this.mm = jpMyanmar
                this.en = jpEnglsih
                this.jp = jpJapanese
                this.bodyTitle = jpBodyTitle
                this.cityName = jpCity

                this.totalDeathLabel = jpTotalDeathLabel
            }

           
        }
    }
})

if(ln == "en"){
    appVM.urlOne = `/?ln=en`
    appVM.urlTwo = `/under18/?ln=en`
    appVM.urlThree = `/dashboard/?ln=en`
    appVM.navOne=enNavHome
    appVM.navTwo=enUnder18
    appVM.navThree=enDashboard
    appVM.navFour=enLanguage
    appVM.mm=enMyanmar
    appVM.en=enEnglsih
    appVM.jp=enJapanese
    appVM.brandTitle= enBrandTitle

    appVM.bodyTitle=enBodyTitle
    appVM.cityName = enCity
    appVM.totalDeathLabel = enTotalDeathLabel

}else if(ln == "jp"){
    appVM.urlOne = `/?ln=jp`
    appVM.urlTwo = `/under18/?ln=jp`
    appVM.urlThree = `/dashboard/?ln=jp`
    appVM.navOne=jpNavHome
    appVM.navTwo=jpUnder18
    appVM.navThree=jpDashboard
    appVM.navFour=jpLanguage
    appVM.mm=jpMyanmar
    appVM.en=jpEnglsih
    appVM.jp=jpJapanese
    appVM.brandTitle= jpBrandTitle
    
    appVM.bodyTitle=jpBodyTitle
    appVM.cityName = jpCity
    appVM.totalDeathLabel = jpTotalDeathLabel
}else {
    appVM.urlOne = `/?ln=mm`
    appVM.urlTwo = `/under18/?ln=mm`
    appVM.urlThree = `/dashboard/?ln=mm`
    appVM.navOne=mmNavHome
    appVM.navTwo=mmUnder18
    appVM.navThree=mmDashboard
    appVM.navFour=mmLanguage
    appVM.mm=mmMyanmar
    appVM.en=mmEnglsih
    appVM.jp=mmJapanese
    appVM.brandTitle= mmBrandTitle
   
    appVM.bodyTitle=mmBodyTitle
    appVM.cityName = mmCity
    appVM.totalDeathLabel = mmTotalDeathLabel
}