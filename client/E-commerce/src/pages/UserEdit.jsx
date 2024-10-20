import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  userDetailByIdAction,
  userUpdateAction,
} from "../redux/actions/userAction";
import {
  userDetailByIdSelector,
  userLoginSelector,
  userUpdateSelector,
} from "../redux/selector/selectors";
import Toast from "../components/Toast";
import Loading from "../components/Loading";
import { USER_UPDATE_RESET } from "../redux/constants/userConstant";
import Alert from "../components/Alert";

const UserEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(userLoginSelector);
  const { userInfo } = userLogin;
  const { id } = useParams();
  const userDetailById = useSelector(userDetailByIdSelector);
  const { user, error: userDetailError } = userDetailById;

  const userUpdate = useSelector(userUpdateSelector);
  const { error, loading, success } = userUpdate;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [toast, setToast] = useState(false);
  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/user-list");
    } else {
      if (userInfo && userInfo.isAdmin) {
        if (!user?.name || user._id !== id) {
          dispatch(userDetailByIdAction(id));
        } else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
      } else {
        navigate("/login");
        return;
      }
    }
  }, [dispatch, navigate, userInfo, id, success, user]);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(userUpdateAction(id, { name, email, isAdmin }));
    dispatch(userDetailByIdAction(id));
    setToast(true);
  };
  console.log(isAdmin);
  return (
    <div>
      <div>
        <Link to="/admin/users-list" className="btn btn-ghost">
          Go back
        </Link>
      </div>

      <div className="flex justify-center items-center flex-col mt-24 lg:w-96 mx-auto">
        {loading ? (
          <Loading />
        ) : userDetailError ? (
          <Toast content={error} status="error" />
        ) : (
          <div className="w-full">
            <h1 className="text-3xl uppercase font-semibold	">Edit USER</h1>
            {error && <Alert content={error} status="error" />}

            {toast && (
              <Toast content="Update Profile successfully" status="success" />
            )}
            <form className="w-full" onSubmit={submitHandle}>
              <label className="input input-bordered flex items-center gap-2 my-4 w-full">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 my-4 w-full">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <span className="label-text">Is Admin</span>
              </label>
              <button className="btn w-full">Update</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEdit;
