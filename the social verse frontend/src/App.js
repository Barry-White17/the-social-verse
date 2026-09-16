import MainRouter from './MainRouter.js'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './hooks/userHook.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/styles'
import theme from './theme.js'

const defaultOptions = {
    queries: {
        gcTime: 60 * 1000,
        staleTime: 5 * 60 * 1000,
    },
}

const queryClient = new QueryClient({
    defaultOptions,
})

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <UserContextProvider>
                        <MainRouter />
                    </UserContextProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
