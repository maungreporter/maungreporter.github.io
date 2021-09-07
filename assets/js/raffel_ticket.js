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

       ticket_list:[],
       total_ticket:0,
       file:[],
       win_prize_list:[
           
       ]
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
            this.result = ""
            this.error = ""
            if(this.your_ticket_no){
                fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/raffel?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
                .then(res=>res.json())
                .then(data =>{
                    var tmp=[]
                    data.values.map(e=>{
                        if(e[1] == this.your_ticket_no){
                            console.log("Winn")
                            tmp.push({result:'1',prize:e[2],prize_img:e[0]})
                            this.result = '1'
                        }
                        this.win_prize_list = tmp
                        if(!this.result) this.result = "0"
                    })
                })
               
            }else if(this.ticket_list.length>0){
                console.log(this.ticket_list)
                fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/raffel?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
                .then(res=>res.json())
                .then(data =>{
                    var tmp=[]
                    data.values.map(e=>{
                        if(this.ticket_list.includes(e[1])){
                            console.log("Winn")
                            // this.result = '1'
                            // this.prize = `${e[2]} `
                            // this.prize_img = e[0]
                            tmp.push({result:'1',prize:e[2],prize_img:e[0]})
                            this.result = '1'
                        }
                        this.win_prize_list = tmp
                        if(!this.result) this.result = "0"
                    })
                })
            }else{
                this.error = "ပေါက်မဲ နံပါတ်ရိုက်ထည့်ခြင်း (သို့) ပေါက်မဲလက်မှတ်ထည့်ပြီးမှ check ကို နှိပ်ပါ"
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
        getClass:function(date){
            if(date == this.selected_date){
                return "nav-link active"
            }else{
                return "nav-link"
            }
        },
        imageChange: function(){
            this.your_ticket_no = ""
            this.win_prize_list = []
            var ticketFiles = this.$refs.file.files
            var tmpList = []
            this.total_ticket = ticketFiles.length
            for(let i=0;i<ticketFiles.length;i++){
                var ticket_no = ticketFiles[i].name.split(".")[0].split('-').slice(1).join('-')
                console.log(ticket_no)
                alert(ticket_no)

                tmpList[i]=ticket_no
                
            }
            this.ticket_list = tmpList
            
        }
        
        
    },
    async created (){

        
        

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var date = urlParams.get('date')
        console.log(date)
        if(date==null){
            date = "2021/09/04"
        }
        
        await Promise.all([this.getPrize(date)])
    }
})


