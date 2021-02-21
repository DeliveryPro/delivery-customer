import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'
import AuthContext from './AuthContext'
import ErrorContext from './ErrorContext'
import AuthReducer from './rsm/reducers/auth'
import ErrorReducer from './rsm/reducers/error'

const App = () => {
    return (
        <ErrorContext.Provider value={ErrorReducer()}>
            <AuthContext.Provider value={AuthReducer()}>
                <NavigationContainer>
                    <Router />
                </NavigationContainer>
            </AuthContext.Provider>
        </ErrorContext.Provider>
    )
}

export default App
