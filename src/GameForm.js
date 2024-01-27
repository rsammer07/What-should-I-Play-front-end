import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import './GameForm.css'



const GameForm = (e) => {
    const [title, setTitle] = useState('')
    const [platform, setPlatform] = useState('')
    const [image, setImage] = useState('')
    // const [user, setUser] = useState(null)
    const [game, setGame] = useState([])
    const navigate = useNavigate();



    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('submitting form');
    
        const newGame = {
            title,
            platform,
            image
        };
    
        const localStorData = JSON.parse(localStorage.getItem("userData"));
        const token = localStorData.token;
    
        const options = {
            method: 'POST',
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newGame)
        };
    
        fetch("https://whatshouldiplaybackend-e19df83c93a5.herokuapp.com/games/newgame", options)
    .then((res) => {
        if (!res.ok) {
            console.error("Error creating a new game");
            return;
        }
        return res.json();
    })
    .then((data) => {
        console.log(data);
        setGame((prevGames) => [...prevGames, data]);
        
    })
    .catch((err) => {
        console.error("Error during fetch:", err);
    });

     navigate("/profile")
    };


    


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


