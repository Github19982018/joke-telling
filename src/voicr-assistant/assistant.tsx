import {useState, useEffect, useMemo, useRef} from 'react'


const synth =  window.speechSynthesis;
console.log('synth');
const voices = synth.getVoices().sort(function (a, b) {
const aname = a.name.toUpperCase();
const bname = b.name.toUpperCase();

if (aname < bname) {
  return -1;
} else if (aname == bname) {
  return 0;
} else {
  return +1;
}})

export const Assistant = ( {text}:{text:string} ) => {
  // const [voice,setvoice] = useState(voices[0])
  const voice = useRef(voices[0])
        
      useEffect(()=>
        {
          function speak() {
            if (synth.speaking) {
              console.error("speechSynthesis.speaking");
              return;
            }
            
            if (text !== "") {
              const utterThis = new SpeechSynthesisUtterance(text);
              
              utterThis.onend = function () {
                console.log("SpeechSynthesisUtterance.onend");
              };
              
              utterThis.onerror = function () {                
              console.error("SpeechSynthesisUtterance.onerror");
              };
              
              utterThis.voice = voice.current;
              
              //   utterThis.pitch = pitch.value;
              //   utterThis.rate = rate.value;
              synth.speak(utterThis);
            }
            
          }
          speak();},[text])
        
        
        //   if (speechSynthesis.onvoiceschanged !== undefined) {
          //     speechSynthesis.onvoiceschanged = populateVoiceList;
          //   }
          
          const selectHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
              // setvoice(voices[e.target.value])
              voice.current = voices[e.target.value]
          }
          
          return (
            <div>
        <label htmlFor="voice">Select a voice:</label>
        <select name="voice" id="voice" onChange={(e) => {selectHandler(e)}}>
            {voices?.map((voice,id:number) => {
                return(<option key={id}  value={id}>{voice.name} {voice.lang} {voice.default && "--Default"}</option>)
            })}
        </select>

    </div>
  )
}
