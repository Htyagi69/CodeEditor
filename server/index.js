import { WebSocketServer } from "ws";
import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
const app=express();

const  server= http.createServer(app);

const PORT=process.env.PORT;

const socket=new WebSocketServer({server})

socket.on('connection',(ws,req)=>{
    const clientIP=  req.socket.remoteAddress;
    console.log(`Client is connected${clientIP}`);
    ws.send(JSON.stringify({type:'welcome', message:"wecome to sever-side"}));

    ws.on('message',(data)=>{
        const message=JSON.parse(data);
        console.log("message from client =>",message);
        if(message.type==='change'){
            let payload=JSON.stringify({
                type:message.type,
                content:message.content,
                lange:message.language,
            })
        //Broadcast
        socket.clients.forEach((client)=>{
            if(client.readyState===1 && client!=ws){
                client.send(payload);
            }
        })
}
    else{
        ws.send(JSON.stringify({
            type:'message',
            content:`ha bhai mill gya ye hi hai na==>${JSON.stringify(message.content)}`
        }))
    }
    })
})

socket.on('close',()=>{
    console.log('Client is disconnected');
})

socket.on('error',(error)=>{
    console.log('WebSocket error',error);
    
})
app.get('/',(req,res)=>{
    return res.json({message:"Server is setuped"})
})

// 3. IMPORTANT: Start the HTTP server, NOT app.listen  as express create its own server internally 
server.listen(PORT,()=>console.log(`http://localhost:${PORT}`))