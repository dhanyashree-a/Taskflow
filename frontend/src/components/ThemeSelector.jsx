import "./ThemeSelector.css";

function ThemeSelector({ theme, setTheme }) {

    return (

       <div className={`theme-card ${theme}`}>

            <h3>✨ Personalize UI</h3>

            <div className="theme-buttons">

                <button
                    className={`theme-circle purple ${theme==="purple" ? "active-theme" : ""}`}
                    onClick={()=>setTheme("purple")}
                />

                <button
                    className={`theme-circle blue ${theme==="blue" ? "active-theme" : ""}`}
                    onClick={()=>setTheme("blue")}
                />

                <button
                    className={`theme-circle green ${theme==="green" ? "active-theme" : ""}`}
                    onClick={()=>setTheme("green")}
                />

               <button
    className={`theme-circle cyan ${theme==="cyan" ? "active-theme" : ""}`}
    onClick={() => setTheme("cyan")}
/>

                <button
                    className={`theme-circle sunset ${theme==="sunset" ? "active-theme" : ""}`}
                    onClick={()=>setTheme("sunset")}
                />

            </div>

        </div>

    );

}

export default ThemeSelector;