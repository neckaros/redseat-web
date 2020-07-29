import { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'querystring';
import axios from 'axios';
import firebase from '../../lib/firebase';


const isString = (object) => typeof object === 'string' || object instanceof String;

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (!isString(req.query['id']) && !isString(req.query['key'])) {
        return res.status(501).json({message: 'you must provide an id and a key'})
    }
        const db = firebase.firestore();
    const tokenPathRef = await db.collection('sharedtokens').doc(req.query['id'] as string).get();
    const tokenPath = tokenPathRef.data();
    if (!tokenPath) {
        return res.status(404).json({message: 'unable to find token with id:' + req.query['id']})
    }

    const snapshot = await db.collection('users').doc(tokenPath.user).collection('tokens').doc(tokenPath.token).get();


    var refreshToken = req.query["rt"];
    var requestObject = {
        "client_id": process.env.GOOGLE_CLIENTID,
        "client_secret": process.env.GOOGLE_SECRET,
        "refresh_token": snapshot.data().refreshToken,
        "grant_type": "refresh_token",

    }


  var tokenResponse = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify(requestObject));
  res.status(200).json(tokenResponse.data)
}