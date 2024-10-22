import { useDispatch, useSelector } from "react-redux";
import {
  userListSelector,
  userLoginSelector,
} from "../redux/selector/selectors";
import { useEffect } from "react";
import { userDeleteAction, userListAction } from "../redux/actions/userAction";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const UserList = () => {
  const userList = useSelector(userListSelector);
  const { users, loading, error } = userList;
  const dispatch = useDispatch();
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userListAction());
    } else {
      navigate("/login");
      return;
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteUserHandle = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(userDeleteAction(id));
    }
  };
  return (
    <div>
      <h1 className="text-3xl uppercase font-weight">USER LIST</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Toast content={error} status="error" />
      ) : (
        <div className="w-full">
          <div className="overflow-x-auto w-full">
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
                      <Link to={`/admin/user/${user._id}`}>
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