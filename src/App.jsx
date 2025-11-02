import { useState,useCallback,useEffect , useRef} from 'react'

import './App.css'
function App() {
  const [length,setlength]=useState(8);
  const [numbers,toggleNumbers]=useState(false);
  const [characters,toggleCharacters]=useState(false);
  const [password,setPassword]=useState("");
  const passRef= useRef(null);
  const passwordGenerator = useCallback(
    ()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numbers) str+="0123456789";
      if(characters)str+="!@#$%^&*()_+/*-?><:;";
      for(let i=0;i<length;i++){
        let index=Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(index);
      }
      setPassword(pass);
    },[length,numbers,characters,setPassword])

    useEffect(()=>{
      passwordGenerator();
    },[length,numbers,characters,passwordGenerator])
    const copyToClipboard = useCallback(()=>{
      passRef.current?.select();
      window.navigator.clipboard.writeText(password);
    },[password])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500' >
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white'>
        <input type="text"
        value={password}
        className='outline-none  w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passRef}
        />
        <button
        onClick={copyToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={5} 
        max={100}
        value={length}
        onChange={(e)=>{setlength(e.target.value)}}
        className='cursor-pointer'
        />
        <label>Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
          defaultChecked={numbers}
          id='numberInput'
          onChange={()=>{
            toggleNumbers((prev)=>!prev);
          }}        
        />
        <label htmlFor="numberInput">Number</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
                defaultChecked={characters}
                id="characterInput"
                onChange={()=>{
                  toggleCharacters((prev)=>!prev);
                }} 
        />
        <label htmlFor="characterInput">Character</label>
      </div>
    </div>
    </div>

  )
}

export default App
