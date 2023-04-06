import React, {useState} from 'react';
import '../templates/dark_light.css';

const ThemeChange = () => {

    const [darkTheme , setDarkTheme] = useState("true");

    const themeHandeler = () => {
        setDarkTheme(!darkTheme);
    }

    return (
    
<div class={darkTheme ? "container" : "darkMode"  }>
      <div class="sky" onClick={themeHandeler}>
        <img
          class="moon moonrise"
          src="https://i.postimg.cc/B6cVZTXv/moon.png"
          width="70"
          height="70"
          alt=""
        />
        <img class="sun" src="https://i.postimg.cc/XqjDrrCk/sun.png" width="100" height="100" alt="" />
        <img
          class="clouds clouds-dark"
          src="https://i.postimg.cc/rmLHLnyb/clouds-dark.png"
          width="70"
          alt=""
        />
        <img class="clouds clouds-light" src="https://i.postimg.cc/Xv5PmSWd/clouds.png" width="70" alt="" />
      </div>
    </div>    );
};

export default ThemeChange;