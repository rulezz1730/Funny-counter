import React from "react";
import {Routes, Route} from "react-router-dom";
import CounterApp from "./CounterApp";
import CounterAppTwo from "./components/CounterAppTwo";
import Header from "./components/Header";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/1' element={<CounterApp/>}/>
                <Route path='/2' element={<CounterAppTwo/>}/>
            </Routes>
        </div>
    )
}

export default App