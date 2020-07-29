import Head from 'next/head'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import { loginWithGoogle, logout, UserContext } from '../firebase/rs-firebase';
import { useCallback, useContext, useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, CardActions, TextField, List, ListItem, Checkbox, ListItemIcon, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import { isNullOrUndefined } from 'util';
import firebase from 'firebase';

interface IIp {
  ip: string
}
function LogoutView({ logOut, logIn }) {
  const user = useContext<any>(UserContext);
  console.log(user);
  if (user.loggedIn == true) {
    return (
      <div>
        <span>You are logged in as {user.email}</span>
        <Button color="primary" onClick={logOut}>Logout</Button>
      </div>
    );
  } else if (user.loggedIn == false) {
    return (<div>
      <span>Please login first</span>
      <Button color="primary" onClick={logIn}>Google</Button>
    </div>)
  } else {
    return (<div></div>);
  }
}

async function getToken() {
  const db = firebase.firestore();
 
}

const useServerLocations = () => {
  const { data, error } = useSWR('https://localhost:5001/user', axios);
  return {
    servers: data?.data as IIp[],
    error: error
  }
}



const Home = () => {
  const [current, setCurrent] = useState<string>();
  const [finishedPing, setfinishedPing] = useState<boolean>(false);
  const [valideEndpoints, setvalideEndpoints] = useState<string[]>([]);
  const user = useContext<any>(UserContext);
  const router = useRouter()
  // const { servers, error } = useServerLocations();
  // if (error) return <div>failed to load</div>
  // if (!servers) return <div>loading...</div>
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    (async function anyNameFunction() {
      if (router.query.servers) {
        if (user.loggedIn) {
          setvalideEndpoints([])
          setfinishedPing(false);
          for (const server of router.query.servers) {
            setCurrent((p) => server);
            try {
              var result = await axios.get(server, { timeout: 2000, cancelToken: source.token });
              setvalideEndpoints((prev) => [...prev, server])
            } catch (e) {

            }
          }
          setfinishedPing(true);
        }
      }

    })();

    return () => {
      source.cancel();
    }
  }, [router.query.servers, user])
  const requestLogin = useCallback(() => {
    
    loginWithGoogle();
  }, []);
  const requestLogout = useCallback(() => {
    setvalideEndpoints([])
    setfinishedPing(false)
    logout();
  }, []);

  console.log(router.query);

  console.log(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
  return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">
            Welcome to <span className="titlefocus">RedSeat</span>
          </h1>

          <p className="description">Regsiter your server!</p>

          <div className="grid">

            
            <Card className="serverinfocontainer" style={{ width: '100%' }}>
              <CardContent>
              <LogoutView logOut={requestLogout} logIn={requestLogin} />
                <Typography variant="body1" component="div">
                  {user.loggedIn && !finishedPing ? <div><p className="description">Trying to communicate with you at {current}...</p></div> : <div></div>}
                </Typography>


                <List>
      {valideEndpoints.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={(() => {})}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={true}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
              </CardContent>
              {user.loggedIn ? (<CardActions>
                <Button onClick={getToken}>SAVE NEW ENDPOINT</Button>
              </CardActions>) : <div></div>}
            </Card>
          </div>
        </main>


        <style jsx>{`
        .serverinfocontainer {
          
          width: 100%; !important
        }

            
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
      }
      .titlefocus {
        color: red;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }

      .grid {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

        <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
      </div>
  );
}

export default Home
