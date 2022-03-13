import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPLayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

interface Props {
  track: any,
  order: number
}

const Song = (props: Props) => {
  const spotifyApi = useSpotify();
  const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
  const [ isPLaying, setIsPlaying ] = useRecoilState(isPLayingState);

  const playsong = async () => {
    setCurrentTrackId(props.track.id);
    setIsPlaying(true);
    await spotifyApi.play({uris: [props.track.uri]});
  };

  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 cursor-pointer rounded-lg"
    onClick={playsong}>
      <div className="flex items-center space-x-4">
        <p>{ props.order + 1 }</p>
        <img className="h-10 w-10"
             src={ props.track.album.images[0].url }
             alt="" />
        <div>
          <p className="w-36 lg:-w64 truncate text-white">{ props.track.name }</p>
          <p className="w-40">{ props.track.artists?.[0]?.name }</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{ props.track.album.name }</p>
        <p>{ millisToMinutesAndSeconds(props.track.duration_ms) }</p>
      </div>
    </div>
  );
};

export default Song;
