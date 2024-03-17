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
        bot.sendMessage(chatId , `Assalomu aleykum hurmatli ${msg.from.first_name},😊 \n botimizda diomiy ro'yhatdan o'tish uchun telfon raqamingizni biz bilan ulashing`,
        {
            reply_markup:{
                keyboard:[
                    [{
                        text:'Kontakni ulashish',
                        request_contact:true,                        
                    }],
                    
                ],resize_keyboard:true
            }
        })

    }
// happy
    if(checkUser && user.phone != ''){
        user.action = 'user'
        bot.sendMessage(chatId , `Hurmatli ${ msg.from.first_name } siz bizning doimiy foydalinuvchimizsiz 😊🤝 \n  Agar sizga qandaydir yordam kerak bo'lsa +998977045951 raqami orqali yoki quyida bizning ijtimoiy tarmoqlarimiz oraqali biz bilan bog'laning  ` , 
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
      
        await User.findByIdAndUpdate(user._id, user, {new:true})
        if(!user.admin){
            user.action = 'user'
                    bot.sendMessage(chatId ,` Hurmatli ${msg.from.first_name} Apple box oilasiga qo'shilganingizdan hursadnman, yangiliklardan habardor bo'lib turishni istasangiz bildirishnomalarni yoqib qo'yin!`,{
            
                        reply_markup:{
                            keyboard:[
                                [{
                                    text:'Foydalanuvchilar uchun'                      
                                }],
                                
                            ],resize_keyboard:true
                        
                    }
                } )
                }else{
                    bot.sendMessage(chatId ,` Hurmatli ${msg.from.first_name} \nsiz adminsiz, habar jonatishni istasangiz quyidagi tugmani bosing`,{
            
                        reply_markup:{
                            keyboard:[
                                [{
                                    text:"Habar jo'natish"                      
                                }],
                                
                            ],resize_keyboard:true
                        
                    }
                } )
                }
                }
                    if(!msg.contact){
                        bot.sendMessage(chatId , `Assalomu aleykum hurmatli ${msg.from.first_name},😊 botimizda diomiy ro'yhatdan o'tish uchun telfon raqamingizni biz bilan ulashing`,
                        {
                            reply_markup:{
                                keyboard:[
                                    [{
                                        text:'Kontakni ulashish',
                                        request_contact:true,                        
                                    }],
                                    
                                ],resize_keyboard:true
                            }
                        })
                    }
                }

                    const forUsers = async (msg) =>{
                      }

module.exports={
    start,
    requestContact,
    forUsers
}