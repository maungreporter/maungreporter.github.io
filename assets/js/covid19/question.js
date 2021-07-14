var appVM = new Vue({
    el:'#app',
    data: {
       qands_list: [],
       category:"",
       icon : "down"
    },
    methods : {
        getRefillData: function(){

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            var category= urlParams.get('category');

            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/qanda?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
            .then(res=>res.json())
            .then(data =>{
                
               this.qands_list = data.values.map(e => {
                   
                   return {catKey:e[1],catValue:e[2],queKey:e[3], queValue:e[4],ansValue:e[5]}
                }).filter(e =>e.catKey == category)
                this.category = this.qands_list[0].catValue
            })

            
            
           
        },
        showAnswer : function(){
            // if(this.icon == "down") this.icon = "up"
            // else this.icon = "down"
        }
    },
    async created (){
        await Promise.all([this.getRefillData()])
    }
})