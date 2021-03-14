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

Vue.component('martyr-list', {
    props: ['todo'],
    template: '<li>{{ todo[0] }}</li>'
})

var martyrVM = new Vue({
    el:'#martyr',
    data:{
        martyrList: martyrList,
    }
})

