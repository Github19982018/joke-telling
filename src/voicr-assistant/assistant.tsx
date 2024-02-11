import {useRef, useEffect, useMemo} from 'react'


export const Assistant = ( {text}:{text:string} ) => {
  const voices = useRef<Array<object> | null>();
  const voice = useRef(null);
  
            const synth =  window.speechSynthesis;
            console.log('synth');
            voices.current = synth.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase();
            const bname = b.name.toUpperCase();
        
            if (aname < bname) {
              return -1;
            } else if (aname == bname) {
              return 0;
            } else {
              return +1;
            }})
        
        
        
        useEffect(() => {
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
          speak();
        },[text,synth]);
        
        
        //   if (speechSynthesis.onvoiceschanged !== undefined) {
          //     speechSynthesis.onvoiceschanged = populateVoiceList;
          //   }
          
          const selectHandler = (e:ReactEventHandler<HTMLSelectElement>) => {
              for (let i = 0; i < voices.current.length; i++) {
                  if (voices.current[i].name ===  e.target.value) {
                      voice.current=(voices.current[i]);
                    break;
                  }
             
          }}
          
          return (
            <div>
        <label htmlFor="voice">Select a voice:</label>
        <select name="voice" id="voice" onChange={(e) => {selectHandler(e)}}>
            {voices.current?.map((voice,id) => {
                return(<option key={id}  value={voice.name}>{voice.name} {voice.lang} {voice.default && "--Default"}</option>)
            })}
        </select>

    </div>
  )
}
