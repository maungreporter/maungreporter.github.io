var appVM = new Vue({
    el:'#app',
    data: {
        division_list : [],
        state_list : state,
        type_list : type,
        oxy_sell_shop : {ygn:0,mdy:0,sg:0,mg:0,pg:0,awd:0,tnty:0,kachin:0,kayah:0,kayin:0,chin:0,mon:0,rakhine:0,shan:0},
        // oxy_refill_shop : {ygn:0,mdy:0,sg:0,mg:0,pg:0,awd:0,tnty:0,kachin:0,kayah:0,kayin:0,chin:0,mon:0,rakhine:0,shan:0},
        
        date : "",
        remark : "",
        
    },
    methods : {
        getRefillData: function(){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            this.date = urlParams.get('date')
           
             fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/oxygenByDate?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
            .then(res=>res.json())
            .then(division =>{
                var tmpDivisionList = division.values.map(e => {
                    
                        
                        return {date: e[0],key: e[2], value: e[3]}
                   
                    
                }).filter(e=>e.date == this.date)

                var tmpDivisionList = division.values.filter(e => e[0]==this.date)
                .map(e=> {
                        this.oxy_sell_shop[e[2]]++ 
                        return {date: e[0],key: e[2], value: e[3]}
                })
                console.log(tmpDivisionList)
                
                if(tmpDivisionList.length){
                    this.division_list = this.removeSameValue(tmpDivisionList)
                }else{
                    this.remark = "Data မရရှိသေးပါ ခမျာ"
                }
                
               
            })
            
           
        },
        removeSameValue : function(data){
            return data.reduce((acc,current) => {
                const x = acc.find(item => item.value === current.value);
                if(!x) {
                    return acc.concat([current]);
                }else {
                    return acc;
                }
            },[])
        }
        
    },
    async created (){
        await Promise.all([this.getRefillData()])
    }
})

