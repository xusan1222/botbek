const {bot} = require('../bot')
const User = require('../../model/user')
const { text } = require('express')

const start = async (msg)=>{

    const chatId = msg.from.id
    let user = await User.findOne({chatId}).lean()
 

    let checkUser = await User.findOne({chatId}).lean()
    if(!checkUser){
        let newUser = new User({

            name: msg.from.first_name,
            chatId,
            admin:false,
            status:true,
            createdAt: new Date(),
            action:'request_contact'
        })
        await newUser.save()
        bot.sendMessage(chatId , `Assalomu aleykum hurmatli ${msg.from.first_name}🤩 \nBotimizda diomiy ro'yhatdan o'tish uchun telfon raqamingizni📲 biz bilan ulashing`,
        {
            reply_markup:{
                keyboard:[
                    [{
                        text:'Kontakni ulashish📲',
                        request_contact:true,                        
                    }],
                    
                ],resize_keyboard:true
            }
        })

    }
// happy
    if(checkUser && user.phone){
        user.action = 'user'
        bot.sendMessage(chatId , `Hurmatli ${ msg.from.first_name } siz bizning doimiy foydalinuvchimizsiz 😊🤝 \nAgar sizga qandaydir yordam kerak bo'lsa \n☎️+998977045951 \n☎️+998953090707 \nraqami orqali yoki quyida bizning ijtimoiy tarmoqlarimiz oraqali biz bilan bog'laning  ` , 
        {
            reply_markup:{
                inline_keyboard:[
                    [
                         {"text": "instagrm", "url": "https://www.instagram.com/applebox.uz/"},
                    ],
                    [
                        {"text": "Telegram", "url": "https://t.me/wexvve"},

                    ]
                ],
                keyboard:[
                    [{
                        text:'Foydalanuvchilar uchun'                      
                    }],
                    
                ],resize_keyboard:true
                
            }
        })
    }
    // if(checkUser && !user.phone){
    //     bot.sendMessage(chatId , `Assalomu aleykum hurmatli ${msg.from.first_name}, botimizda diomiy ro'yhatdan o'tisg uchun telfon raqamingizni biz bilan ulashin`)
    // }

    console.log(msg)
  
}

const requestContact = async (msg) =>{
    console.log(msg)
    const chatId = msg.from.id
    if(msg.contact){
        let user = await User.findOne({chatId}).lean()
        user.phone = msg.contact.phone_number
        user.admin = msg.contact.phone_number == "+998933553641"
        user.admin = msg.contact.phone_number == "+998977045951"
        user.admin = msg.contact.phone_number == "+998953090707"
        user.action = 'user' 
        
        await User.findByIdAndUpdate(user._id, user, {new:true})
      
                    bot.sendMessage(chatId ,` Hurmatli ${msg.from.first_name} \nApple box oilasiga qo'shilganingizdan hursadnman🤩 \nYangiliklardan habardor bo'lib turishni istasangiz bildirishnomalarni yoqib qo'ying🔔✅`,{
            
                        reply_markup:{
                            keyboard:[
                                [{
                                    text:'Foydalanuvchilar uchun'                      
                                }],
                                
                            ],resize_keyboard:true
                        
                    }
                } )
              
                }
                    if(!msg.contact){
                        bot.sendMessage(chatId , `Assalomu aleykum hurmatli ${msg.from.first_name}🤩 \nBotimizda diomiy ro'yhatdan o'tish uchun telfon raqamingizni📲 biz bilan ulashing`,
                        {
                            reply_markup:{
                                keyboard:[
                                    [{
                                        text:'Kontakni ulashish📲',
                                        request_contact:true,                        
                                    }],
                                    
                                ],resize_keyboard:true
                            }
                        })
                    }
                }

                  

module.exports={
    start,
    requestContact,
}