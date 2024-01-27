import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./GameInfo.css"


function SingleGame () {      
const [game, setGame] = useState({})
const { id } = useParams()
console.log(id)


    useEffect( () => {
        const getSingleGame = async () => {
            fetch(`https://whatshouldiplaybackend-e19df83c93a5.herokuapp.com/games/${id}`)
            .then((res) => res.json()).then((data) => {
                setGame(data)
                console.log(game)
            })
        }
        getSingleGame()
    }, [])


    console.log(game)
        return(
            <>
            {game? 
            <div className="singleGameDisplay">
                <img className="currentGame" src={game.image} alt={game.title} />
                <p className='title'>{game.title}</p>
                <p className='platform'>{game.platform}</p>
            </div>            
            : <h1>Loading</h1>}
            </>
        )
        
        } 


export default SingleGame

