import './Games.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



function Games() {
    const [ users, setUsers ] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAllUsers = async (req, res)  => {
            fetch('https://safe-tundra-63118-5217aa5f3429.herokuapp.com/users')
            .then((res) => res.json()).then((data) => {
                console.log(data)
                setUsers(data)
                console.log(users)
            })    
        }
        fetchAllUsers()
    }, [])


    const handleFirstNameClick = (e, id) => {
        navigate(`/user/${id}`)
    }

    return(
        <div>
            <h1>User Profiles</h1>
            <p>Here you can see what everyone else has in their game library!</p>
            <div className='gameDisplay'>
                {users? (
                    users.map((user) => {
                        return (
                            <div className='userProfile'>
                                <p className='firstName' onClick={(e) => handleFirstNameClick(e, user._id)}>{user.username}'s profile</p>
                                <p className='gameCount'>{user.games.length} games</p>
                            </div>
                        )
                    })
                ) : <p>Loading...</p>}
               
            </div>
        </div>
    )
}


export default Games
