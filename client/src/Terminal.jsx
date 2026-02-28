import React,{useEffect, useState} from 'react'

 function Terminal({language,version,code,isclicked,setisClicked}) {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
//   console.log("codechanged:=>",code,"+++",isclicked);
  
   const runCode=async()=>{
      if(isclicked){
      try{
      let API=await fetch('https://ce.judge0.com/submissions?wait=true&base64_encoded=false',{
      method:'POST',
      headers:{
      "Content-Type": "application/json"
      },
      body:JSON.stringify({
         language_id:Number(version),
          source_code: code,
          stdin:"",
      })
   });
   const response =await API.json();
   const finalOutput = response.stdout || 
                          response.compile_output || 
                          response.stderr || 
                          "No output from execution.";
   setOutput(finalOutput);
   // console.log("result",finalOutput);
   setIsLoading(true);
}catch (error) {
      setOutput("Execution Error: " + error.message);
    } finally {
      console.log("version==>++",version);
      
      setIsLoading(false);
     setisClicked(false)
    }
   }
}
    useEffect(()=>{
       runCode()
    },[isclicked])
    return (
         <div className='w-full bg-gray-800 text-white flex justify-baseline p-2  rounded-sm'>
         <textarea readOnly placeholder='test!!!'  className='w-full text p-2' value={output} />
       </div>
    )
}

export default Terminal
