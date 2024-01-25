import './Games.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



function Games() {
    const [ games, setGames ] = useState( () => null)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAllGames = async (req, res)  => {
            fetch('http://localhost:8080/games')
            .then((res) => res.json()).then((data) => {
                console.log(data)
                setGames(data)
            })    
        }
        fetchAllGames()
    }, [])

    const handleImageClick = (e) => {
        e.preventDefault()
        navigate('/game')
    }

    const handleAddGameClick = () => {
        navigate('/newGame')
    }

    const addToListClick = (e) => {
        e.preventDefault()
        console.log('adding to list')
        
        // const options = {
        //     method: 'PUT',
        //     withCredentials: true,
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.getItem("token")}`
        //     },
        //     body: JSON.stringify({
        //         id: e.target.id.value
        //     })
        // }
        // fetch('http://localhost:8080/users/games', options)
        // .then((res) => {
        //     if (!res.ok) {
        //         return console.error("error adding to list")
        //     }
        //     res.json().then((data) => {
        //         console.log(data)
        //         console.log("successfully added to list")
        //         navigate('/games')
        //     })
        // })
        // .catch((err) => {
        //     console.error(err)
        // })
    }

    return(
        <div>
            <h1>Games Database</h1>
            <p>Don't see the game you're looking for? Add it!</p>
            <button className='addButton' onClick={handleAddGameClick}>Add Game</button>
            <div className='gameDisplay'>
                {games? (
                     games.map((game) => {
                        console.log(game)
                        return(
                            <div className='eachGame' key={game._id}>
                                <img className='gameCover' src={game.image} alt={game.title} onClick={handleImageClick}/>
                                <p className='title'>{game.title}</p>
                                <p className='platform'>Platform: {game.platform}</p>
                                <div className='buttonContainer'>
                                    <button className='addButton' onClick={addToListClick}>Add</button>
                                    
                                </div>
                            </div>
                        )
                    })
                ) : <p>Loading...</p>}
               
            </div>
        </div>
    )
}


export default Games
