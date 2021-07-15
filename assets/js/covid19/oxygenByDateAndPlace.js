var appVM = new Vue({
    el:'#app',
    data: {
        division_list : division,
        division : "",
        state_list : state,
        type_list : type,
        oxy_shop : [],
        total_shop : 0,
        active : {sell:'alert-primary',refill: ''},
        search_data:""
        
    },
    methods : {
        getRefillData: function(){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            this.division = urlParams.get('place');
            this.date = urlParams.get('date')

            this.getO2Shop("oxygenByDate")
        },
        displayShop : function(shop){
            Object.keys(this.active).map(e=>{
                if(e == shop) this.active[e] = 'alert-primary'
                else this.active[e] = ''
            })
            this.getO2Shop(shop)
          
        },
        getO2Shop : async function(shop){
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/${shop}?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
            .then(res=>res.json())
            .then(response =>{
                var result = response.values;
                this.oxy_shop = result.map(e => {
                    e[6] = e[6] ?? ""
                    var tmpPhone = ""
                    if(e.phone){
                        tmpPhone = e.phone.split(",")
                    }
                    return {date: e[0], type : e[1], key:e[2] ,division : e[3], city : e[4], name : e[5], address : e[6], phone : tmpPhone,remark : e[8]}
                }).filter(e=>(e.division==this.division && e.date == this.date))
                this.oxy_shop = this.oxy_shop.sort((a,b) => b.city - a.city)
                this.total_shop = this.oxy_shop.length
            })
        },
        search : async function(){
            console.log(this.search_data)
            await this.getO2Shop("oxygenByDate")
            if(this.search_data){

                this.search_data = this.search_data.replaceAll(" ","")
                this.oxy_shop= this.oxy_shop.filter(e => 
                    
                    Object.keys(e).map(k=> {
                        var tmp = false
                        if(k!="phone" && k!="date" && e[k]!=undefined){
                            tmp = e[k].toLowerCase().includes(this.search_data) || e[k].toUpperCase().includes(this.search_data) || e[k].includes(this.search_data)
                        }
                        return tmp
                        
                    }).includes(true)
                    
                )
                this.total_shop = this.oxy_shop.length
            }
            
        }
    },
    async created (){
        await Promise.all([this.getRefillData()])
    }
})