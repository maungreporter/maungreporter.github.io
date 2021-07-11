var appVM = new Vue({
    el:'#app',
    data: {
        division_list : division,
        state_list : state,
        type_list : type,
        oxy_sell_shop : {ygn:0,mdy:0,sg:0,mg:0,pg:0,awd:0,tnty:0,kachin:0,kayah:0,kayin:0,chin:0,mon:0,rakhine:0,shan:0},
        // oxy_refill_shop : {ygn:0,mdy:0,sg:0,mg:0,pg:0,awd:0,tnty:0,kachin:0,kayah:0,kayin:0,chin:0,mon:0,rakhine:0,shan:0},
    },
    methods : {
        getRefillData: function(){
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/sell?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
            .then(res=>res.json())
            .then(shop =>{
                shop.values.map(e => this.oxy_sell_shop[e[1]] ++ )
            })
            
           
        }
    },
    async created (){
        await Promise.all([this.getRefillData()])
    }
})