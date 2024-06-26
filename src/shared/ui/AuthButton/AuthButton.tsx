import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/providers/StoreProvider/
import { login, logout } from '../../../features/Auth/authSlice'; // Thunk actions

const AuthButton: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login()); // Dispatch login action (thunk)
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action (thunk)
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Выйти</button>
        </>
      ) : (
        <button onClick={handleLogin}>Войти</button>
      )}
    </div>
  );
};

export default AuthButton;
