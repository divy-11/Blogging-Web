import { SignUpInput } from "@11-devvv/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Form = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [userInputs, setuserInputs] = useState<SignUpInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendingReq() {
        try {
            const resp = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, userInputs);
            const token = resp.data;
            localStorage.setItem('token', token);
            localStorage.setItem('loginname',userInputs.name||"Anonymous")
            navigate('/blogs');
        }
        catch (e) {
            alert("Error while signing up");
            console.log(e);
        }
    }

    return (<div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold text-center">
                        {type === 'signin' ? "Welcome Back" : "Create an account"}
                    </div>
                    <div className="text-slate-500 text-center">
                        {type === 'signin' ? "Don't have an account?" : "Already have an account?"}
                        <Link to={type === 'signup' ? "/signin" : "/signup"} className="pl-2 underline">{type === 'signin' ? "Create" : "Log In"}</Link>
                    </div>
                </div>
                <div className="pt-8">

                    {type === 'signup' ?
                        <Input label={"Name"} placeholder={"Divy"} onChange={(e) => {
                            setuserInputs(c => ({
                                ...c,
                                name: e.target.value
                            }))
                        }} /> : null}
                    <Input label={"Email"} placeholder={"divy@gmail.com"} onChange={(e) => {
                        setuserInputs(c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }} />
                    <Input label={"Password"} type={'password'} placeholder={"*sh17*"} onChange={(e) => {
                        setuserInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} />
                    <button type="button" onClick={sendingReq} className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">{type === 'signin' ? "Sign in" : "Sign Up"}</button>
                </div>
            </div>
        </div>
    </div>)
}

interface InputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string,
}
function Input({ label, placeholder, onChange, type }: InputType) {
    return <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
        <input onChange={onChange} type={type || 'text'} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}