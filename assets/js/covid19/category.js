var appVM = new Vue({
    el:'#app',
    data: {
       title_list: []
    },
    methods : {
        getTitleData: function(){
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/category?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
            .then(res=>res.json())
            .then(data =>{
                
               this.title_list = data.values.map(e => {
                   console.log({key:e[0], value:e[1]})
                   return {key:e[0], value:e[1]}
                })
            })
            
           
        }
    },
    async created (){
        await Promise.all([this.getTitleData()])
    }
})