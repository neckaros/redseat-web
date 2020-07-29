import { AppProps } from 'next/app'

import { loginWithGoogle, logout, ProvideUser, UserContext } from '../firebase/rs-firebase';


function MyApp({ Component, pageProps }: AppProps) {
  return <ProvideUser><Component {...pageProps} /></ProvideUser>
}

export default MyApp