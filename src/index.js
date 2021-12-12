import React, {useReducer} from "react"
import App from "./App"
import {defaultState, musicContext, reducer} from "./store";

export default function () {
    const [state, dispatch] = useReducer(reducer, defaultState)

    return (
        <React.Suspense fallback={<div>loading</div>}>
            <musicContext.Provider value={{state, dispatch}}>
                <App/>
            </musicContext.Provider>
        </React.Suspense>
    )
}