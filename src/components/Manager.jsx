import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordsArray, setpasswordsArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        try {
            const parsed = JSON.parse(passwords);
            setpasswordsArray(Array.isArray(parsed) ? parsed : []);
        } catch {
            setpasswordsArray([]);
        }
    }, []);

    const copyText = (text) => {
        toast('🦄 Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/view-off-slash-stroke-rounded.svg")) {
            ref.current.src = "/eye-stroke-rounded.svg";
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "/view-off-slash-stroke-rounded.svg";
            passwordRef.current.type = "text"
        }
    }
    const savePassword = () => {
        if (
            !form.site.trim() || !form.username.trim() || !form.password.trim()
        ) {
            alert("Please fill in all fields before saving.");
            return;
        }
        const updatedArray = [...passwordsArray, {...form,id: uuidv4()}];
        setpasswordsArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
          toast('🦄 Password Saved ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

  

const deletePassword = (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
        const updatedArray = passwordsArray.filter(item => item.id !== id);
        setpasswordsArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
          toast('🦄 Deleted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}


const editPassword = (id) => {
    
    const itemToEdit = passwordsArray.find(item => item.id === id);
    if (itemToEdit) {
        setForm({
            site: itemToEdit.site,
            username: itemToEdit.username,
            password: itemToEdit.password,
        });
        
        const updatedArray = passwordsArray.filter(item => item.id !== id);
        setpasswordsArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
    }
}

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
               
            />

            <div className="relative h-full w-full bg-white"><div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div>

            <div className="bg-slate-50 px-2 md:px-10 md:mycontainer">
                <h1 className="text-center font-bold text-3xl">
                    <span className='text-amber-700'>&lt;</span>
                    Pass
                    <span className='text-amber-700'>Protect/&gt;</span>
                </h1>
                <p className='text-center'>Your personal vault for passwords and authentication</p>
                <div className="flex flex-col p-4 gap-6 items-center">
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter website URL ' className='rounded-lg w-full border border-amber-700 focus:outline-none px-3 py-1' type="text" />
                    <div className="flex w-full justify-between gap-4">
                        <input value={form.username} onChange={handleChange} placeholder='EnterUsername' name='username' className='flex-1 rounded-lg border border-amber-700 focus:outline-none px-3 py-1' type="text" />
                        <div className="relative cursor-pointer">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} name='password' placeholder='Enter Password' className='flex-1 rounded-lg border border-amber-700 focus:outline-none px-3 py-1' type="password" />
                            <span className='absolute right-0 top-0' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={32} src="/eye-stroke-rounded.svg" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className=' text-black cursor-pointer flex justify-center items-center w-fit rounded-full bg-amber-700 px-4 py-1 hover:border hover:bg-amber-600'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold py-3 text-xl'>Your Passwords</h2>
                    {passwordsArray.length === 0 ? <p className='text-center'>No passwords saved yet</p> : null}
                    {passwordsArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden">
                        <thead className='bg-amber-700 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-100'>
                            {passwordsArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='py-2  text-center'>
                                            {item.site && (
                                                <>
                                                    <div className='flex justify-center items-center gap-2 '>
                                                        <a href={item.site} target='_blank'>{item.site}</a>
                                                        <img src="./public/copy-01-stroke-rounded.svg" className='cursor-pointer' onClick={() => {copyText(item.site) }} alt="" />
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                        <td className='py-2 text-center'>
                                            {item.site && (
                                                <>
                                                    <div className='flex justify-center items-center gap-2 '>
                                                        <a href={item.username} target='_blank'>{item.username}</a>
                                                        <img src="./public/copy-01-stroke-rounded.svg" className='cursor-pointer' onClick={() => {copyText(item.username) }} alt="" />
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                        <td className='py-2 text-center'>
                                            {item.site && (
                                                <>
                                                    <div className='flex justify-center items-center gap-2 '>
                                                        <a href={item.password} target='_blank'>{item.password}</a>
                                                        <img src="./public/copy-01-stroke-rounded.svg" className='cursor-pointer' onClick={() => {copyText(item.password) }} alt="" />
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                        <td className='py-2 text-center flex gap-2 cursor-pointer justify-center items-center'>
                                            <span><img src="./public/edit.svg" onClick={()=>editPassword(item.id)} alt="" /></span>
                                            <span><img src="./public/delete.svg"
                                            onClick={()=>deletePassword(item.id)} alt="" /></span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
