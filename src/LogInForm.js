import "./LogInForm.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



const LogInForm = (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        console.log(props)
        e.preventDefault()
        // console.log(email, password)
        props.logIn(email, password)
    }

    const onChangeHandler = (e, setValue) => {
        console.log(e.target.value)
        setValue(e.target.value)

    }


    const handleSignUpClick = () => {
        navigate('/signUp')
    }

    return (
        <div>
            <h1>Sign In</h1>
                <form className="login-form" onSubmit={(e) => onSubmitHandler(e)}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" onChange={(e) => onChangeHandler(e, setEmail) } />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => onChangeHandler(e, setPassword) }  />
                    <button type="submit">Sign In</button>
                </form>
                <p>Don't have an account yet?</p>
                <button className="signUp" onClick={handleSignUpClick}>Sign Up</button>
        </div>
    )
}


export default LogInForm