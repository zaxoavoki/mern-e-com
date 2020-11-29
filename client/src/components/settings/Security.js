import React from "react";

export default function Security() {
  return (
    <div className="row">
      <form className="w-100">
        <div className="form-group">
          <label htmlFor="old_password">Old password</label>
          <input type="password" className="form-control" id="old_password" name="old_password" />
        </div>
        <div className="form-group">
          <label htmlFor="new_password">New password</label>
          <input type="password" className="form-control" id="new_password" name="new_password" />
        </div>
        <div className="form-group">
          <label htmlFor="new_password_confirmation">New password confirmation</label>
          <input type="password" className="form-control" id="new_password_confirmation" name="new_password_confirmation" />
        </div>
        <button className="btn btn-success ml-auto d-block">Update password</button>
      </form>
    </div>
  );
}
