import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
  XCircleIcon
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [ playlist, setPlaylist ] = useState<Array<any>>([]);
  const [ playlistId, setPlaylistId ] = useState<number | null>(null);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists({ limit: 50 }).then((data) => {
        setPlaylist(data.body.items);
      });
    }
  }, [ session, spotifyApi ]);

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
      <div className="space-y-4">
        <button onClick={ () => signOut() }
                className="flex items-center space-x-2 hover:text-white">
          <XCircleIcon className="h-5 w-5" />
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>


        <hr className="border-t-[0.1px] border-gray-900" />

        {/* PLAYLIST */ }
        { playlist.map((playlist) => (
          <p
            key={ playlist.id }
            className="cursor-pointer hover:text-white"
            onClick={ () => setPlaylistId(playlist.id) }>
            { playlist.name }
          </p>
        )) }
      </div>
    </div>
  );
};

export default Sidebar;
