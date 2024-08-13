import { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from 'axios'
import { Assistant } from './voicr-assistant/assistant'

const BaseURL = 'https://v2.jokeapi.dev/joke/';

function App() {
  const [text, setText] = useState(''); 
  const [showAny,setShowAny] = useState(false)
  const category = useRef('Any')
  let url = BaseURL
  const para = useRef([])
  const getval = useRef({})

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
      let q = '';      
      if(getval.current)
       {q = '?' + new URLSearchParams(getval.current).toString()
      }
      url = BaseURL + category.current + para.current.toString() + q
      console.log(para)
      console.log(url)
      axios.get(url).then((response) => {
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
          <input type="radio" name="category" id="any"  onChange={()=>{category.current='Any';setShowAny(false)}}/>
          <label htmlFor="any">Any</label>
          <input type="radio" name='category' id='custom' onChange={()=>{category.current='';setShowAny(true)}}/>
          <label htmlFor="custom" >custom</label>
          {showAny && (<div>
             <fieldset>
              <input onChange={(e)=>{if(e.target.checked)para.current.push('Programming')
                else para.current.splice(para.current.indexOf('Programming '),1)
               }} type="checkbox" name="categories" id='programming'  />
              <label htmlFor="programming">Programming</label>
              <input onChange={(e)=>{if(e.target.checked)para.current.push('Misc')
                else para.current.splice(para.current.indexOf('Misc '),1)
              }} type="checkbox" name="categories" id='Misc'  />
              <label htmlFor="Misc">Misc</label>
              <input onChange={(e)=>{if(e.target.checked)para.current.push('Dark')
                else para.current.splice(para.current.indexOf('Dark'),1)
              }} type="checkbox" name="categories" id='Dark' />
              <label htmlFor="Dark">Dark</label>
              <input onChange={(e)=>{if(e.target.checked)para.current.push('Pun')
                else para.current.splice(para.current.indexOf('Pun'),1)
              }} type="checkbox" name="categories" id='Pun'  />
              <label htmlFor="Pun">Pun</label>
              <input onChange={(e)=>{if(e.target.checked)para.current.push('Spooky')
                else para.current.splice(para.current.indexOf('Spooky'),1)
              }} type="checkbox" name="categories" id='Spooky' />
              <label htmlFor="Spooky">Spooky</label>
              <label htmlFor="Pun">Pun</label>
              <input onChange={(e)=>{if(e.target.checked)para.current.push('Christmas')
                else para.current.splice(para.current.indexOf('Christmas'),1)
              }} type="checkbox" name="categories" id='Christmas' />
              <label htmlFor="Christmas">Christmas</label>
             </fieldset>
          </div>)}
        </fieldset>
        <label htmlFor="">Number of jokes</label>
        <input type="number" min={1} max={20} onChange={(e)=>{getval.current.amount = e.target.value}}/>
        <button onClick={(e)=>submitHandler(e)} type="submit">Tell me a joke</button>
    </form>  
    </>
  )
}

export default App
