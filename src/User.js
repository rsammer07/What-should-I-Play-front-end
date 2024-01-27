import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const UserDisplay = () => {
    const [user, setUser] = useState(null)
    const { id } = useParams();
    console.log(id)

    useEffect( () => {
        const getSingleUser = async () => {
            fetch(`https://whatshouldiplaybackend-e19df83c93a5.herokuapp.com/users/${id}`)
            .then((res) => res.json()).then((data) => {
                setUser(data)
                console.log(user)
            })
        }
        getSingleUser()
    }, [])



    return (
        <div>
            {user? <h1>{user.username}'s game library</h1> : <h1>Loading</h1>}
            <div className="gameDisplay">
                {user? (
                    user.games.map((game) => {
                        return(
                            <div className="eachGame" key={game._id}>
                                <img className="gameCover" src={game.image} alt={game.title}/>
                                <p className="title">{game.title}</p>
                                <p className="platform">Platform: {game.platform}</p>
                            </div>
                        )
                    })
                ) : <p>Loading...</p>}
            </div>
        </div>
        
    )
}
    
export default UserDisplay