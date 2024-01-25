import './SingleGame.css'
import { useState } from 'react';

const game = 
    {
        "_id": "65a74209304762dd48f7efd2",
        "title": "Rocket League",
        "platform": "PC",
        "image": "https://i.ibb.co/K5PN8rH/e267e8f81a06.jpg",
        "__v": 0
    }


function SingleGame () {
    // [game, setGame] = useState(game)


    console.log(game)
    return(
        <div className='singleGame'>
            <h1>The game you're playing is...........</h1>
                <div className="singleGameDisplay">
                    <img className="currentGame" src={game.image} alt={game.title} />
                    <p className='title'>{game.title}</p>
                    <p className='platform'>{game.platform}</p>
                </div>
                <p>Not happy with {game.title}?</p>
                <p>Give it another try!</p>
                <button className='randomizeAgain'>Randomize Again</button>
        </div>
    )
}


export default SingleGame