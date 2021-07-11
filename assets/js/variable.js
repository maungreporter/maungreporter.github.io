// var userAgent = window.navigator.userAgent.toLowerCase()
// console.log(userAgent)
// if(userAgent.includes('wv')){
//     location.href = 'https://maungreporter.github.io/copy-right/';
//  }

var allSource = "1ABTOB7VkfSrJWoLHT3cRL401ZmpoJbxLgWxDR3YoTQg"
var mms2021deathtoll = "1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g"

var dataSource = mms2021deathtoll
var awsBaseUrl = `https://martyr.s3.amazonaws.com/`

var oxygenRefillDataSource = "1vD_VJfxSy6PhCVespA-migA_dK5TCDN0S1ZGb_ZAWWU"

var division = [
    {name: "ရန်ကုန်တိုင်း", key : "ygn", lat: "", lng : ""},
    {name: "မန္တလေးတိုင်း", key : "mdy", lat: "", lng : ""},
    {name: "စစ်ကိုင်းတိုင်း", key : "sg", lat: "", lng : ""},
    {name: "မကွေးတိုင်း", key : "mg", lat: "", lng : ""},
    {name: "ပဲခူးတိုင်း", key : "pg", lat: "", lng : ""},
    {name: "ဧရာဝတီတိုင်း", key : "awd", lat: "", lng : ""},
    {name: "တနင်္သာရီတိုင်း", key : "tnty", lat: "", lng : ""},
  ]

var state = [
  {name: "ကချင်ပြည်နယ်", key : "kachin", lat: "", lng : ""},
  {name: "ကယားပြည်နယ်", key : "kayah", lat: "", lng : ""},
  {name: "ကရင်ပြည်နယ်", key : "kayin", lat: "", lng : ""},
  {name: "ချင်းပြည်နယ်", key : "chin", lat: "", lng : ""},
  {name: "မွန်ပြည်နယ်", key : "mon", lat: "", lng : ""},
  {name: "ရခိုင်ပြည်နယ်", key : "rakhine", lat: "", lng : ""},
  {name: "ရှမ်းပြည်နယ်", key : "shan", lat: "", lng : ""}
]
var type = [
  {name : "ပရဟိတ အဖွဲ့များ",key : "charity"},
  {name : "အောက်စီဂျင် အရောင်းဆိုင်များ", key : "sell"},
  {name : "အောက်စီဂျင်ပြန်ဖြည့်လို့ရမည့်ဆိုင်များ", key : "refill"}
]

var mmNavHome = "Home"
var enNavHome = "Home"
var jpNavHome = "ホーム"

var mmTotal = "စုစုပေါင်းမြို့"
var enTotal = "Total Ciites"
var jpTotal = "総都市"


var mmTotalDaysLabel = "ရက်ပေါင်း"
var enTotalDaysLabel = "Total Days"
var jpTotalDaysLabel = "トータルデー"

var mmUnder18 = "၁၈နှစ်အောက် ကျဆုံးသူ"
var mmUnder18Sec = "အသက်(၁၈)နှစ်အောက် ကျဆုံးသူများ"
var enUnder18 = "Under the Age of 18"
var jpUnder18 = "18歳以下の死者数"

var mmDashboard = "Dashboard"
var enDashboard = "Dashboard"
var jpDashboard = "ダッシュボード"

var mmLanguage = "Language"
var enLanguage = "Language"
var jpLanguage = "言語"

var mmMyanmar = "Myanmar" 
var enMyanmar = "Myanmar"
var jpMyanmar = "ミャンマー"

var mmEnglsih = "Englsih" 
var enEnglsih = "Englsih"
var jpEnglsih = "英語"

var mmJapanese = "Japanese" 
var enJapanese = "Japanese"
var jpJapanese = "日本語"

var mmBrandTitle="နွေဦးတော်လှန်ရေး"
var enBrandTitle = "Spring Revolution"
var jpBrandTitle = "春の革命"

var mmBodyTitle = `နွေဦးတော်လှန်ရေးတွင် <br class="d-md-none"> ကျဆုံးသွားသော သူရဲကောင်းများ`
var enBodyTitle = `Spring Revolution Heroes`
var jpBodyTitle = `春の革命で命を落とした英雄たち`

var mmBodyTitleSec = `နွေဦးတော်လှန်ရေးတွင် <br class="d-md-none"> ကျဆုံးသူအရေအတွက်`
var enBodyTitleSec = `Spring Revolution Death Toll`
var jpBodyTitleSec = `春の革命死者数`

var mmBodyTitleThird = `နွေဦးတော်လှန်ရေးတွင် <br class="d-md-none"> ကြွေလွင့်သွားသော ကလေးငယ်များ`
var enBodyTitleThird = `Children Death Toll in Spring Revolution`
var jpBodyTitleThird = `春の革命における子供の死亡者数`

var mmTodayCityDeathLabel = "mm"
var enTodayCityDeathLabel = "en"
var jpTodayCityDeathLabel = "jp"

var mmYoungestLabel = "အသက်အငယ်ဆုံး"
var enYoungestLabel = "Youngest Death"
var jpYoungestLabel = "一番年下"

var mmYearsOldLabel = "နှစ်"
var enYearsOldLabel = "Years Old"
var jpYearsOldLabel = "歳"

var mmTodayDeathLabel = "ယနေ့ ကျဆုံးသူ"
var enTodayDeathLabel = "Today"
var jpTodayDeathLabel = "本日の死者数"

var mmYesterdayDeathLabel = "မနေ့က ကျဆုံးသူ"
var enYesterdayDeathLabel = "Yesterday"
var jpYesterdayDeathLabel = "昨日の死者数"

var mmTotalDeathLabel = "စုစုပေါင်း ကျဆုံးသူ"
var enTotalDeathLabel = "Total Deaths"
var jpTotalDeathLabel = "合計死者数"

var mmCityDeathLabel = "ကျဆုံးသူ"
var enCityDeathLabel = "Number of Deaths"
var jpCityDeathLabel = "死者数"

var mmMore = "အသေးစိတ် အချက်အလက်ကြည့်ရန် နှိပ်ပါ"
var enMore = "Click to see more."
var jpMore = "詳しくはクリックしてください。"

var mmCityGraphLabel = "ဒေသအလိုက် ကျဆုံးမှုအရေအတွက်"
var enCityGraphLabel = "Number of Deaths by Region"
var jpCityGraphLabel = "地域別死者数"

var mmDailyGraphLabel = "နေ့ရက်အလိုက် ကျဆုံးမှုအရေအတွက်"
var enDailyGraphLabel = "Daily Deaths"
var jpDailyGraphLabel = "日別死者数"

var mmDataSource = `<a href="https://docs.google.com/spreadsheets/d/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/edit#gid=0" target="_blank">Myanmar Spring 2021 Death Toll Spreadsheets</a>
                    မှ data ကို အခြေခံထားပါသည်`
var enDataSource = `Data Source : 
                    <a href="https://docs.google.com/spreadsheets/d/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/edit#gid=0" target="_blank">Myanmar Spring 2021 Death Toll Spreadsheets</a>
                    `

var jpDataSource = `データソース：<a href="https://docs.google.com/spreadsheets/d/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/edit#gid=0" target="_blank">Myanmar Spring 2021 Death Toll Spreadsheets</a>
                    `



// var cityArray = {"Yangon":{"mm":"ရန်ကုန်","jp":"ヤンゴン"}}

var cityArray = {"Yangon":{"mm":"ရန်ကုန်","jp":"ヤンゴン"},
                "Mandalay":{"mm":"မန္တလေး","jp":"マンダレー"},
                "Monywa":{"mm":"မုံရွာ","jp":"モンユワ"},
                "Myaing":{"mm":"မြိုင်","jp":"ミャイン"},
                "Dawei":{"mm":"ထားဝယ်","jp":"ダウェイ"},
                "Bago":{"mm":"ပဲခူး","jp":"ペグー"},
                "Myingyan":{"mm":"မြင်းခြံ","jp":"ミンジャン"},
                "Pathein":{"mm":"ပုသိမ်","jp":"バセイン"},
                "Mawlamyaing":{"mm":"မော်လမြိုင်","jp":"モーラミャイン"},
                "Pwint Phyu":{"mm":"ပွင့်ဖြူ","jp":"Pwint Phyu"},
                "Myitkyina":{"mm":"မြစ်ကြီးနား","jp":"ミッチーナー"},
                "Pyay":{"mm":"ပြည်","jp":"ピエ"},
                "Aunglan":{"mm":"အောင်လံ","jp":"Aunglan"},
                "Pakokku":{"mm":"ပခုက္ကူ","jp":"パコックー"},
                "Naypyidaw":{"mm":"နေပြည်တော်","jp":"ネピドー"},
                "Myeik":{"mm":"မြိတ်","jp":"ベイ"},
                "Taungdwingyi":{"mm":"တောင်တွင်းကြီး","jp":"Taungdwingyi"},
                "Salin":{"mm":"စလင်း","jp":"サリン"},
                "Kalay":{"mm":"ကလေး","jp":"カレー"},
                "Htilin":{"mm":"ထီးလင်း","jp":"ティリン"},
                "Pyapon":{"mm":"ဖျာပုံ","jp":"ピャーポン"},
                "Chauk":{"mm":"ချောက်","jp":"チャウ"},
                "Chaung Oo":{"mm":"ချောင်းဦး","jp":"Chaung Oo"},
                "Hpakan":{"mm":"ဖားကန့်","jp":"パーカン"},
                "Aungban":{"mm":"အောင်ပန်း","jp":"アウンバン"},
                "Thabeikkyin":{"mm":"သပိတ်ကျင်း","jp":"タベイキャイン"},
                "Kawlin":{"mm":"ကောလင်း","jp":"コーリン"},
                "Gyobingauk":{"mm":"ကြို့ပင်ကောက်","jp":"キョピンカウ"},
                "Pyigyimandaing":{"mm":"ပြည်ကြီးမဏ္ဍိုင်","jp":"ピィジーマンダイン"},
                "Muse":{"mm":"မူဆယ်","jp":"ムセ"},
                "Taunggyi":{"mm":"တောင်ကြီး","jp":"タウンジー"},
                "Loikaw":{"mm":"လွိုင်ကော်","jp":"ロイコー"},
                "Mogok":{"mm":"မိုးကုတ်","jp":"モゴク"},
                "Singu":{"mm":"စဉ့်ကူး","jp":"シンックー"},
                "Kyaukpadaung":{"mm":"ကျောက်ပန်းတောင်း","jp":"キャウパダウン"},
                "Mohnyin":{"mm":"မိုးညှင်း","jp":"モニン"},
                "Tamu":{"mm":"တမူး","jp":"タムー"},
                "Khin U":{"mm":"ခင်ဦး","jp":"キンウー"},
                "Phyu":{"mm":"ဖြူး","jp":"ピュー"},
                "Kyauktaga":{"mm":"ကျောက်တံခါး","jp":"Kyauktaga"},
                "Shwebo":{"mm":"ရွှေဘို","jp":"シュウェボー"},
                "Meiktila":{"mm":"မိတ္ထီလာ","jp":"メイティーラー"},
                "Wundwin":{"mm":"ဝမ်းတွင်း","jp":"Wundwin"},
                "Monyo":{"mm":"မိုးညို","jp":"モーニャオ"},
                "Hpa Do":{"mm":"ဖဒို","jp":"パド"},
                "Daik-U":{"mm":"ဒိုက်ဦး","jp":"ダイウー"},
                "Kyaikhto":{"mm":"ကျိုက်ထို","jp":"チャイットー"},
                "Lashio":{"mm":"လားရှိုး","jp":"ラシオ"},
                "Hopin":{"mm":"ဟိုပင်","jp":"ホピン"},
                "Penwegon":{"mm":"ပဲနွယ်ကုန်း","jp":"Penwegon"},
                "Dala":{"mm":"ဒလ","jp":"ダラ"},
                "Pyin Oo Lwin":{"mm":"ပြင်ဦးလွင်","jp":"メイミョー"},
                "Sagaing":{"mm":"စစ်ကိုင်း","jp":"サガイン"},
                "Nyaung-U":{"mm":"ညောင်ဦး","jp":"ニャウンウー"},
                "Yin Mar Bin":{"mm":"ယင်းမာပင်","jp":"Yin Mar Bin"},
                "Sintgaing":{"mm":"စဉ့်ကိုင်","jp":"シントガーイン"},
                "Kawthaung":{"mm":"ကော့သောင်း","jp":"コータウン"},
                "Thanlyin":{"mm":"သန်လျင်","jp":"シリアム"},
                "Bhamo":{"mm":"ဗန်းမော်","jp":"バモー"},
                "Mutaw":{"mm":"မူတြော်ခရိုင်","jp":"Mutaw"},
                "Kywe Pwe":{"mm":"ကျွဲပွဲ","jp":"Kywe Pwe"},
                "Shwegyin":{"mm":"ရွှေကျင်","jp":"シュエキャイン"},
                "Magwe":{"mm":"မကွေး","jp":"マグウェ"},
                "Paung":{"mm":"ပေါင်","jp":"パウン"},
                "Madaya":{"mm":"မတ္တရာ","jp":"マダヤー"},
                "Gangaw":{"mm":"ဂန့်ဂေါ","jp":"ガンゴー"},
                "Thaton":{"mm":"သထုံ","jp":"タトン"},
                "Myit Chay":{"mm":"မြစ်ခြေ","jp":"ミッチェー"},
                "Pinlebu":{"mm":"ပင်လည်ဘူး","jp":"ピンレブー"},
                "Nyaung Shwe":{"mm":"ညောင်ရွှေ","jp":"ニャウンシェ,"},
                "Mogaung":{"mm":"မိုးကောင်း","jp":"モガウン"},
                "Ye":{"mm":"ရေး","jp":"イェー"},
                "Taze":{"mm":"တန့်ဆည်","jp":"タゼ"},
                "Hpapun":{"mm":"ဖာပွန်","jp":"パープン"},
                "Ayadaw":{"mm":"အရာတော်","jp":"アヤドー"},
                "Momauk":{"mm":"မိုးမောက်","jp":"モーマウク"},
                "Hpa-An":{"mm":"ဘားအံ","jp":"パアン"},
                "Kani":{"mm":"ကနီ","jp":"カンニ"},
                "Bilin":{"mm":"ဘီးလင်း","jp":"ビーリン"},
                "Kyaukme":{"mm":"ကျောက်မဲ","jp":"キャウメー"},
                "Salingyi":{"mm":"ဆားလင်းကြီး","jp":"サーリンジー"},
                "Chaungzon":{"mm":"ချောင်းဆုံ","jp":"チャウンゾン"},
                "Demoso":{"mm":"ဒီးမော့ဆို","jp":"デイモーそ"},
                "Tedim":{"mm":"တီးတီန်","jp":"テディム"},
                "Hsipaw":{"mm":"သီပေါ","jp":"ティポー"},
                "Naungcho":{"mm":"တီးတီန်","jp":"ナウンチョ"},
                "Myinmu":{"mm":"မြင်းမူ","jp":"ミンムー"},
                "Hpakant":{"mm":"ဖားကန့်","jp":"パーカンット"},
                "Wetlet":{"mm":"ဝက်လက်","jp":"ウェッラット"},
                "Hakha":{"mm":"ဟားခါး","jp":"ハカ"},
                "Mindat":{"mm":"မင်းတပ်","jp":"ミンダッ"},
                "Pekon":{"mm":"ဖယ်ခုံ","jp":"ペコん"},
                "Myawaddy":{"mm":"မြဝတီ","jp":"ミャワテイ"},
                "Bawlakhe":{"mm":"ဘော်လခဲ","jp":"ボーラケー"},
                "Budalin":{"mm":"ဘုတလင်","jp":"ボーラケー"},
                "Mobye":{"mm":"မိုးဗြဲ","jp":"モービェー"},
                "Katha":{"mm":"ကသာ","jp":"カター"},
                "Tanai":{"mm":"တနိုင်း","jp":"タナイ"},
                "Kyonpyaw":{"mm":"ကျုံပျော်","jp":"キャイオンピア"},
                "Bagan":{"mm":"ပုဂံ","jp":"パガン"},
                "Shwe Nyaung":{"mm":"ရွှေညောင်","jp":"シェニャウン"},
                "Kanpetlet":{"mm":"ကန်ပက်လက်","jp":"カンパッラッ"},
                "Danubyu":{"mm":"ဓနုဖြူ","jp":"ダヌビュ"},
                "Yebyu":{"mm":"ရေဖြူ","jp":"イェービュ"},
                "Depayin":{"mm":"ဒီပဲယင်း","jp":"デイペイン"},
                "Pauk":{"mm":"ပေါက်","jp":""},
                "Taung Thar":{"mm":"တောင်သာ","jp":"タウンタ"},
                "Waingmaw":{"mm":"ဝိုင်းမော်","jp":"ワインモ"},
                "Shwe Taung":{"mm":"ရွှေတောင်","jp":"シュウェタウン"},
                "Mingin":{"mm":"မင်းကင်း","jp":"ミンキン"},
                "Kengtung":{"mm":"ကျိုင်းတုံ","jp":"チャイントン"},
                
                };


var latlng = {
                "Yangon":{"lat":"16.8409","lng":"96.1735"},
                "Mandalay":{"lat":"21.9588","lng":"96.0891"},
                "Monywa":{"lat":"22.1216","lng":"95.1536"},
                "Myaing":{"lat":"21.6105","lng":"94.8495"},
                "Dawei":{"lat":"14.0828","lng":"98.1940"},
                "Bago":{"lat":"17.3221","lng":"96.4663"},
                "Myingyan":{"lat":"21.4662","lng":"95.3887"},
                "Pathein":{"lat":"16.7754","lng":"94.7381"},
                "Mawlamyaing":{"lat":"16.4543","lng":"97.6440"},
                "Pwint Phyu":{"lat":"20.36333","lng":"94.66944"},
                "Myitkyina":{"lat":"25.3946","lng":"97.3841"},
                "Pyay":{"lat":"18.8406","lng":"95.2580"},
                "Aunglan":{"lat":"19.3603","lng":"95.2188"},
                "Pakokku":{"lat":"21.3394","lng":"95.0703"},
                "Naypyidaw":{"lat":"19.7633","lng":"96.0785"},
                "Myeik":{"lat":"12.4492","lng":"98.6271"},
                "Taungdwingyi":{"lat":"20.0001","lng":"95.5460"},
                "Salin":{"lat":"20.5725","lng":"94.6502"},
                "Kalay":{"lat":"23.1942","lng":"94.0236"},
                "Htilin":{"lat":"21.6961","lng":"94.0977"},
                "Pyapon":{"lat":"16.2850","lng":"95.6800"},
                "Chauk":{"lat":"20.9006","lng":"94.8261"},
                "Chaung Oo":{"lat":"21.9573","lng":"95.2737"},
                "Hpakan":{"lat":"25.6162","lng":"96.2960"},
                "Aungban":{"lat":"20.6618","lng":"96.6478"},
                "Thabeikkyin":{"lat":"22.8862","lng":"95.9753"},
                "Kawlin":{"lat":"23.7929","lng":"95.6800"},
                "Gyobingauk":{"lat":"18.2318","lng":"95.6511"},
                "Pyigyimandaing":{"lat":"11.4702","lng":"99.0012"},
                "Muse":{"lat":"23.993288","lng":"97.910265"},
                "Taunggyi":{"lat":"20.7888","lng":"97.0337"},
                "Loikaw":{"lat":"19.6740","lng":"97.2114"},
                "Mogok":{"lat":"22.9247","lng":"96.5063"},
                "Singu":{"lat":"22.545969","lng":"95.9858405"},
                "Kyaukpadaung":{"lat":"20.8443","lng":"95.1276"},
                "Mohnyin":{"lat":"24.7753","lng":"96.3598"},
                "Tamu":{"lat":"24.2199","lng":"94.3103"},
                "Khin U":{"lat":"22.7682","lng":"95.6274"},
                "Phyu":{"lat":"18.4816","lng":"96.4370"},
                "Kyauktaga":{"lat":"18.1568","lng":"96.6130"},
                "Shwebo":{"lat":"22.5787","lng":"95.6984"},
                "Meiktila":{"lat":"20.8766","lng":"95.8602"},
                "Wundwin":{"lat":"21.0912","lng":"96.0282"},
                "Monyo":{"lat":"18.0115","lng":"95.5040"},
                "Hpa Do":{"lat":"18.0349","lng":"96.5543"},
                "Daik-U":{"lat":"17.7860","lng":"96.6799"},
                "Kyaikhto":{"lat":"17.3125","lng":"97.0149"},
                "Lashio":{"lat":"22.9665","lng":"97.7525"},
                "Hopin":{"lat":"24.9898","lng":"96.5223"},
                "Penwegon":{"lat":"18.2232","lng":"96.5703"},
                "Dala":{"lat":"16.6553","lng":"96.1739"},
                "Pyin Oo Lwin":{"lat":"22.0392","lng":"96.4717"},
                "Sagaing":{"lat":"21.9160","lng":"95.9621"},
                "Nyaung-U":{"lat":"21.1773","lng":"94.9247"},
                "Yin Mar Bin":{"lat":"22.0786","lng":"94.9065"},
                "Sintgaing":{"lat":"21.7341","lng":"96.1063"},
                "Kawthaung":{"lat":"9.9958","lng":"9.9958"},
                "Thanlyin":{"lat":"16.7588","lng":"96.2482"},
                "Bhamo":{"lat":"24.2630","lng":"97.2383"},
                "Mutaw":{"lat":"16.9459","lng":"97.9593"},
                "Kywe Pwe":{"lat":"18.7037","lng":"96.4237"},
                "Shwegyin":{"lat":"17.8276","lng":"97.0068"},
                "Magwe":{"lat":"20.1544","lng":"94.9455"},
                "Paung":{"lat":"16.6220","lng":"97.4571"},
                "Madaya":{"lat":"22.2070","lng":"96.1209"},
                "Gangaw":{"lat":"22.1757","lng":"94.1347"},
                "Thaton":{"lat":"16.9271","lng":"97.3679"},
                "Myit Chay":{"lat":"21.2446","lng":"94.8572"},
                "Pinlebu":{"lat":"24.0781","lng":"95.3717"},
                "Nyaung Shwe":{"lat":"20.6594","lng":"96.9343"},
                "Mogaung":{"lat":"25.3044","lng":"96.9370"},
                "Ye":{"lat":"15.2488","lng":"97.8531"},
                "Taze":{"lat":"22.9432","lng":"95.3756"},
                "Hpapun":{"lat":"18.0618","lng":"97.4408"},
                "Ayadaw":{"lat":"22.2858","lng":"95.4476"},
                "Momauk":{"lat":"24.2550","lng":"97.3436"},
                "Hpa-An":{"lat":"16.8759","lng":"97.6440"},
                "Kani":{"lat":"22.4356","lng":"94.8482"},
                "Bilin":{"lat":"17.2167","lng":"97.2302"},
                "Kyaukme":{"lat":"22.5437","lng":"97.0337"},
                "Salingyi":{"lat":"21.9866","lng":"95.0963"},
                "Chaungzon":{"lat":"16.3556","lng":"97.5437"},
                "Demoso":{"lat":"19.5491","lng":"97.1548"},
                "Tedim":{"lat":"23.3815","lng":"93.6573"},
                "Hsipaw":{"lat":"22.6236","lng":"97.3004"},
                "Naungcho":{"lat":"22.3313","lng":"96.8003"},
                "Myinmu":{"lat":"21.9265","lng":"95.5749"},
                "Hpakant":{"lat":"25.6162","lng":"96.2960"},
                "Wetlet":{"lat":"22.3705","lng":"95.7906"},
                "Hakha":{"lat":"22.6421","lng":"93.6041"},
                "Mindat":{"lat":"21.3748","lng":"93.9725"},
                "Pekon":{"lat":"19.8598076","lng":"96.9911579"},
                "Myawaddy":{"lat":"16.6952072","lng":"98.4797285"},
                "Bawlakhe":{"lat":"19.159557","lng":"97.3138904"},
                "Budalin":{"lat":"22.3896768","lng":"95.1359412"},
                "Mobye":{"lat":"19.7378593","lng":"97.050346"},
                "Katha":{"lat":"24.2188382","lng":"96.2796761"},
                "Tanai":{"lat":"26.3589573","lng":"96.7109727"},
                "Kyonpyaw":{"lat":"17.3021316","lng":"95.1876497"},
                "Bagan":{"lat":"21.1722165","lng":"94.8544872"},
                "Shwe Nyaung":{"lat":"20.7675084","lng":"96.9221804"},
                "Kanpetlet":{"lat":"21.1929337","lng":"94.0409516"},
                "Danubyu":{"lat":"17.2552306","lng":"95.5618715"},
                "Yebyu":{"lat":"14.2479012","lng":"98.1912195"},
                "Depayin":{"lat":"22.6836104","lng":"95.3078256"},
                "Pauk":{"lat":"21.4519298","lng":"94.4704484"},
                "Taung Thar":{"lat":"21.2814136","lng":"95.4283618"},
                "Waingmaw":{"lat":"25.2260763","lng":"97.1628772"},
                "Shwe Taung":{"lat":"18.7129537","lng":"95.2002667"},
                "Mingin":{"lat":"22.8738615","lng":"94.4894385"},
                "Kengtung":{"lat":"21.2807573","lng":"99.5746059"},
                
                
            };
            

            function getCityName(city,lan){
                var tmpCity = ""
                try {
                    tmpCity = cityArray[city][lan]
                } catch (error) {
                    tmpCity = city
                }
                
                return tmpCity
            }

var mmState = {

    MMR2473: {
        name: "ကယား",
        description: "ပြည်နယ်",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      MMR3266: {
        name: "ကရင်",
        description: "ပြည်နယ်",
      },
      MMR3267: {
        name: "မန္တလေး",
        description: "တိုင်း",
      },
      MMR3268: {
        name: "ပဲခူး",
        description: "တိုင်း",
      },
      MMR3269: {
        name: "ရန်ကုန်",
        description: "တိုင်း",
      },
      MMR3270: {
        name: "မွန်",
        description: "ပြည်နယ်",
      },
      MMR3273: {
        name: "ရခိုင်",
        description: "ပြည်နယ်",
      },
      MMR3274: {
        name: "ချင်း",
        description: "ပြည်နယ်",
      },
      MMR3275: {
        name: "ဧရာဝတီ",
        description: "တိုင်း",
      },
      MMR3276: {
        name: "မကွေး",
        description: "တိုင်း",
      },
      MMR3277: {
        name: "ရှမ်း",
        description: "ပြည်နယ်",
      },
      MMR3279: {
        name: "တနင်္သာရီ",
        description: "တိုင်း",
      },
      MMR3296: {
        name: "ကချင်",
        description: "ပြည်နယ်",
      },
      MMR3302: {
        name: "စကိုင်း",
        description: "တိုင်း",
      }
}
var enState = {

    MMR2473: {
        name: "Kayah",
        description: "State",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      MMR3266: {
        name: "Kayin",
        description: "State",
      },
      MMR3267: {
        name: "Mandalay",
        description: "Division",
      },
      MMR3268: {
        name: "Bago",
        description: "Division",
      },
      MMR3269: {
        name: "Yangon",
        description: "Division",
      },
      MMR3270: {
        name: "Mon",
        description: "State",
      },
      MMR3273: {
        name: "Rakhine",
        description: "State",
      },
      MMR3274: {
        name: "Chin",
        description: "State",
      },
      MMR3275: {
        name: "Ayawaday",
        description: "Division",
      },
      MMR3276: {
        name: "Magway",
        description: "Division",
      },
      MMR3277: {
        name: "Shan",
        description: "State",
      },
      MMR3279: {
        name: "Tanintharyi",
        description: "Division",
      },
      MMR3296: {
        name: "Kachin",
        description: "State",
      },
      MMR3302: {
        name: "Sagaing",
        description: "Division",
      }
}
var jpState = {

    MMR2473: {
        name: "カヤー",
        description: "州",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      MMR3266: {
        name: "カレン",
        description: "州",
      },
      MMR3267: {
        name: "マンダレー",
        description: "地方域",
      },
      MMR3268: {
        name: "ペグー",
        description: "地方域",
      },
      MMR3269: {
        name: "ヤンゴン",
        description: "地方域",
      },
      MMR3270: {
        name: "モン",
        description: "州",
      },
      MMR3273: {
        name: "ラカイン",
        description: "州",
      },
      MMR3274: {
        name: "チン",
        description: "州",
      },
      MMR3275: {
        name: "アイヤワディ",
        description: "地方域",
      },
      MMR3276: {
        name: "マグウェ",
        description: "地方域",
      },
      MMR3277: {
        name: "シャン",
        description: "州",
      },
      MMR3279: {
        name: "タニンダーリ",
        description: "地方域",
      },
      MMR3296: {
        name: "カチン",
        description: "州",
      },
      MMR3302: {
        name: "サガイン",
        description: "地方域",
      }
}




function gotoTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}
