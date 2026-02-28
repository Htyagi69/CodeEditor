import { useEffect, useState } from 'react';
import './App.css'
import useWebSocket  from 'react-use-websocket'
import CodeEditor from './CodeEditor';
import { NativeSelectDemo } from './components/Language';
import  Terminal  from './Terminal';
import { STARTER_CODE } from './constants';

const WS_URL='ws://localhost:8080'

function App() {
  const [isclicked,setisClicked]=useState(false)
  const [language,setLanguage]=useState("javascript")
  const [version,setVersion]=useState(63)
  const [code,setCode]=useState(STARTER_CODE[language]);
  // console.log("now the version on App.jsx ",version); //this tells how many times the App.jsx render
  const onSelect=(lang,version)=>{
     setLanguage(lang)
     setVersion(version);
     let newStarterCode=STARTER_CODE[lang];
     setCode(newStarterCode);
    //  console.log("langu changed:",language);
  }
const boilerPlate=(code)=>{
     setCode(code)
  }
const {sendJsonMessage,readyState}=useWebSocket(WS_URL,{
  onOpen:()=>{
    console.log("connection is established client side");
  },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,

     onMessage:(event)=>{
         const data=JSON.parse(event.data);
         switch (data.type){
          case 'message': 
            // console.log("mill gaya:",data.content);
            break;
          case 'change': 
            // console.log('yaha hoga asli khel',data.content);
            boilerPlate(data.content);
            setLanguage(data.lange)
            setVersion(data.version)
             break;
         }
    }
})
  // Map readyState to readable status
  const connectionStatus = ['Connecting', 'Open', 'Closing', 'Closed'][readyState] || 'Unknown';
  const message="hello this is Harshit ,Nice to meet";
  useEffect(()=>{
    if(readyState===1){
    sendJsonMessage({
     type:'message',
     content:message,
    })
    sendJsonMessage({
      type:'change',
      content:`${code}`,
      language:language,
      version:version,
      state:readyState,
    })
  }
  },[readyState])
  return (
    <>
      <h1 className='text-green-600 font-extrabold text-5xl m-6'>EditorVerse !!!</h1>
      <div className='border-4 flex flex-col p-2 rounded-2xl'>
          <div className='w-full bg-gray-700 flex justify-between rounded-sm'>
            <NativeSelectDemo lang={language} onSelect={onSelect} sendJsonMessage={sendJsonMessage} code={code}/>
          <button className={`p-2 hover:cursor-pointer rounded-sm m-1 ${isclicked ? 'bg-white text-black ':'bg-blue-700 text-white'}`}
          onClick={()=>setisClicked(!isclicked)}>RUN Code</button>
          </div>
        <div className='flex'>
         <CodeEditor lang={language} code={code} boilerPlate={boilerPlate} sendJsonMessage={sendJsonMessage}/>
         <Terminal language={language}  version={version} code={code} isclicked={isclicked} setisClicked={setisClicked}/>
        </div>
      </div>
    </>
  )
}

export default App
