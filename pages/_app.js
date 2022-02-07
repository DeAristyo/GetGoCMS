import '../styles/globals.css';
import { Navbar } from '../components/navbar';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>);
}

export default wrapper.withRedux(MyApp);
