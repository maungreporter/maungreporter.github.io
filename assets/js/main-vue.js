
//   var userAgent = window.navigator.userAgent.toLowerCase()
//   console.log(userAgent)
//   if(userAgent.includes('wv')){
//       location.href = 'https://maungreporter.github.io/copy-right/';
//    }
var martyrList ;
var mmList = [];
var jpList = []
var engList = []
var appLight = "container main-content p-0";
var appDark = "container main-content p-0 dark";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var ln = urlParams.get('ln') ;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear().toString().substr(-2);

var today = dd + '/' + mm + '/' + yyyy;

var d = new Date();
d.setDate(d.getDate() - 1);
var ydd = String(d.getDate()).padStart(2, '0');
var ymm = String(d.getMonth() + 1).padStart(2, '0');
var yyyyy = d.getFullYear().toString().substr(-2);
var yesterday = ydd + '/' + ymm + '/' + yyyyy;




(async function(){
    
  

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${dataSource}/values/Dashboard?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
    .then(res=>res.json())
    .then(response =>{
        var result = response.values;
        var tmpList = []
       
        var tcount = 0
        var todayCount = 0
        var mainIndex = 0
        var tmpTot = 0
        var itemLength;
        var lastdate;
        var last2Date;
        result.every(item => {
            if(mainIndex == 0){
                itemLength = item.length
                lastdate = item[itemLength-3]
                last2Date = item[itemLength-4]
                mainIndex++
                return true

            }else if(item[0] == "Daily Total"){
                mainIndex++
                return false
            }
            else{
                var index = 0
                item.forEach(e => {
                    if(index > 0 && index < itemLength-3){
                        if(e != ""){
                            tmpTot += parseInt(e)
                        } 
                    }
                    index ++
                })

                var todayDeathCity = 0;
                var tmpTodayDeathCity = 0;
                if(item.length == itemLength){
                    if(item[itemLength-3]!=""){
                        todayCount += parseInt(item[itemLength-3])
                        tmpTodayDeathCity = parseInt(item[itemLength-3])
                        if(today == lastdate || yesterday == last2Date){
                            todayDeathCity = parseInt(item[itemLength-3])
                        }
                    }
                }
                
                var mmCity = getCityName(item[0],"mm")
                var jpCity = getCityName(item[0],"jp")
                tmpList.push({"city":mmCity,"cityEng":item[0],"totalDeath":(tmpTot+tmpTodayDeathCity), "todayDeath": todayDeathCity});
                tmpList.sort(function(a,b){
                    return (b.totalDeath) - (a.totalDeath)
                })
                engList.push({"city":item[0],"cityEng":item[0],"totalDeath":(tmpTot+tmpTodayDeathCity), "todayDeath": todayDeathCity});
                engList.sort(function(a,b){
                    return (b.totalDeath) - (a.totalDeath)
                })
                jpList.push({"city":jpCity,"cityEng":item[0],"totalDeath":(tmpTot+tmpTodayDeathCity), "todayDeath": todayDeathCity});
                jpList.sort(function(a,b){
                    return (b.totalDeath) - (a.totalDeath)
                })
                tcount += tmpTot
                tmpTot = 0
            }
            mainIndex ++
            return true
            
        });
       mmList = tmpList
        if(ln == "mm"){
            
            appVM.cityList = mmList

        }else if(ln == "jp"){
            appVM.cityList = jpList
        }else{
            appVM.cityList = engList
        }
       
       appVM.vmCount = tcount;
       appVM.vmTodayCount = todayCount
        if(today==lastdate){
            appVM.vmTodayTotalCount=todayCount
        }
        if(yesterday==lastdate){
            appVM.vmYesterdayTotalCount=todayCount
        }
        
    }).catch(err => {

    });

    window.onscroll = function() {appVM.scrollFunction()};
    
   
})();


var showCity = `<h5 class="city-name card-title mm">{{todo.city}} <small v-if="todo.todayDeath>0" v-html="getTodayCityDeathLabel(todo.todayDeath)" class="text-danger"></small></h5>`
var showTotDeath = `<h6 class="mm">{{getCityDeathLabel()}} - {{todo.totalDeath}}</h6>`
var showList = `<small class="mm more">{{getMoreLabel()}}</small>`
Vue.component('city-list',{
    props:['todo'],
    template:`<div class="city-list col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 mt-2">
    <a :href="'/detail-info/?city='+todo.cityEng+'&totDeath='+(todo.totalDeath)+'&ln='+getLang()">
    <div :class="getCardClass(todo.totalDeath)"><div class="card-body">
    ${showCity}${showTotDeath}${showList}
    </div></div></a></div>`,
    methods:{
        getCardClass: function(total){
            var cls = "card"
            if(total < 25){
                cls = cls + " bg-green"
            } else if(total >= 25 && total < 50){
                cls = cls + " bg-yellow"
            } else if(total >= 50 && total < 100) {
                cls = cls + " bg-orange"
            } else {
                cls = cls + " bg-red"
            }
            return cls
        },
        getCityDeathLabel: function(){
            return appVM.cityDeathLabel
        },
        getMoreLabel: function(){
            return appVM.more
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
        getLang:function(){
            return appVM.lang
        }
    }
})

var appVM = new Vue({
    el:'#app',
    data:{
        bttCLass:"back-to-top px-lg-5 px-2 d-none",
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
        totalDeathLabel:mmTotalDeathLabel,
        todayDeathLabel:mmTodayDeathLabel,
        yesterdayDeathLabel:mmYesterdayDeathLabel,
        dataSource:mmDataSource,
        cityDeathLabel:mmCityDeathLabel,
        todayCityDeathLabel: enTodayCityDeathLabel,
        more:mmMore,
        appClass: appLight,
        martyrList: martyrList,
        cityList:mmList,
        vmCount: 0,
        vmTodayCount:0,
        vmTodayTotalCount:0,
        vmYesterdayTotalCount:0,
        mode:"",
        lang:"",

    },
    methods:{
        scrollFunction: function(){
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                this.bttCLass="back-to-top px-lg-5 px-2"
            } else {
                this.bttCLass="back-to-top px-lg-5 px-2 d-none"
            }
        },
        changeLang: function(lang){
            this.lang=lang
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
                this.totalDeathLabel = mmTotalDeathLabel
                this.todayDeathLabel = mmTodayDeathLabel
                this.yesterdayDeathLabel = mmYesterdayDeathLabel
                this.dataSource = mmDataSource
                this.cityDeathLabel = mmCityDeathLabel
                this.todayCityDeathLabel = mmTodayCityDeathLabel
                this.more = mmMore
                this.cityList = mmList
                
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
                this.totalDeathLabel = enTotalDeathLabel
                this.todayDeathLabel = enTodayDeathLabel
                this.yesterdayDeathLabel = enYesterdayDeathLabel
                this.dataSource = enDataSource
                this.cityDeathLabel = enCityDeathLabel
                this.todayCityDeathLabel = enTodayCityDeathLabel
                this.more = enMore
                this.cityList = engList
               
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
                this.totalDeathLabel = jpTotalDeathLabel
                this.todayDeathLabel = jpTodayDeathLabel
                this.yesterdayDeathLabel = jpYesterdayDeathLabel
                this.todayCityDeathLabel = jpTodayCityDeathLabel
                this.dataSource = jpDataSource
                this.cityDeathLabel = jpCityDeathLabel
                this.more = jpMore
                this.cityList = jpList
            }

           
        }
    }
})



if(ln == "mm"){

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
    appVM.dataSource=mmDataSource
    appVM.totalDeathLabel=mmTotalDeathLabel
    appVM.todayDeathLabel=mmTodayDeathLabel
    appVM.yesterdayDeathLabel=mmYesterdayDeathLabel
    appVM.cityDeathLabel = mmCityDeathLabel
    appVM.more = mmMore
    appVM.lang = "mm"
    

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
    appVM.dataSource=jpDataSource
    appVM.totalDeathLabel=jpTotalDeathLabel
    appVM.todayDeathLabel=jpTodayDeathLabel
    appVM.yesterdayDeathLabel=jpYesterdayDeathLabel
    appVM.cityDeathLabel = jpCityDeathLabel
    appVM.more = jpMore
    appVM.lang = "jp"
}else {
    
    appVM.urlOne = `/?ln=en`
    appVM.urlTwo = `/under18/?ln=en`
    appVM.urlThree = `/dashboard/?ln=en`
    appVM.brandTitle= enBrandTitle
    appVM.navOne=enNavHome
    appVM.navTwo=enUnder18
    appVM.navThree=enDashboard
    appVM.navFour=enLanguage
    appVM.mm=enMyanmar
    appVM.en=enEnglsih
    appVM.jp=enJapanese
   
    appVM.bodyTitle=enBodyTitle
    appVM.dataSource=enDataSource
    appVM.totalDeathLabel=enTotalDeathLabel
    appVM.todayDeathLabel=enTodayDeathLabel
    appVM.yesterdayDeathLabel=enYesterdayDeathLabel
    appVM.cityDeathLabel = enCityDeathLabel
    appVM.more = enMore
    appVM.lang = "en"
}
