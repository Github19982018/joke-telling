import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Assistant } from './voicr-assistant/assistant'

const BaseURL = 'https://v2.jokeapi.dev/joke/Any';

function App() {
  const [text, setText] = useState(''); 
  const [showAny,setShowAny] = useState(false)

  useEffect(() => {
    const keyHandler = (e) => {
        e.preventDefault();
        if (e.key == 'j') {
          access()
        }
    }
      document.addEventListener('keydown', (e) => keyHandler(e))
      return () => {
        document.removeEventListener('keydown', keyHandler);
      };
    },[])

  const access = function(){
      axios.get(BaseURL).then((response) => {
      console.log(response.data.setup)
      console.log(response.data.delivery)
      const joke = JSON.stringify(response.data.setup) + "\n" +JSON.stringify(response.data.delivery);
      setText(joke);
    }).catch((error) => {
     console.log(error);
    })}
  
  
  const submitHandler = (e) => {
       e.preventDefault();
       access()
  }

  return (
    <>
    <Assistant text={text}/>
    <form action="">
      <label htmlFor="lang">Select language</label>
        <select defaultValue={"en"} name="lang" id="lang">
          <option  value="en">ENGLISH</option>
          <option value="cs">CZECK</option>
          <option value="de">GERMAN</option>
          <option value="es">SPANISH</option>
          <option value="fr">FRENCH</option>
          <option value="pt">PORTUGEESE</option>
        </select>
        <br />
        <label htmlFor="checkbox">Select a category or categories</label>
        <fieldset>
          <input type="radio" name="category" id="any"  onChange={()=>{setShowAny(false)}}/>
          <label htmlFor="any">Any</label>
          <input type="radio" name='category' id='custom' onChange={()=>{setShowAny(true)}}/>
          <label htmlFor="custom" >custom</label>
          {showAny && (<div>
             <fieldset>
              <input disabled type="checkbox" name="categories" id='programming' value={'Programming'} />
              <label htmlFor="programming">Programming</label>
              <input disabled type="checkbox" name="categories" id='Misc' value={'Misc'} />
              <label htmlFor="Misc">Misc</label>
              <input disabled type="checkbox" name="categories" id='Dark' value={'Dark'} />
              <label htmlFor="Dark">Dark</label>
              <input disabled type="checkbox" name="categories" id='Pun' value={'Pun'} />
              <label htmlFor="Pun">Pun</label>
              <input disabled type="checkbox" name="categories" id='Spooky' value={'Spooky'} />
              <label htmlFor="Spooky">Spooky</label>
              <label htmlFor="Pun">Pun</label>
              <input disabled type="checkbox" name="categories" id='Christmas' value={'Christmas'} />
              <label htmlFor="Christmas">Christmas</label>
             </fieldset>
          </div>)}
        </fieldset>
        <button onClick={(e)=>submitHandler(e)} type="submit">Tell me a joke</button>
    </form>  
    </>
  )
}

export default App
