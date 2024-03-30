import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage'
import AlbumDetails from '../components/AlbumDetails/AlbumDetails';
import AlbumFormPage from '../components/AlbumFormPage/AlbumFormPage.jsx';
import PlaylistFormPage from '../components/PlaylistFormPage/PlaylistFormPage.jsx';
import MusicPlayer from "../components/MusicPlayer/MusicPlayer.jsx";
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: '/player',
        element: <MusicPlayer/>,
      },
      {
        path: '/albums/:albumId',
        element: <AlbumDetails />
      },
      {
        path: '/albums/new',
        element: <AlbumFormPage />
      },
      {
        path: '/playlists/new',
        element: <PlaylistFormPage />
      }
    ],
  },
]);
