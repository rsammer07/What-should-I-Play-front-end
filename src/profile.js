import "./profile.css"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {
    const  [user, setUser] = useState(null)
    const [games, setGames] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        const getSingleUser = async () => {
            const localStorData = JSON.parse(localStorage.getItem("userData"));
    
            if (localStorData) {
                const userId = localStorData.userData.user._id;
                const userDataRes = await fetch(`https://whatshouldiplaybackend-e19df83c93a5.herokuapp.com/users/${userId}`);
                const userData = await userDataRes.json();
    
                setUser(userData);
                setGames(userData.games);
            }
        };
    
        getSingleUser();
    }, []);
    

    const handleRandomizeClick = () => {
        const rGame = games[Math.floor(Math.random() * games.length) -1]
        console.log(rGame)
        navigate(`/game/${rGame._id}`)
    }


     const handleRemoveClick = (e, id) => {
        e.preventDefault()
        console.log("removing game")
            const localStorData = JSON.parse(localStorage.getItem("userData"))
            const token = localStorData.token
            console.log(token)
            const options = {
                method: 'DELETE',
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`
                }
            }
            fetch(`https://whatshouldiplaybackend-e19df83c93a5.herokuapp.com/games/${id}`, options)
            .then((res) => {
                if (!res.ok) {
                    return console.error("error deleting game")
                }
            })
            .catch((err) => {
                console.error(err)
            })
            // window.location.reload()
    }


    const handleAddGameClick = async () => {
        navigate('/newGame')
    };
    
    

    const handleImageClick = (e, id) => {
        e.preventDefault()

        navigate(`/game/${id}`)
    }

    return(
        <div>
            <button className='addButton' onClick={handleAddGameClick}>Add Game</button>
            {user? <h1>{user.username}'s game library</h1> : <h1>Loading</h1>}
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
                                    <button className="removeButton" onClick={(e) => handleRemoveClick(e, game._id)}>Remove</button>                             
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