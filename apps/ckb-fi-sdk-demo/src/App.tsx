import { ToastPortal } from '@/components/ToastPortal'
import ThemeProvider from '@/providers/ThemeProvider'
import { CCCProvider } from '@/providers/CCCProvider'
import { AppProvider } from '@/providers/AppProvider'
import AuthProvider from '@/providers/AuthProvider'
import Layout from './Layout'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CCCProvider>
          <AppProvider>
            <>
              <Layout />
              <ToastPortal
                theme="light"
                position="top-center"
                limit={1}
                newestOnTop
                hideProgressBar
                autoClose={2500}
                closeButton={false}
                pauseOnFocusLoss={false}
              />
            </>
          </AppProvider>
        </CCCProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
