import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon as VolumeOffSolidIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import {
  currentTrackIdState,
  isMuteState,
  isPLayingState,
} from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPLayingState)
  const playlist = useRecoilValue<any>(playlistState)
  const [isMute, setIsMute] = useRecoilState(isMuteState)
  const [volume, setVolume] = useState<number>(50)

  const songInfo: any = useSongInfo()
  const fetchCurrentPlayingState = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
        setCurrentTrackId(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(async (data: any) => {
      if (data.body.is_playing) {
        await spotifyApi.pause()
        setIsPlaying(false)
      } else {
        await spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }
  const handleMute = () => {
    if (isMute) {
      setVolume(50)
      setIsMute(false)
      return
    }

    setVolume(0)
    setIsMute(true)
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch the songInfo
      fetchCurrentPlayingState()
    }
  }, [currentTrackId, spotifyApi, session])

  useEffect(() => {
    if (volume >= 0 && volume <= 100) {
      debounceAdjustVolume(volume)
    }
  }, [volume])

  const debounceAdjustVolume = useCallback(
    debounce((volume: number) => {
      spotifyApi.setVolume(volume).catch((e: any) => {})
    }, 500),
    []
  )

  if (!songInfo) {
    return <></>
  }

  const PlayPauseButton = isPlaying ? PauseIcon : PlayIcon
  const VolumeDownMuteButton = isMute ? VolumeOffSolidIcon : VolumeUpIcon

  console.log('playlist :: ', playlist)

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
      {/* LEFT */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        <PlayPauseButton
          onClick={handlePlayPause}
          className="button h-10 w-10"
        />

        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownMuteButton onClick={() => handleMute()} className="button" />

        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          min={0}
          max={100}
          step={1}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

export default Player
