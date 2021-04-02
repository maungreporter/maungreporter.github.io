

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
var totalDays = differenceInTime / (1000 * 3600 * 24);



(async function(){
    console.log(todayDate)
    console.log(today)
    console.log("Total Days " + totalDays)
    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/Dashboard?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
    .then(res=>res.json())
    .then(response =>{
        var result = response.values;
        var itemLength;
        var mainIndex = 0;
        var tmpDateList = []
        var tmpCountList = []
        var dateData = []
        var cityData = []
        var total = 0
        var todayCount = 0
        var lastDate;
        result.every(item => {

            if(item[0] == "မြို့အမည်"){
                itemLength = item.length
                console.log("length of item"+itemLength)
                lastDate = item[itemLength-3]
                console.log("lastdate "+ lastDate)
                
            }
            if(item[0] == "မြို့အမည်"){
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
                cityData.push({"city":cityArray[item[0]],"count":tmpCount})
                cityData.sort(function(a,b){
                    return b.count-a.count
                })
            }
            if(item[0] == "Daily Total"){
                return false
            }
            return true
        });

        for(var i=tmpDateList.length-1; i>=0; i--){
                dateData.push({"date":modifyDate(tmpDateList[i]),"count":tmpCountList[i]})
        }
        martyrVM.dateData = dateData
        martyrVM.cityData = cityData
        martyrVM.totalCity = cityData.length
        martyrVM.total = total
        if(todayDDv == lastDate){
            martyrVM.todayCount = todayCount
        }
        
       
    }).catch(err => {

    });
    var totalDeath = 0
    await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/[MM]Detail Cases!A2:AB1094?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw')
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
    
    martyrVM.underEighteen = totalDeath
    


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
                <h6>{{todo.city}}</h6>     
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
        }
    }
})

var martyrVM = new Vue({
    el:'#martyr',
    data:{
        dateData: [],
        cityData: [],
        totalCity: 0,
        total:0,
        totalDays:totalDays,
        underEighteen: 0,
        todayCount:0
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



