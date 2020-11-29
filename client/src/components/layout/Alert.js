import React from "react";
import PropTypes from "prop-types";

export default function Alert({ style, options, message, close }) {
  return (
    <div style={style} className={`alert alert-${options.type === "error" ? "danger" : options.type} alert-dismissible fade show`}>
      {message}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span onClick={close}>&times;</span>
      </button>
    </div>
  );
}

Alert.propTypes = {
  style: PropTypes.any,
  options: PropTypes.any,
  message: PropTypes.any,
  close: PropTypes.any,
};
