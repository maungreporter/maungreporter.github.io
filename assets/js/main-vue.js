var martyrList ;
var cityList;
var appLight = "container main-content p-0 mb-5";
var appDark = "container main-content p-0 dark";

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
    console.log(today)

    // var today = new Date();
    // var now = today.getHours()
    // console.log(now)
    

    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/Dashboard?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
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
        result.every(item => {
            if(mainIndex == 0){
                itemLength = item.length
                lastdate = item[itemLength-3]
                console.log("last date" + lastdate)
                mainIndex++
                return true

            }else if(item[0] == "Daily Total"){
                mainIndex++
                return false
            }
            else{
                var index = 0
                console.log(item[0])
                item.forEach(e => {
                    
                    
                    if(index > 0 && index < itemLength-3){
                        if(e != ""){
                            console.log(e)
                            tmpTot += parseInt(e)
                        } 
                    }
                    index ++
                })

                var todayDeathCity = 0;
                var tmpTodayDeathCity = 0;
                //console.log("City "+ item[0] + " / " + item.length + " / " + itemLength) 
                if(item.length == itemLength){
                    if(item[itemLength-3]!=""){
                        todayCount += parseInt(item[itemLength-3])
                        tmpTodayDeathCity = parseInt(item[itemLength-3])
                        if(today == lastdate){
                            todayDeathCity = parseInt(item[itemLength-3])
                        }
                    }
                }
                
    
                tmpList.push({"city":cityArray[item[0]],"cityEng":item[0],"totalDeath":(tmpTot+tmpTodayDeathCity), "todayDeath": todayDeathCity});
                tmpList.sort(function(a,b){
                    return (b.totalDeath) - (a.totalDeath)
                })
                tcount += tmpTot
                
                
                tmpTot = 0
            }
            mainIndex ++
            return true
            
        });
       cityList = tmpList;
        martyrVM.cityList = cityList;
        martyrVM.vmCount = tcount;
        martyrVM.vmTodayCount = todayCount
        if(today==lastdate){
            martyrVM.vmTodayTotalCount=todayCount
        }
        if(yesterday==lastdate){
            martyrVM.vmYesterdayTotalCount=todayCount
        }
        
    }).catch(err => {

    });
    
    // if(now<6 || now >= 19 ){
    //     martyrVM.appClass = appDark
    //     martyrVM.mode = "Night Mode is ON."
    // }
   

})();


var showCity = `<h5 class="card-title mm">{{todo.city}} <small v-if="todo.todayDeath>0" class="text-danger">ယနေ့ - {{todo.todayDeath}} ဦး</small></h5>`
var showTotDeath = `<h6 class="mm">ကျဆုံးသူ ({{todo.totalDeath}}) ဦး</h6>`
var showList = `<small class="mm more">အသေးစိတ် အချက်အလက်ကြည့်ရန် နှိပ်ပါ</small>`
Vue.component('city-list',{
    props:['todo'],
    template:`<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 mt-2">
    <a :href="'/detail-info/?city='+todo.cityEng+'&totDeath='+(todo.totalDeath)">
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
            } else if(total >= 50 && total < 99) {
                cls = cls + " bg-orange"
            } else {
                cls = cls + " bg-red"
            }
            return cls
        }
    }
})

var martyrVM = new Vue({
    el:'#martyr',
    data:{
        appClass: appLight,
        martyrList: martyrList,
        cityList:cityList,
        vmCount: 0,
        vmTodayCount:0,
        vmTodayTotalCount:0,
        vmYesterdayTotalCount:0,
        mode:""
    }
})





