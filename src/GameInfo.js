import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


function SingleGame () {      
const [game, setGame] = useState({})
const { id } = useParams()
console.log(id)


    useEffect( () => {
        const getSingleGame = async () => {
            fetch(`http://localhost:8080/games/${id}`)
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
            <h1>{game.title}</h1> : <h1>Loading</h1>}
            </>
        )
        
        } 

// <div className='singleGame'>
//                     <div className="singleGameDisplay">
//                         <img className="currentGame" src={game.image} alt={game.title} />
//                             <p className='title'>{game.title}</p>
//                             <p className='platform'>{game.platform}</p>
//                         </div>
//                     <p>Not happy with {game.title}?</p>
//                     <p>Give it another try!</p>
//                     <button className='randomizeAgain'>Randomize Again</button>
//                 </div>

export default SingleGame

