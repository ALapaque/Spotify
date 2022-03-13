import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
];

const Center = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [ color, setColor ] = useState<string | null>(null);
  const [ hue, setHue ] = useState<string | null>(null);
  const [ playlistId, setPlaylistId ] = useRecoilState(playlistIdState);
  const [ playlist, setPlaylist ] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, [ playlistId ]);

  useEffect(() => {
    if (!playlistId) return;

    spotifyApi.getPlaylist(playlistId)
              .then((data) => {
                setPlaylist(data.body as any);
              })
              .catch((e) => {
                console.error(e);
              });
  }, [ spotifyApi, playlistId ]);

  if (!session?.user?.image || !session.user.name) {
    return <></>;
  }

  return (
    <div className="flex-grow overflow-y-hidden">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
             onClick={ () => signOut() }>
          <img className="rounded-full w-10 h-10"
               src={ session?.user?.image }
               alt={ session.user.name } />
          <h2>{ session.user.name }</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section className={ `flex items-end space-x-7 bg-gradient-to-b ${ color } to-black h-80 p-8` }>
        <img className="h-44 w-44 shadow-2xl"
             src={ (playlist as any)?.images?.[0]?.url }
             alt={ (playlist as any)?.name } />

        <div className="text-white">
          <small>PLAYLIST</small>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{ (playlist as any)?.name }</h1>
          <small>{ (playlist as any)?.owner?.display_name }</small>
        </div>
      </section>

      <div className="h-screen overflow-y-scroll scrollbar-hide">
        <Songs />
      </div>
    </div>
  );
};

export default Center;
