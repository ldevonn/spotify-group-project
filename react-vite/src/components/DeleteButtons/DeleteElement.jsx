import { useState } from 'react';
import {useDispatch} from "react-redux";
import {fetchDeletePlaylist} from '../../redux/playlists.js'
import {fetchDeleteAlbum} from '../../redux/albums.js'
import { useNavigate } from 'react-router-dom';
import './DeleteElement.css';

function DeleteElement(props) {
    const [isImageRed, setIsImageRed] = useState(false); // State to track image color
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUrl = window.location.pathname

    const handleClick = async () => {
        if (!isImageRed) {
            setIsImageRed(true); // Toggle image color between black and red
        } else {
            try {
                if (props.albumId) await handleDelete(props.albumId)
                if (props.playlistId) await handleDelete(props.playlistId)
                navigate('/')
            } catch (error) {
                console.error('Error deleting element:', error)
            }
        }
    };
    console.log(currentUrl)

    const handleDelete = async (elementId) => {
        try {
            if (currentUrl.startsWith('/playlist')) {
                console.log('Line 19:', elementId)
                await dispatch(fetchDeletePlaylist(elementId))
            } else if (currentUrl === '/albums/manage') {
                await dispatch(fetchDeleteAlbum(elementId))
            } else {
                console.log('current url not supported')
            }
        } catch (error) {
            console.error('Error deleting element:', error)
        }
    }

    return (
        <>
            <div className='delete-playlist-comp'>
                <div
                    id='delete-playlist-img'
                    className={isImageRed ? 'red-image' : ''}
                    onClick={handleClick}
                >
                    <i className="fa-solid fa-delete-left"></i>
                </div>
            </div>
        </>
    );
}

export default DeleteElement;
