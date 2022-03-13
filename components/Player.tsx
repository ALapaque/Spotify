import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPLayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
  const [ isPlaying, setIsPlaying ] = useRecoilState(isPLayingState);
  const [ volume, setVolume ] = useState<number>(50);

  const songInfo = useSongInfo();
  const fetchCurrentPlayingState = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch the songInfo
      fetchCurrentPlayingState();
    }
  }, [ currentTrackId, spotifyApi, session ]);

  if (!songInfo) {
    return <></>;
  }

  return (
    <div>
      {/* LEFT */ }
      <div>
        <img className="hidden md:inline w-10 h-10"
             src={ (songInfo as any).album.images?.[0]?.url }
             alt="" />
      </div>
    </div>
  );
};

export default Player;
