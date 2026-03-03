import React, { createContext, useState } from 'react'

// 1. create context
export const userUpdateContext = createContext("")
export const adminUpdateContext = createContext("")

function ContextShare({ children }) {
    // 2 create state
    const [userEditResponse, setUserEditResponse] = useState({})
    const [adminEditResponse, setAdminEditResponse] = useState({})
    return (
        <>
            {/* 3. wrap provider to childern */}
            <userUpdateContext.Provider value={{ userEditResponse, setUserEditResponse }}>
                <adminUpdateContext.Provider value={{ adminEditResponse, setAdminEditResponse }}>
                    {children}
                </adminUpdateContext.Provider>
            </userUpdateContext.Provider>

        </>
    )
}

export default ContextShare