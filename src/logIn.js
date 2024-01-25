import "./login.css"
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate('/LogIn')
    }


    return(
        <div className="welcome">
            <h1>Welcome Gamers!</h1>
                <p className="explain">Have you ever sat in a Discord, Xbox party or Playstation chat with your friends for hours fighting over what game you should play? We waste SO much time deciding what to play that we don't get much time to actually game! I've created the solution!</p>
                {/* <p className="explain">Sign in</p> */}
            <div className="login-button">
                <button className="login" onClick={handleLogInClick}>Sign In</button>
            </div>
                <p className="explain">To get started, Please Log in/Sign up. Add games to your list or add new games to the database. Once thats done, let us decide what you should play tonight! You'll thank me later!</p>
                <h1>Game on!</h1>
        </div>
        
    )
}



export default LogIn
