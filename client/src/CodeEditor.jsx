import React, {  useRef, useState } from 'react'
import Editor from  '@monaco-editor/react'
import { STARTER_CODE,Language_ID } from './constants';
function CodeEditor({lang,code,boilerPlate,sendJsonMessage}) {
    const editorRef=useRef();
    const onMount=(editor)=>{
        editorRef.current=editor;
        editor.focus();
    }
    // console.log("lang==>",lang);
    return (
        <div className='w-full h-89 lg:h-[70vh]'>
        <Editor 
         defaultLanguage='javascript'
          language={lang} 
          defaultValue={STARTER_CODE[lang]}
          value={code} 
           onMount={onMount}
            theme='vs-dark'
             onChange={(newvalue)=>{
                boilerPlate(newvalue)
                sendJsonMessage({ type: 'change', content: newvalue,language:lang ,version:Language_ID[lang]})
                }} />
        </div>
    )
}

export default CodeEditor
