import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

const UseSpotify = () => {
  const { data: session, status} = useSession();

  useEffect(() => {
    if (session) {
      if ((session as any).error === 'ErrorRefreshingToken') {
        signIn();
      }

      spotifyApi.setAccessToken((session.user as any).accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default UseSpotify;
