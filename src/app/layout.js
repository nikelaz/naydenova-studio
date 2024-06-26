import { comfortaa, roboto } from './fonts';
import { GoogleTagManager } from '@next/third-parties/google';
import Header from './components/header';
import Footer from './components/footer';
import './globals.css';

export const metadata = {
  title: 'Naydenova.studio',
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className={`${roboto.className} ${comfortaa.variable}`}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </body>
    <GoogleTagManager gtmId="GTM-KDJLH69B" />
  </html>
);

export default RootLayout;
