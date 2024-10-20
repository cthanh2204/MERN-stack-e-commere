import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Toast({ status, content }) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    // Tự động ẩn toast sau 3 giây (3000ms)
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Dọn dẹp bộ hẹn giờ khi component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className={`alert alert-${status}`}>
            <span>{content}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Toast;
