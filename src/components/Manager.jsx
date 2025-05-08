import React, { useEffect } from 'react'
import { useRef,useState } from 'react';

const Manager = () => {
    const ref = useRef();
    const [form, setForm] = useState({site:"",username:"",password:""})
    const [passwordsArray, setpasswordsArray] = useState([])

    useEffect(() => {
        let passwords=localStorage.getItem("passwords")
        if(passwords) {
            setpasswordsArray(JSON.parse(passwords));
        }
    },[])

    const showPassword = () => {
        alert("Show Password");
        if(ref.current.src.includes("/view-off-slash-stroke-rounded.svg")) {
        ref.current.src = "/eye-stroke-rounded.svg";
    }
        else {
            ref.current.src = "/view-off-slash-stroke-rounded.svg";
        }
    }
    const savePassword = () => {
         setpasswordsArray([...passwordsArray,form])
         localStorage.setItem("password",JSON.stringify(...passwordsArray,form))
    }

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }
    return (
        <>
            <div class="relative h-full w-full bg-white"><div class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div>

            <div className="bg-slate-50 mycontainer">
                <h1 className="text-center font-bold text-3xl">
                    <span className='text-amber-700'>&lt;</span>
                    Pass
                    <span className='text-amber-700'>Protect/&gt;</span>
                </h1>
                <p className='text-center'>Your personal vault for passwords and authentication</p>
                <div className="flex flex-col p-4 gap-6 items-center">
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter website URL ' className='rounded-lg w-full border border-amber-700 focus:outline-none px-3 py-1' type="text" />
                    <div className="flex w-full justify-between gap-4">
                        <input value={form.username} onChange={handleChange} placeholder='EnterUsername' name='username' className='flex-1 rounded-lg border border-amber-700 focus:outline-none px-3 py-1' type="text"/>
                        <div className="relative cursor-pointer"> 
                        <input value={form.password} onChange={handleChange} name='password' placeholder='Enter Password' className='flex-1 rounded-lg border border-amber-700 focus:outline-none px-3 py-1' type="text" />
                        <span className='absolute right-0 top-0' onClick={showPassword}>
                            <img ref={ref} className='p-1' width={32} src="/eye-stroke-rounded.svg" alt="eye"/>
                        </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className=' text-black cursor-pointer flex justify-center items-center w-fit rounded-full bg-amber-700 px-4 py-1 hover:border hover:bg-amber-600'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Add Password</button>

                </div>
            </div>
        </>
    )
}

export default Manager
