import './App.css'
import {Toaster} from "react-hot-toast";
import 'sweetalert2/themes/material-ui.css'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Header} from "./components/e_commerce/components/layout/Header.tsx";
import {Footer} from "./components/e_commerce/components/layout/Footer.tsx";
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./components/e_commerce/routes/Router.tsx";
import {useThemeStore} from "./components/e_commerce/store/ThemeStore.ts";

function App() {

    const queryClient = new QueryClient();

    const theme = useThemeStore(state => state.theme);

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div
                    className={"d-flex flex-column min-vh-100 bg-body text-body"}
                    data-bs-theme={theme}
                >
                    {/*<CounterComponent/>*/}

                    <Header/>
                    <main className={"grow"}>
                        <AppRoutes/>
                    </main>
                    <Footer/>
                    <Toaster/>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
