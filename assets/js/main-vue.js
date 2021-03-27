var martyrList ;
var cityList;
var appLight = "container-fluid main-content p-0 mb-5";
var appDark = "container-fluid main-content p-0 dark";


(async function(){

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
        var itemLength = 
        result.every(item => {
            
            if(mainIndex == 0){
                // console.log("itemlenght"+item.length)
                itemLength = item.length
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
                if(item[itemLength-3]!=""){

                    todayDeathCity = parseInt(item[itemLength-3])
                }
    
                tmpList.push({"city":cityArray[item[0]],"cityEng":item[0],"totalDeath":tmpTot, "todayDeath": todayDeathCity});
                tmpList.sort(function(a,b){
                    return (b.totalDeath+b.todayDeath) - (a.totalDeath+a.todayDeath)
                })
                tcount += tmpTot
                if(item[itemLength-3]!=""){
                    todayCount += parseInt(item[itemLength-3])
                }
                
                tmpTot = 0
            }
            mainIndex ++
            return true
            
        });
       cityList = tmpList;
        martyrVM.cityList = cityList;
        martyrVM.vmCount = tcount;
        martyrVM.vmTodayCount = todayCount
    }).catch(err => {

    });
    
    // if(now<6 || now >= 19 ){
    //     martyrVM.appClass = appDark
    //     martyrVM.mode = "Night Mode is ON."
    // }
   

})();


var showCity = `<h5 class="card-title mm">{{todo.city}}</h5>`
var showTotDeath = `<h6 class="mm">ကျဆုံးသူ ({{todo.totalDeath+todo.todayDeath}}) ဦး</h6>`
var showList = `<small class="mm more">အသေးစိတ် အချက်အလက်ကြည့်ရန် နှိပ်ပါ</small>`
Vue.component('city-list',{
    props:['todo'],
    template:`<div class="col-12 col-md-4 col-lg-2 mt-2">
    <a :href="'/detail-info/?city='+todo.cityEng+'&totDeath='+(todo.totalDeath+todo.todayDeath)">
    <div :class="getCardClass(todo.totalDeath+todo.todayDeath)"><div class="card-body">
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
        mode:""
    }
})





