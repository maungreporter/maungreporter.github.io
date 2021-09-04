var appVM = new Vue({
    el:'#app',
    data: {
       win_list: [],
       win_list_by_date:[],
       your_ticket_no : '',
       result : '',
       prize : '',
       prize_img: '',
       error : '',
       selected_date:'',

    },
    methods : {
        getPrize: async function(date){
            this.result = ""
            this.error = ""
            this.your_ticket_no = ""
            this.selected_date = date
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/raffel?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
            .then(res=>res.json())
            .then(data =>{
                var tmpList = []
                data.values.map(e => {
                    if(date){
                        if(e[3]==date){
                            tmpList.push({no:e[0], ticket_no:e[1], prize_name:e[2],prize_date:e[3]})
                        }
                    }else{
                        tmpList.push({no:e[0], ticket_no:e[1], prize_name:e[2],prize_date:e[3]})
                    }
                    
                })
                this.win_list = tmpList
                window.history.replaceState({},null,'?date='+date)
            })
            
           
        },
        check: function(){
            if(this.your_ticket_no){
                this.result = ""
                this.error = ""
                fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/raffel?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
                .then(res=>res.json())
                .then(data =>{
                    data.values.map(e=>{
                        if(e[1] == this.your_ticket_no){
                            console.log("Winn")
                            this.result = '1'
                            this.prize = `${e[2]} `
                            this.prize_img = e[0]
                        }
                        if(!this.result) this.result = "0"
                    })
                })
               
            }else{
                this.error = "Please enter your raffel ticket number."
            }
            
        },
        getPrizeByDate: function(date){            
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/raffel?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
            .then(res=>res.json())
            .then(data =>{
                var tmpList = []
                data.values.map(e => {
                    if(e[3]== date){
                        tmpList.push({no:e[0], ticket_no:e[1], prize_name:e[2],prize_date:e[3]})
                    }
                })
                this.win_list = tmpList
            })
        },
        getClass(date){
            if(date == this.selected_date){
                return "nav-link active"
            }else{
                return "nav-link"
            }
        }
    },
    async created (){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var date = urlParams.get('date')
        console.log(date)
        if(null){
            date = "2021/09/04"
        }
        
        await Promise.all([this.getPrize(date)])
    }
})