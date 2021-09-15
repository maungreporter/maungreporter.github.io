var tmpList = [];
var sheet = "smfg-nzl"
var prizeSheet = "smfg-nzl-prize"
var total = 0
var appVM = new Vue({
    el:'#app',
    data: {
       win_list: [],
       prize_list:[],
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
           
       ],
       missing_ticket : 0
    },
    methods : {
        getPrize: async function(){
            this.result = ""
            this.error = ""
            this.your_ticket_no = ""

            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/${prizeSheet}?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
            .then(res=>res.json())
            .then(data =>{
                
                this.prize_list= data.values.map(e => {
                        return {no:e[0], prize_name:e[1], prize_img:e[2],group:e[3]}
                   
                    
                })
                

                
            })
            
           
        },
        check: function(){
            console.log("Check")
            this.result = ""
            this.error = ""
            if(this.your_ticket_no){
                this.ticket_list = []
                fetch(`https://sheets.googleapis.com/v4/spreadsheets/${oxygenRefillDataSource}/values/${sheet}?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw`)
                .then(res=>res.json())
                .then(data =>{
                    var tmp=[]
                    data.values.map(e=>{
                        if(e[1] == this.your_ticket_no){
                            console.log("Winn")
                            tmp.push({result:'1',prize:e[2],prize_img:e[3]})
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
                            tmp.push({result:'1',prize:e[2],prize_img:e[0]})
                            this.result = '1'
                        }
                        this.win_prize_list = tmp
                        if(!this.result) this.result = "0"
                    })
                })
            }else{
                this.error = "1"
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
            this.error = 0
            this.total_ticket = 0
            this.missing_ticket = 0
            tmpList = []
            this.ticket_list = []

            this.your_ticket_no = ""
            this.win_prize_list = []
            
            var ticketFiles = event.target.files;
            
            for(index in ticketFiles){
                if(index < ticketFiles){
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
        
                // console.log(dataurl)
                 await getTicketNo(canvas)
            };
            reader.readAsDataURL(file);


        },
       
       

        
        
        
    },
    async created (){
        
        await Promise.all([this.getPrize()])
    }
})

async function getTicketNo (canvas){
  Tesseract.recognize(canvas,'eng',
    { logger: m => console.log(m) })
    .then(({ data: { text } }) => {
        console.log(text);
        if(text.split("-").length==4){
            tmpList.push(text.match(/[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{4}\-[A-Z0-9]{5}/)[0])
            appVM.total_ticket = appVM.total_ticket + 1
        }else{
            appVM.error="2"
            appVM.missing_ticket = appVM.missing_ticket + 1
        }

    })
    

}
