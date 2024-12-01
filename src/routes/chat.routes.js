import { Router } from "express"

const chatRouter = Router()

//GET
chatRouter.get('/', (req,res) => {
    res.render('templates/chat', {js:'chat.js', css:'main.css'})
})

export default chatRouter