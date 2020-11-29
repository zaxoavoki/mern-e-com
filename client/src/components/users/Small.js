import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faStar, faTools } from "@fortawesome/free-solid-svg-icons";

export default function Small({ user, removeUser }) {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <div className="border rounded mb-3 p-3 d-flex align-items-center">
      <img className="user-img-small rounded mr-3" src={user.avatar} alt={user.name + "image"} />
      <div>
        <h3 className="user-name mb-0">
          {user.username}
          {user.role == 2 && <FontAwesomeIcon className="align-baseline small text-warning ml-1" icon={faStar} />}
          {user.role == 1 && <FontAwesomeIcon className="align-baseline small text-primary ml-1" icon={faTools} />}
        </h3>
        <p className="text-muted small mb-0">{user.email}</p>
      </div>
      {user._id !== currentUser._id && user.role < 2 && (
        <div className="align-self-start ml-auto dropdown">
          <FontAwesomeIcon className="hoverable text-muted dropdown-toggle" icon={faEllipsisH} data-toggle="dropdown" size="lg" />
          <div className="dropdown-menu dropdown-menu-right">
            {user.role === 0 && <span className="dropdown-item">Promote</span>}
            {user.role !== 0 && <span className="dropdown-item">Demote</span>}
            <span className="dropdown-item" onClick={() => removeUser(user._id)}>
              Remove
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

Small.propTypes = {
  user: PropTypes.any,
  removeUser: PropTypes.any,
};
