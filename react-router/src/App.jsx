import { HashRouter, Routes, Route } from 'react-router-dom'
import { Menu } from './Menu'
import { AuthProvider } from './auth'
import { HomePage } from './HomePage'
import { BlogPage } from './BlogPage'
import { LoginPage } from './LoginPage'
import { LogoutPage } from './LogoutPage'
import { ProfilePage } from './ProfilePage'
import { BlogPost } from './BlogPost'

function App() {

  return (
    <>
      
      <HashRouter>
        <AuthProvider>
          <Menu />

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/blog" element={<BlogPage />}>
              <Route path=":slug" element={<BlogPost />} />
            </Route>


            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="*" element={<p>Not Found</p>} />
          </Routes>

          <footer></footer>

        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App
