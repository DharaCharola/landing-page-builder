import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <header className="hl_header nav-shrink ">
        <div className="container-fluid">
          <select className="selectpicker hl_header--picker" data-width="fit" data-header="Switch Location <a href='#'>View Locations</a>">
            <option data-content="<img src='./img/img-converse.png'> Converse Store #32">Converse Store/#32</option>
            <option data-content="<img src='./img/img-nike1.png'> Nike Store, 49 Garnet Stream, Baja, CA">Nike/Store, 49 Garnet Stream, Baja, CA</option>
            <option data-content="<img src='./img/img-nike2.png'> Nike Store, Andersen Center 83b, West 82nd/Street, San Francisco, CA">Nike Store, Andersen Center 83b, West 82nd Street, San Francisco, CA</option>
          </select>
          <div className="hl_header--controls">
            <a href="#" className="btn btn-circle btn-yellow hl_header--recent-activities -notification" id="recent_activities-toggle">
              <i className="icon-list"></i>
              <span className="sr-only">View Recent Activities</span>
            </a>
            <a href="#" className="btn btn-circle btn-primary hl_header--copy-link" data-toggle="modal" data-target="#review-link--modal">
              <i className="icon-link"></i>
              <span className="sr-only">Copy Review Link</span>
            </a>
            <div className="hl_header--dropdown hl_header--phone dropdown --no-caret">
              <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="btn btn-circle btn-green-lt"><i className="fas fa-phone"></i></span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="hl_header--phone-header">
                  <h4>Phone Settings</h4>
                </div>
                <div className="caller-id">
                  <div className="caller-id-header">
                    <h3>Caller ID:</h3>
                    <a href="#">Manage Numbers</a>
                  </div>
                  <div className="form-group">
                    <div className="select-control-wrap">
                      <select className="select-control">
                        <option>+1 802-327-5248 (Primary Number)</option>
                        <option>Manage/change phone numbers →</option>
                      </select>
                    </div>
                    <button type="button" className="btn btn-primary"><i className="icon icon-duplicate"></i>
                    </button>
                  </div>
                </div>
                <div className="call-recording">
                  <h3>Call Recording:</h3>
                  <div className="toggle">
                    <input type="checkbox" className="tgl tgl-light" id="call-recording"/>
                      <label className="tgl-btn" for="call-recording"></label>
              </div>
                  </div>
                  <div className="audio-settings">
                    <h3>Audio Settings:</h3>
                    <div className="audio-settings-item">
                      <label>Sound Output</label>
                      <div className="select-control-wrap">
                        <select className="select-control">
                          <option>System Default</option>
                          <option>Built-in Output</option>
                        </select>
                      </div>
                      <a href="#" className="test">Test</a>
                    </div>
                    <div className="audio-settings-item">
                      <label>Ringing:</label>
                      <div className="select-control-wrap">
                        <select className="select-control">
                          <option>System Default</option>
                          <option>Built-in Output</option>
                        </select>
                      </div>
                      <a href="#" className="test">Test</a>
                    </div>
                    <div className="audio-settings-item">
                      <label>Microphone:</label>
                      <div className="select-control-wrap">
                        <select className="select-control">
                          <option>System Default</option>
                          <option>Built-in Output</option>
                        </select>
                      </div>
                      <a href="#" className="test">Test</a>
                    </div>
                  </div>
                  <div className="hl_header--phone-footer">
                    <div className="form-group">
                      <i className="fas fa-phone"></i>
                      <input type="text" className="form-control" placeholder="Dial a number"/>
                        <button type="button" className="btn btn-success btn-sm">Call</button>
              </div>
                    </div>
                  </div>
                </div>
                <div className="hl_header--dropdown dropdown --no-caret">
                  <a href="#" className="hl_header--avatar dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="avatar">
                      <div className="avatar_img">
                        <img src="./img/img-avatar-sample1.png" alt="Avatar Name"/>
              </div>
                      </div>
          </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
        </div>
                </div>
              </div>
  </header>
            )
        }
    }
