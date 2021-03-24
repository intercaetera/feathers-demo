import { useEffect } from 'react';
import { logout } from '../feathers';

export default function Logout() {
  useEffect(() => {
    logout();
    window.location = '/';
  }, []);

  return <p>Logging out...</p>
}
