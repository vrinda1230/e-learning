import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import "antd/dist/antd.css"
import "../public/css/styles.css"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "../context";

function MyApp({Component, pageProps}){
    return (
        <Provider>
            <ToastContainer  position="top-center" />
            <TopNav />
            <div style={{ paddingBottom: '60px' }}>
              <Component {...pageProps} />
            </div>
            <Footer />
        </Provider>
    );
}

export default MyApp;