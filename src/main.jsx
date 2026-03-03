import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './ContextAPI/ContextShare.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthContext from './ContextAPI/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextShare>
        <GoogleOAuthProvider clientId="683096533699-8h8dfsbq0k90ug8p8mj7posg74ct15mt.apps.googleusercontent.com">
          <AuthContext>
            <App />
          </AuthContext>
        </GoogleOAuthProvider>
      </ContextShare>
    </BrowserRouter>
  </StrictMode>
)
