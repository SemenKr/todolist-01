import './App.css'
import {Toaster} from 'sonner';
import {Header} from '@/common/components/layout/Header.tsx';
import {ThemeProvider} from '@/components/theme-provider.tsx';
import {Main} from '@/app/Main.tsx';


export const App = () => {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen flex flex-col bg-background">
                <Header/>
                <Main/>
                <Toaster position={'bottom-center'} duration={700}/>
            </div>
        </ThemeProvider>
    )
}
