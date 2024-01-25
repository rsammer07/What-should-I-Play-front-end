import "./profile.css"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {
    const  [user, setUser] = useState(null)
    const [games, setGames] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        const getSingleUser = async () => {
            const localStorData = JSON.parse(localStorage.getItem("userData"))
            console.log(localStorData)



            if(localStorData) {
                const userId = localStorData.userData.user._id
            fetch(`http://localhost:8080/users/${userId}`)
            .then((res) => res.json()).then((data) => {
                setUser(data)
                setGames(data.games)
            }

            )}
        }
        getSingleUser()
    }, [])

    const handleRandomizeClick = () => {
        const rGame = games[Math.floor(Math.random() * games.length - 1)]
        console.log(rGame)
        navigate(`/game/${rGame._id}`)


        //TODO from the back end, to fetch random game fetch user by Id and select rando game from users game array
    }


     const handleRemoveClick = (e) => {
        e.preventDefault()
        console.log('removing game')
    //fetch game by Id first to remove it
    //then fetch user by ID to remove that game id from user's game array


    //     fetch('http://localhost:8080/users/profile', {
    //         method: 'PUT',
    //         withCredentials: true,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },

    //     })
    }


    const handleAddGameClick = () => {
        navigate('/newGame')
    }

    const handleImageClick = (e, id) => {
        e.preventDefault()

        navigate(`/game/${id}`)
    }

    return(
        <div>
            <button className='addButton' onClick={handleAddGameClick}>Add Game</button>
            {user? <h1>{user.firstName}'s game library</h1> : <h1>Loading</h1>}
            <p>Done with a game? Hit <button>Remove</button> under it to remove it from your list</p>
            <div className="gameDisplay">
                {user? (
                    user.games.map((game) => {
                        return(
                            <div className="eachGame" key={game._id}>
                                <img className="gameCover" src={game.image} alt={game.title} onClick={(e) => handleImageClick(e, game._id)}/>
                                <p className="title">{game.title}</p>
                                <p className="platform">Platform: {game.platform}</p>
                                <div className="buttonContainer"> 
                                    <button className="removeButton" id={game._id} onClick={handleRemoveClick}>Remove</button>                             
                                </div>
                            </div>
                        )
                    })
                ) : <p>Loading...</p>}
               
            </div>
            <p>Ready to find out what game you'll be playing?</p>
            <button className="randomize" onClick={handleRandomizeClick}>Randomize</button>
        </div>
        
    )
}


export default Profile