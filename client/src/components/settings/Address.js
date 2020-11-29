import React from "react";

export default function Address() {
  return (
    <form className="w-100">
      <div className="form-row">
        <div className="form-group col-6">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" id="address" placeholder="ul. Edwarda Wittiga" />
        </div>
        <div className="form-group col-3">
          <label htmlFor="house_number">House</label>
          <input type="text" className="form-control" id="house_number" placeholder="34" />
        </div>
        <div className="form-group col-3">
          <label htmlFor="apartment_number">Apartment number</label>
          <input type="text" className="form-control" id="apartment_number" placeholder="23" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="additional_address">Additional Address</label>
        <input type="text" className="form-control" id="inadditional_addressputAddress2" placeholder="ul. Edwarda Wittiga" />
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="city">City</label>
          <input type="text" className="form-control" id="city" placeholder="Wroclaw" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputState">State</label>
          <select id="inputState" className="form-control">
            <option defaultValue="Choose">Choose...</option>
            <option value="Lowe">Lower Silesia</option>
            <option value="Kuja">Kujawsko-Pomorskie</option>
            <option value="Łódź">Łódź Province</option>
            <option value="Lubl">Lublin Province</option>
            <option value="Lubu">Lubuskie Province</option>
            <option value="Mało">Małopolska Province</option>
            <option value="Maso">Masovia Province</option>
            <option value="Opol">Opole Province</option>
            <option value="Podk">Podkarpackie Province</option>
            <option value="Podl">Podlasie Province</option>
            <option value="Pome">Pomerania Province</option>
            <option value="Sile">Silesia Province</option>
            <option value="Holy">Holy Cross Province</option>
            <option value="Warm">Warmia-Masuria</option>
            <option value="Wiel">Wielkopolska Province</option>
            <option value="West">West Pomerania</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="zip">Zip</label>
          <input type="text" className="form-control" id="zip" placeholder="51-526" />
        </div>
      </div>
      <div className="form-group">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck" />
          <label className="form-check-label" htmlFor="gridCheck">
            Choose as default address
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-success d-block ml-auto">
        Save
      </button>
    </form>
  );
}
