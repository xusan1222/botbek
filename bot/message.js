const { bot} = require('./bot')
const { start, requestContact, exportUsersToExcel } = require('./helper/start')
const User = require('../model/user')
let hom = []

bot.on('message' , async msg =>{
    const chatId = msg.from.id
    const text = msg.text
    const user = await User.findOne({chatId}).lean() 
    
    let checkUser = await User.findOne({chatId}).lean()

    if(text === '/start'){
            start(msg)       
    }
  
    if(user){
        if(user.action === 'request_contact' && !user.phone ){
            requestContact(msg)
        }
    }
    if(user){
        if(user.action === 'user' ){
            if(text === 'Foydalanuvchilar uchun'){

                bot.sendMessage(chatId , `Muroojat uchun telfon raqam: \n☎️+998977045951 \n☎️+998953090707 Quyida bizni ijtimoiy tarmoqlarda kuzting🌐` , 
                {
                    reply_markup:{
                        inline_keyboard:[

                                [{"text": "Instagram", "url": "https://www.instagram.com/applebox.uz/"},],
                                [{"text": "Telegram", "url": "https://t.me/Applebox_sergeli"},],
                                [{"text": "Tez kunda bizning web sayt🌐", "url": "http://www.google.com/"},],
                            ],
                            
                        
                    }
                        
                            
                        
                    }
)}
                    
            }
        }
        if ( text === "Foydalanuvchilar ro'yhati") {
        // if (user.admin && text === "Foydalanuvchilar ro'yhati") {
            let adminChatId;
            if ('6551368748') {
                adminChatId = '6551368748';
            } else if ('1013137178') {
                adminChatId = '1013137178';
            } else if ('165271903') {
                adminChatId = '165271903';
            } else if ('1671104155') {
                adminChatId = '1671104155';
            }
             // Replace with the actual chat ID of the admin user
            await exportUsersToExcel(adminChatId);
        }
})




