import "./SignUp.css"
import { useState } from 'react';




const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log(firstName, lastName, email, password)
    fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    })
    .then((res) => {
        res.json().then((data) => {
            console.log(data)
            localStorage.setItem('userData', JSON.stringify({ userId: data.id, token: data.token, userData: data }))
        })
    })
}
    const onChangeHandler = (e, setValue) => {
        console.log(e.target.value)
        setValue(e.target.value)
    }

    return (
        <div>
            <h1>Sign Up</h1>
                <form className="signUp-form" onSubmit={(e) => onSubmitHandler(e)}>
                    <label htmlFor="firstname">First name</label>
                    <input 
                    type="text" 
                    id="firstname" 
                    name="firstname"  
                    onChange={(e) => onChangeHandler(e, setFirstName)}/>
                    <label htmlFor="lastname">Last name</label>
                    <input 
                    type="text" 
                    id="lastname" 
                    name="lastname" 
                    onChange={(e) => onChangeHandler(e, setLastName)}/>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    onChange={(e) => onChangeHandler(e, setEmail)}/>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    id="password" 
                    name="password" 
                    onChange={(e) => onChangeHandler(e, setPassword)}/>
                    <button type="signUp-button">Sign Up</button>
                </form>
                
        </div>
    )
}


export default SignUp