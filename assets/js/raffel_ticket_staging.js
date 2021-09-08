var tmpList = [];
var sheet = "raffel-staging"
var total = 0
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
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/${sheet}?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
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
                fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/${sheet}?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
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
                fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/${sheet}?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
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
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/${sheet}?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
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
        getClass : function(date){
            if(date == this.selected_date){
                return "nav-link active"
            }else{
                return "nav-link"
            }
        },
        imageChange: async function(event){
            // total = 0
            this.total_ticket = 0
            tmpList = []
            this.ticket_list = []

            this.your_ticket_no = ""
            this.win_prize_list = []
            
            var ticketFiles = event.target.files;
            
            for(index in ticketFiles){
                if(index < ticketFiles){
                    // console.log(ticketFiles[index].name)
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById("preview").src = e.target.result;
                    };
                    reader.readAsDataURL(ticketFiles[index]);

                    await this.createCanvas(ticketFiles[index])
                }

                    
            }
            this.ticket_list = tmpList
            
            
            
            
        },
        createCanvas : async function(file){
            var reader = new FileReader();
             reader.onload = async function(e) {
                var img = document.createElement("img");
                img.src = e.target.result;
                // Create your canvas
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
        
                var MAX_WIDTH = 500;
                var MAX_HEIGHT = 500;
                var width = img.width;
                var height = img.height;
        
                // Add the resizing logic
                if (width > height) {
                  if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                  }
                } else {
                  if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                  }
                }
        
                //Specify the resizing result
                canvas.width = width-120;
                canvas.height = (height/2)-30;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 250, 190,img.width,img.height,0,0, img.width, img.height);
        
                dataurl = canvas.toDataURL(file.type);
                document.getElementById("preview").src = dataurl;
                // var blob = this.getBlobByDataUrl(dataurl)
        
                console.log(dataurl)
                 getTicketNo(canvas)
            };
            reader.readAsDataURL(file);


        },
       
       

        
        
        
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

async function getTicketNo (canvas){
  Tesseract.recognize(canvas,'eng',
    { logger: m => console.log(m) })
    .then(({ data: { text } }) => {
        console.log(text);
        if(text.split("-").length==4){
            tmpList.push(text.trim());
            appVM.total_ticket = appVM.total_ticket + 1
        }

    })
    

}