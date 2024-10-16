import { useDispatch, useSelector } from "react-redux";
import {
  userListSelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import { useEffect } from "react";
import { userDeleteAction, userListAction } from "../redux/actions/userAction";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const userList = useSelector(userListSelector);
  const { users, loading, error } = userList;
  const dispatch = useDispatch();
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userListAction());
    } else {
      navigate("/login");
      return;
    }
  }, [dispatch, navigate, success]);

  const deleteUserHandle = (id) => {
    dispatch(userDeleteAction(id));
  };
  return (
    <div>
      <h1 className="text-3xl uppercase font-weight">USER LIST</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert content={error} status="error" />
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.map((user) => (
                  <tr key={user._id}>
                    <th>{user._id}</th>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto: ${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i className="fa-solid fa-check text-green-600"></i>
                      ) : (
                        <i className="fa-solid fa-xmark text-red-500"></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/user/${user._id}`}>
                        <button className="btn btn-secondary mr-2">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button
                        className="btn btn-error"
                        onClick={() => deleteUserHandle(user._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
