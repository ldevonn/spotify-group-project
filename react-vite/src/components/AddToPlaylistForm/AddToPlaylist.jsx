import spotifyLogo from '../../media/spotifyLogo.png'
import { fetchAddToPlaylist } from '../../redux/playlists';
import { fetchPlaylistByCurrentUser } from "../../redux/playlists"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import "./AddToPlaylist.css"

function AddToPlaylist() {
  let { trackId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [playlist, setPlaylist] = useState()
  const [errors, setErrors] = useState({})

//   const spotState = useSelector((state) => state.spots.allSpots) || {}
//   const spots = Object.values(spotState)

  const usersPlaylists = useSelector(state => state.playlists.allPlaylists) || {};

  useEffect(() => {
    dispatch(fetchPlaylistByCurrentUser())
  }, [dispatch, sessionUser])

  if (!sessionUser) return <Navigate to="/" replace={true} />

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("TrackId: ", trackId)
    console.log("PlaylistId: ", playlist)
    trackId = parseInt(trackId)
    if (playlist) {
        const serverResponse = await dispatch(
            fetchAddToPlaylist({
                "track_id": trackId
            }, playlist)
        )
        if (serverResponse) {
          setErrors(serverResponse)
        } else {
          navigate(`/playlists/${playlist}`)
        }
    }
    else {
        return
    }
  }

  return (
    <>
      <div className='editPlaylistFormPage'>
        <img id='spotifyLogo' src={spotifyLogo} onClick={() => navigate('/')} />
        <div className='editPlaylistFormCard'>
          <h1 id='editPlaylistFormTitle'>Add to a playlist</h1>
          <form id='editPlaylistForm' onSubmit={handleSubmit} >

            {errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}

            {Object.keys(usersPlaylists).length && <>
            <label style={{ background: 'none'}} htmlFor='playlist'>Select a playlist</label>
            <select style={{ background: 'none', color: 'white'}} id='playlist' name='playlist' value={playlist} onChange={(e) => setPlaylist(e.target.value)}>
                <option className='playlist-option' value={null}>Select</option>
                {usersPlaylists && Object.keys(usersPlaylists).map(playlistId => {
                    return (<option className='playlist-option' key={playlistId} value={playlistId}>{usersPlaylists[playlistId].name}</option>)
                })}
            </select>
            </>}

            <button id='playlistSubmit' type='submit'>Add to Playlist</button>
          </form>
        </div>
      </div>
    </>
  )

}

export default AddToPlaylist
