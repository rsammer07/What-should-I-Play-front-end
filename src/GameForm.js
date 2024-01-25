import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import './GameForm.css'



const GameForm = (e) => {
    const [title, setTitle] = useState('')
    const [platform, setPlatform] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate();



    const onSubmitHandler = async (e) => {
        e.preventDefault()
        console.log('submitting form')

        const newGame = {
            title,
            platform,
            image
        }
        const localStorData = JSON.parse(localStorage.getItem("userData"))
        console.log(localStorData.token)
        const token = localStorData.token
        console.log(token)
        const options = {
            method: 'POST',
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newGame)
        }

        fetch("http://localhost:8080/games/newGame", options)
        .then((res) => {
            if (!res.ok) {
                return console.error("error creating a new game")
            }
            res.json().then((data) => {
                console.log(data)
            })
        })
        .catch((err) => {
            console.error(err)
        })
        navigate("/profile")
    }


    


    const onChangeHandler = (e, setValue) => {
        console.log(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div>
            <h1>Add a New Game</h1>
            <form className='gameForm' onSubmit={onSubmitHandler}>
                <label htmlFor='title'>Title:</label>
                <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => onChangeHandler(e, setTitle)}
                />
                <label htmlFor="platform">Platform:</label>
                <input
                type="text"
                id="platform"
                name="platform"
                onChange={(e) => onChangeHandler(e, setPlatform)}
                />
                <label htmlFor="image">Image:</label>
                <ImageUpload setimage={setImage}/>
                <button type="submit" className='submit'>Add Game</button>
            </form>
        </div>
    )
}

export default GameForm


