import { useEffect, useState, useContext,  } from "react"
import Navbar from "../components/navbar"

import { ThemeContext  } from '../components/themeContext'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import base_url from "../config";

//components
 import WorkoutDetails from '../components/workoutDetails'
 //const isAuthenticated = !!localStorage.getItem('token');
 


const Home = () => {
    const[workouts, setWorkouts] = useState(null)
    const { darkMode, setDarkMode } = useContext(ThemeContext);
     
    // Function to toggle the theme
    const toggleTheme = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
      };
    

     useEffect(() => {
        const fetchWorkouts = async() => {
           const response = await fetch(`${base_url}/api/workouts`)
           const json = await response.json()

           if(response.ok) {
             setWorkouts(json)
           }
        }
        fetchWorkouts()
     },[])

    return(
        
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <div>
            <Navbar />
            <p> <br/><br/><br/><br/> <br/></p>
            <DarkModeIcon onClick={toggleTheme} className={darkMode ? 'icon-colorr' : 'icon-color'} />
            {/* {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} */}
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                     <WorkoutDetails key={workout._id} workout={workout}/>
                 
                ))}
            </div>
            </div>
            
        </div>
    )
}

export default Home
