import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Body from "./pages/Body";
import { Provider } from "react-redux";
import appStore from "./utlis/appStore";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <ThemeProvider>
          <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/login" element={<Login />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
