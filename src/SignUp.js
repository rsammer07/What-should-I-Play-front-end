import "./SignUp.css"
import { useState } from 'react';




const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



const onSubmitHandler = async (e) => {
    console.log(props)
    e.preventDefault()
    console.log(username, email, password)
    fetch('https://whatshouldiplaybackend-e19df83c93a5.herokuapp.com/users/signup', {
        method: 'POST',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
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
    props.logIn(email, password)
}
    const onChangeHandler = (e, setValue) => {
        console.log(e.target.value)
        setValue(e.target.value)
    }

    return (
        <div>
            <h1>Sign Up</h1>
                <form className="signUp-form" onSubmit={(e) => onSubmitHandler(e)}>
                    <label htmlFor="userName">Username</label>
                    <input 
                    type="text" 
                    id="username" 
                    name="username"  
                    onChange={(e) => onChangeHandler(e, setUsername)}/>
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