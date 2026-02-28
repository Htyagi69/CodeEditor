import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Language_ID,STARTER_CODE } from "@/constants"
export function NativeSelectDemo({lang,onSelect,sendJsonMessage,code}) {
    const languages=Object.entries(Language_ID)
    // console.log("Lang yaha",languages);
    
  return (
    <NativeSelect value={lang} onChange={(e)=>{
       let selectedlang=e.target.value;
       let version=Language_ID[selectedlang];
       console.log("native select:",version);
       
       onSelect(selectedlang,version)
      //  console.log("bahasa changed to :",selectedlang);
       sendJsonMessage({ type: 'change',content:STARTER_CODE[selectedlang],language:selectedlang,version:version })
      }}
       className='bg-black text-white font-bold m-1'>
      {languages.map(([language,version])=>{
        return(
            <NativeSelectOption key={language} value={language}>{language}</NativeSelectOption>
        )})}
    </NativeSelect>
  )
}
