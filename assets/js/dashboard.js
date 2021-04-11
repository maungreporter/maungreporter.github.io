
var mmCityData = []
var enCityData = []
var jpCityData = []

var mmMapLocaList=[]
var enMapLocaList=[]
var jpMapLocaList=[]

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var ln = urlParams.get('ln') ;



var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear().toString().substr(-2);
var yy = today.getFullYear().toString()
var todayDD = dd + '/' + mm + '/' + yyyy;
var today = mm + '/' + dd + '/' + yyyy;

var d = new Date();
d.setDate(d.getDate() - 1);
var ydd = String(d.getDate()).padStart(2, '0');
var ymm = String(d.getMonth() + 1).padStart(2, '0');
var yyyyy = d.getFullYear().toString().substr(-2);
var yesterday = ydd + '/' + ymm + '/' + yyyyy;


var fuckingDate = new Date("02/01/2021")
var todayDate = new Date(today)
var differenceInTime = todayDate.getTime() - fuckingDate.getTime();
var totalDays = (differenceInTime / (1000 * 3600 * 24) + 1);



(async function(){
    
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${dataSource}/values/Dashboard?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
    .then(res=>res.json())
    .then(response =>{
        var result = response.values;
        var itemLength;
        var mainIndex = 0;
        var tmpDateList = []
        var tmpCountList = []
        var dateData = []
        
        var total = 0
        var todayCount = 0
        var lastDate;
        result.every(item => {
            if(item[0] == "မြို့အမည်"){
                itemLength = item.length
                lastDate = item[itemLength-3]
                last2Date = item[itemLength-4]
                console.log("LastDate" + lastDate)
                console.log("Today " + todayDD)
                var index = 0
                item.forEach(e => {
                    if(index > 0 && index <= itemLength - 3){
                        tmpDateList.push(e)
                    }
                    index++
                });
                
            }
            if(item[0] == "Daily Total"){
                var index = 0
                item.forEach(e => {
                    if(index > 0 && index <= itemLength - 3){
                        tmpCountList.push(e)
                    }
                    index++
                });
                
            }
            if(item[0]!= "မြို့အမည်" && item[0]!="Daily Total"){
                var index = 0
                var tmpCount = 0
                item.forEach(e=>{
                    if(index > 0 && index <= itemLength - 3 && e!=""){
                        tmpCount += parseInt(e)
                    }
                    if(index == itemLength-3 && e!=""){
                        todayCount += parseInt(e)
                    }
                    index++
                })
                total += tmpCount
                var todayDeathCity = 0
                if(item[itemLength-3] != "" && (todayDD == lastDate || yesterday == last2Date)){
                    todayDeathCity = parseInt(item[itemLength-3])
                }
                
                mmCityData.push({"city":getCityName(item[0],"mm"),"count":tmpCount,"today":todayDeathCity})
                mmCityData.sort(function(a,b){
                    return b.count-a.count
                })
                enCityData.push({"city":item[0],"count":tmpCount,"today":todayDeathCity})
                enCityData.sort(function(a,b){
                    return b.count-a.count
                })
                jpCityData.push({"city":getCityName(item[0],"jp"),"count":tmpCount,"today":todayDeathCity})
                jpCityData.sort(function(a,b){
                    return b.count-a.count
                })
                var tempSize = 20
                if((tmpCount*0.4)>20){
                    tempSize = tmpCount*0.4
                }
                mmMapLocaList.push({lat:getLat(item[0]),lng:getLng(item[0]),name:getCityName(item[0],"mm"),description:`ကျဆုံးသူ(${tmpCount})ဦး`,size:tempSize,url:`/detail-info/?city=${item[0]}&totDeath=${tmpCount}`})
                enMapLocaList.push({lat:getLat(item[0]),lng:getLng(item[0]),name:item[0],description:`Total Deaths - ${tmpCount}`,size:tempSize,url:`/detail-info/?city=${item[0]}&totDeath=${tmpCount}`})
                jpMapLocaList.push({lat:getLat(item[0]),lng:getLng(item[0]),name:getCityName(item[0],"jp"),description:`死者数 - ${tmpCount}人`,size:tempSize,url:`/detail-info/?city=${item[0]}&totDeath=${tmpCount}`})
                
            }
            if(item[0] == "Daily Total"){
                return false
            }
            return true
        });

        for(var i=tmpDateList.length-1; i>=0; i--){
                dateData.push({"date":modifyDate(tmpDateList[i]),"count":tmpCountList[i]})
        }
        appVM.dateData = dateData
        // appVM.cityData = mmCityData
        appVM.totalCity = mmCityData.length
        appVM.total = total
        console.log("today" + todayCount)
        //data source ဘက်က excel မှာ date မှားဖြည့်တတ်လို့ ရှေ့ရက်နဲ့ပါ ပြန်စစ်ထားရ
        if(todayDD == lastDate || yesterday == last2Date){
            appVM.todayCount = todayCount
        }
        
       
    }).catch(err => {

    });
    var totalDeath = 0
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${allSource}/values/[MM]Detail Cases!A2:AB1094?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
    .then(res=>res.json())
    .then(response =>{
        var result = response.values;
        
        result.forEach(item => {
            if(item[2]!="" && parseInt(item[2]) < 18){
                totalDeath ++
            }
        });
       
    }).catch(err => {

    });
    
    appVM.underEighteen = totalDeath
    appVM.mapLocalList = mmMapLocaList

    
    console.log("ln " + ln)
if(ln == "en"){
    appVM.urlOne = `/?ln=en`
    appVM.urlTwo = `/under18/?ln=en`
    appVM.urlThree = `/dashboard/?ln=en`
    appVM.cityData = enCityData
    simplemaps_countrymap_mapdata.locations=enMapLocaList
    simplemaps_countrymap_mapdata.state_specific=enState
    
    
   
}else if(ln == "jp"){
    appVM.urlOne = `/?ln=jp`
    appVM.urlTwo = `/under18/?ln=jp`
    appVM.urlThree = `/dashboard/?ln=jp`
    appVM.cityData = jpCityData
    simplemaps_countrymap_mapdata.locations=jpMapLocaList
    simplemaps_countrymap_mapdata.state_specific=jpState
   
}else {
    appVM.urlOne = `/?ln=mm`
    appVM.urlTwo = `/under18/?ln=mm`
    appVM.urlThree = `/dashboard/?ln=mm`
    appVM.cityData = mmCityData
    simplemaps_countrymap_mapdata.locations=mmMapLocaList
    simplemaps_countrymap_mapdata.state_specific=mmState
 
}

configureCityOnMap()


})();



Vue.component('date-graph',{
    props:['todo'],
    template:`<div class="mb-2">
                <h6>{{todo.date}}</h6>     
                <div class="progress" style="height: 5px;">
                    <div class="progress-bar" :style="getWidth(todo.count)"></div>
                </div>
                <div :style="getClass(todo.count)"><small class="clear-float">{{todo.count}}</small></div>
    </div>`,
    methods:{
        getWidth: function(count){
            var modifyCount = count * 0.5
            var style = `width: ${modifyCount}%;`
            if(count > 100){
                style = `width: ${modifyCount}%; background:lightcoral;`
            }else if(count >=50 && count < 100){
                style = `width: ${modifyCount}%; background:orange;`
            }else if(count >=25 && count < 50) {
                style = `width: ${modifyCount}%; background:yellow;`
            }else{
                style = `width: ${modifyCount}%; background:green;`
            }
            return style
        },
        getClass: function(count){
            var modifyCount = count * 0.5
            return `padding-left:${modifyCount}%;`
        }
    }
})

Vue.component('city-graph',{
    props:['todo'],
    template:`<div class="mb-2">
                <h6>{{todo.city}}<small v-if="todo.today>0" v-html="getTodayCityDeathLabel(todo.today)"　class="text-danger"></small></h6>     
                <div class="progress" style="height: 5px;">
                    <div class="progress-bar" :style="getWidth(todo.count)"></div>
                </div>
                <div :style="getClass(todo.count)"><small class="clear-float">{{todo.count}}</small></div>
    </div>`,
    methods:{
        getWidth: function(count){
            var modifyCount = count * 0.4
            var style = `width: ${modifyCount}%;`
            if(count > 100){
                style = `width: ${modifyCount}%; background:lightcoral;`
            }else if(count >=50 && count < 100){
                style = `width: ${modifyCount}%; background:orange;`
            }else if(count >=25 && count < 50) {
                style = `width: ${modifyCount}%; background:yellow;`
            }else{
                style = `width: ${modifyCount}%; background:green;`
            }
            return style
        },
        getClass: function(count){
            var modifyCount = count * 0.4
            return `padding-left:${modifyCount}%;`
        },
        getTodayCityDeathLabel(death){
            if(appVM.todayCityDeathLabel == "mm"){
                return `ယနေ (${death}) ဦး`
            }
            if(appVM.todayCityDeathLabel == "en"){
                if(parseInt(death) > 1){
                    return `Today (${death}) persons`
                }else{
                    return `Today (${death}) person`
                }   
            }
            if(appVM.todayCityDeathLabel == "jp"){
                return `本日 (${death}) 人`
            }
        },
    }
})



var appVM = new Vue({
    el:'#app',
    data:{
        urlOne:`/`,
        urlTwo:`/under18/`,
        urlThree:`/dashboard/`,
        navOne:'',
        navTwo:'',
        navThree:'',
        navFour:'',
        mm:'',
        en:'',
        jp:'',
        brandTitle: '',
        mmLanClass : "p-1 rounded",
        enLanClass : "p-1 rounded",

        bodyTitle:'',
        dataSource:'',
        totalDaysLabel:'',
        totalDeathLabel:'',
        under18DeathLabel:'',
        todayDeathLabel:'',
        cityGraphLabel:'',
        totalLabel:'',
        dailyGraphLabel:'',
        todayCityDeathLabel: '',

        mapLocalList: [],
        dateData: [],
        cityData: [],
        totalCity: 0,
        total:0,
        totalDays:totalDays,
        underEighteen: 0,
        todayCount:0
    },
    methods:{
        changeLang: function(lang){
            if(lang == "mm"){
                
                location.assign("/dashboard/?ln=mm")
                
            }
            if(lang == "en"){
                
                location.assign("/dashboard/?ln=en")
            }
            if(lang == "jp"){
               
                location.assign("/dashboard/?ln=jp")
            }

           
        }
    }
})



function modifyDate(date){
   
    var tmpDate = date.split("/")
    
    var dd = tmpDate[0].padStart(2, '0');
    var mm = tmpDate[1].padStart(2, '0'); 
    var yyyy = "20"+tmpDate[2];

    var modDate = dd + ' / ' + mm + ' / ' + yyyy;
    
    return modDate

}

function getLat(city){
    try {
        return latlng[city].lat;
    } catch (error) {
        return "";
    }
}
function getLng(city){
    try {
        return latlng[city].lng;
    } catch (error) {
        return "";
    }
}



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

    appVM.bodyTitle=enBodyTitleSec
    appVM.dataSource=enDataSource
    appVM.totalDaysLabel=enTotalDaysLabel
    appVM.totalDeathLabel=enTotalDeathLabel
    appVM.under18DeathLabel=enUnder18
    appVM.todayDeathLabel=enTodayDeathLabel
    appVM.cityGraphLabel = enCityGraphLabel
    appVM.totalLabel = enTotal
    appVM.dailyGraphLabel = enDailyGraphLabel
    appVM.todayCityDeathLabel = enTodayCityDeathLabel
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

    appVM.bodyTitle=jpBodyTitleSec
    appVM.dataSource=jpDataSource
    appVM.totalDaysLabel=jpTotalDaysLabel
    appVM.totalDeathLabel=jpTotalDeathLabel
    appVM.under18DeathLabel=jpUnder18
    appVM.todayDeathLabel=jpTodayDeathLabel
    appVM.cityGraphLabel = jpCityGraphLabel
    appVM.totalLabel = jpTotal
    appVM.dailyGraphLabel = jpDailyGraphLabel
    appVM.todayCityDeathLabel = jpTodayCityDeathLabel
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

    appVM.bodyTitle=mmBodyTitleSec
    appVM.dataSource=mmDataSource
    appVM.totalDaysLabel=mmTotalDaysLabel
    appVM.totalDeathLabel=mmTotalDeathLabel
    appVM.under18DeathLabel=mmUnder18
    appVM.todayDeathLabel=mmTodayDeathLabel
    appVM.cityGraphLabel = mmCityGraphLabel
    appVM.totalLabel = mmTotal
    appVM.dailyGraphLabel = mmDailyGraphLabel
    appVM.todayCityDeathLabel = mmTodayCityDeathLabel
}