import React from 'react';
export default class Settings extends React.Component{
  render(){
    return(
      <div>
      <div className="col-md-6 acct-body">
      <div className="row">
        <div className="col-md-12">
        <span className="bdy-hdr">Preferences</span>
        <hr>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
      <span className="bdy-hdr-sub">On Startup</span>
      <div className="checkbox">
        <label><input type="checkbox">Open Online Tracking Tool</label>
      </div>
      <div className="checkbox">
        <label><input type="checkbox">Open Settings</label>
      </div>
      <div className="checkbox">
        <label><input type="checkbox">Open Course History</label>
      </div>
      <hr>
    </div>
  </div>
  <div className="row">
    <div className="col-md-12">
      <span className="bdy-hdr-sub">Font Size</span>
      <div className="checkbox">
        <label><input type="checkbox">Small</label>
      </div>
      <div className="checkbox">
        <label><input type="checkbox">Standard</label>
      </div>
      <div className="checkbox">
        <label><input type="checkbox">Large</label>
      </div>
      <hr>
    </div>
  </div>
  <div className="row">
    <div className="col-md-12">
      <span className="bdy-hdr-sub">Themes</span>
      <div className="checkbox">
        <label><input type="checkbox">Standard</label>
      </div>
      <div className="checkbox">
        <label><input type="checkbox">Dark</label>
      </div>
      <div className="checkbox">
        <label><input type="checkbox">Greyscale</label>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
    )
  }
}
