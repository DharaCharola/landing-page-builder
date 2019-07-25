import React, { Component } from "react";
import Header from "./Header";
import { times } from "lodash";
import $ from "jquery";
export default class LandingPage extends Component {
  state = {
    allObjects: [],
    currentRow: "",
    currentColumn: "",
    showRowPane: false,
    showElementsPane: false,
    showHeaderSettings: false,
    showImageSettings: false,
    currentHeaderText: "",
    currentImageText: "",
    currentSortOrder: 1
  };

  // Selects the exact poisition to place element
  addNewElement = (rowIndex, colIndex) => {
    this.setState({
      currentRow: rowIndex,
      currentColumn: colIndex,
      showElementsPane: true
    });
  };

  // Sets the text for header element
  setHeaderText = () => {
    const { currentRow, currentColumn, currentHeaderText } = this.state;
    const array = [...this.state.allObjects];
    array[currentRow].elements[currentColumn] = {
      ...array[currentRow].elements[currentColumn],
      text: currentHeaderText
    };
    this.setState({
      allObjects: array,
      showHeaderSettings: false,
      currentHeaderText: ""
    });
  };

  // Sets the src for image element
  setImageText = () => {
    const { currentRow, currentColumn, currentImageText } = this.state;
    const array = [...this.state.allObjects];
    array[currentRow].elements[currentColumn] = {
      ...array[currentRow].elements[currentColumn],
      text: currentImageText
    };
    this.setState({
      allObjects: array,
      showImageSettings: false,
      currentImageText: ""
    });
  };

  // Openup the settings pane for selected element ( image & header )
  showElementSettingsPane = (type, rowIndex, colIndex) => {
    this.setState({
      [type]: true,
      currentRow: rowIndex,
      currentColumn: colIndex
    });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  // Adds the selected elememt to selected position
  addSelectedElement = tag => {
    const { currentRow, currentColumn } = this.state;
    const array = [...this.state.allObjects];
    array[currentRow].elements[currentColumn] = {
      ...array[currentRow].elements[currentColumn],
      type: tag
    };
    this.setState({ allObjects: array, showElementsPane: false });
  };

  //  Adds the new row with selected no. of columns
  addRow = rowCount => {
    let object = {
      type: "row",
      sortOrder: this.state.currentSortOrder,
      parent: 0,
      rowCount: rowCount,
      elements: []
    };
    this.setState({
      allObjects: [...this.state.allObjects, object],
      showRowPane: false,
      currentSortOrder: this.state.currentSortOrder + 1
    });
  };

  /** Sorting Start */

  // Change the sort order of row to one position up
  rowUp = rowIndex => {
    if (rowIndex === 0) return false;
    const array = [...this.state.allObjects];
    array[rowIndex].sortOrder -= 1;
    array[rowIndex - 1].sortOrder += 1;
    this.setState({ allObjects: array });
  };

  // Change the sort order of row to one position up
  rowDown = rowIndex => {
    if (rowIndex === this.state.allObjects.length - 1) return false;

    const array = [...this.state.allObjects];
    array[rowIndex].sortOrder += 1;
    array[rowIndex + 1].sortOrder -= 1;
    this.setState({ allObjects: array });
  };

  /** Sorting End */

  // Actually renders the row with elements in layout
  renderRow = (rowObject, rowIndex) => {
    return (
      <div className="hl_page-creator--row">
        <div className="hl_page-creator--actions">
          <div className="move-actions">
            <span
              data-tooltip="tooltip"
              data-placement="top"
              title="Up"
              onClick={() => this.rowUp(rowIndex)}
            >
              <i className="icon icon-arrow-up-2" />
            </span>
            <span
              data-tooltip="tooltip"
              data-placement="top"
              title="Down"
              onClick={() => this.rowDown(rowIndex)}
            >
              <i className="icon icon-arrow-down-2" />
            </span>
          </div>
          <div className="more-actions">
            <span data-tooltip="tooltip" data-placement="top" title="Settings">
              <i className="fas fa-cog" />
            </span>
            <span data-tooltip="tooltip" data-placement="top" title="Clone">
              <i className="far fa-eye" />
            </span>
            <span data-tooltip="tooltip" data-placement="top" title="Save">
              <i className="far fa-copy" />
            </span>
            <span data-tooltip="tooltip" data-placement="top" title="Delete">
              <i className="far fa-trash-alt" />
            </span>
          </div>
        </div>
        <span
          className="add-new-row"
          data-tooltip="tooltip"
          data-placement="bottom"
          title="Add New Row"
          onClick={() => {
            this.setState({ showRowPane: true });
          }}
        >
          <i className="icon icon-plus" />
        </span>
        {times(rowObject.rowCount, colIndex => {
          return (
            <div className="hl_page-creator--column">
              {!rowObject.elements[colIndex] ? (
                <div
                  href="#"
                  className="new-element-blank"
                  onClick={() => this.addNewElement(rowIndex, colIndex)}
                >
                  <span className="btn btn-light6 btn-slim">
                    Add New Element
                  </span>
                </div>
              ) : (
                <div className="hl_page-creator--element">
                  <div className="hl_page-creator--actions">
                    <div className="more-actions">
                      <span
                        data-tooltip="tooltip"
                        data-placement="top"
                        title="Move"
                        onClick={() =>
                          this.showElementSettingsPane(
                            rowObject.elements[colIndex].type === "header"
                              ? "showHeaderSettings"
                              : "showImageSettings",
                            rowIndex,
                            colIndex
                          )
                        }
                      >
                        <i className="fas fa-arrows-alt" />
                      </span>
                      <span
                        data-tooltip="tooltip"
                        data-placement="top"
                        title="Clone"
                      >
                        <i className="far fa-eye" />
                      </span>
                      <span
                        data-tooltip="tooltip"
                        data-placement="top"
                        title="Save"
                      >
                        <i className="far fa-copy" />
                      </span>
                      <span
                        data-tooltip="tooltip"
                        data-placement="top"
                        title="Delete"
                      >
                        <i className="far fa-trash-alt" />
                      </span>
                    </div>
                  </div>
                  <span
                    className="add-new-element"
                    data-tooltip="tooltip"
                    data-placement="bottom"
                    title="Add New Element"
                    onClick={() => this.addNewElement(rowIndex, colIndex)}
                  >
                    <i className="icon icon-plus" />
                  </span>

                  <div className="element-container text-center mx-auto">
                    {rowObject.elements[colIndex].type === "header" && (
                      <h3 className="text-center">
                        {rowObject.elements[colIndex].text ||
                          "Heading Text Goes Here"}
                      </h3>
                    )}

                    {rowObject.elements[colIndex].type === "image" && (
                      <img
                        style={{ maxWidth: "100%" }}
                        className="align-center"
                        src={
                          rowObject.elements[colIndex].text ||
                          "img/placeholder.png"
                        }
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Adding the event listeners to new added row & elements
  addEventListeners = () => {
    $(document).ready(function() {
      $(document).on("mouseenter", ".hl_page-creator--row", function() {
        $(this).addClass("active");
        $(this)
          .parent(".hl_page-creator--section")
          .removeClass("active");
      });
      $(document).on("mouseleave", ".hl_page-creator--row", function() {
        $(this).removeClass("active");
        $(this)
          .parent(".hl_page-creator--section")
          .addClass("active");
      });

      //Element
      $(document).on("mouseenter", ".hl_page-creator--element", function() {
        $(this).addClass("active");
        $(this)
          .parents(".hl_page-creator--row")
          .removeClass("active");
      });
      $(document).on("mouseleave", ".hl_page-creator--element", function() {
        $(this).removeClass("active");
        $(this)
          .parents(".hl_page-creator--row")
          .addClass("active");
      });
    });
  };

  componentDidMount() {
    this.addEventListeners();
  }

  render() {
    return (
      <>
        <nav className="hl_navbar shrink" id="navbar">
          <div className="hl_navbar--inner">
            <a href="./" className="hl_navbar--logo" />
            <button
              className="hl_navbar--toggler"
              type="button"
              id="navbar-toggler"
            >
              <span className="navbar-toggler-bar" />
              <span className="navbar-toggler-bar" />
              <span className="navbar-toggler-bar" />
            </button>
            <div className="hl_navbar--collapse" id="navbar-collapse">
              <button
                className="hl_navbar--button btn btn-success btn-block"
                data-toggle="modal"
                data-target="#client-checkin--modal"
              >
                Check In Client
              </button>
              <ul className="hl_navbar--links list-unstyled" id="nav-links">
                <li id="nav-dashboard">
                  <a
                    href="./"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Dashboard"
                  >
                    <i className="icon-duplicate" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li id="nav-widgets">
                  <a
                    href="./widgets.html"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Widgets"
                  >
                    <i className="icon-tiles-filled" />
                    <span>Widgets</span>
                  </a>
                </li>
                <li id="nav-marketing">
                  <a
                    data-toggle="collapse"
                    href="#nav-marketing-collapse"
                    role="button"
                    aria-expanded="false"
                    aria-controls="nav-marketing-collapse"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Marketing"
                  >
                    <i className="icon-mail" />
                    <span>Marketing</span>
                    <i className="caret icon-arrow-down-1" />
                  </a>
                  <div
                    className="collapse nav-dropdown-links"
                    id="nav-marketing-collapse"
                  >
                    <ul>
                      <li className="active">
                        <a href="./customer-acquisition.html">
                          Customer Acquisition
                        </a>
                      </li>
                      <li>
                        <a href="./triggers.html">Triggers</a>
                      </li>
                      <li>
                        <a href="./workflow.html">Workflow</a>
                      </li>
                      <li>
                        <a href="./form-builder.html">Form Builder</a>
                      </li>
                      <li>
                        <a href="./landing-page-creator.html">Page Creator</a>
                      </li>
                      <li>
                        <a href="#">Product Adoption</a>
                      </li>
                      <li>
                        <a href="#">Product Upsell</a>
                      </li>
                      <li>
                        <a href="#">Content Library</a>
                      </li>
                      <li>
                        <a href="#">Snapshot Widget</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li id="nav-reviews">
                  <a
                    href="./reviews.html"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Reviews"
                  >
                    <i className="icon-bubble-filled" />
                    <span>Reviews</span>
                  </a>
                </li>
                <li id="nav-customers">
                  <a
                    data-toggle="collapse"
                    href="#nav-customer-collapse"
                    role="button"
                    aria-expanded="false"
                    aria-controls="nav-customer-collapse"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Customers"
                  >
                    <i className="icon-user" />
                    <span>Customers</span>
                    <i className="caret icon-arrow-down-1" />
                  </a>
                  <div
                    className="collapse nav-dropdown-links"
                    id="nav-customer-collapse"
                  >
                    <ul>
                      <li className="active">
                        <a href="./contact-details.html">Contact Details</a>
                      </li>
                      <li>
                        <a href="./customers.html">Customers</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li id="nav-team">
                  <a
                    href="./team.html"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Team"
                  >
                    <i className="icon-heart" />
                    <span>Team</span>
                  </a>
                </li>
                <li id="nav-online-analysis">
                  <a
                    href="./online-analysis.html"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Online Analysis"
                  >
                    <i className="icon-pulse" />
                    <span>Online Analysis</span>
                  </a>
                </li>
                <li id="nav-opportunities">
                  <a
                    href="./opportunities.html"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Opportunities"
                  >
                    <i className="icon-blocks" />
                    <span>Opportunities</span>
                  </a>
                </li>
                <li id="nav-conversations">
                  <a
                    href="./conversations.html"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Conversations"
                  >
                    <i className="icon-bubble" />
                    <span>Conversations</span>
                  </a>
                </li>
                <li id="nav-calendar">
                  <a
                    href="./calendar.html"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Calendar"
                  >
                    <i className="icon-calendar" />
                    <span>Calendar</span>
                  </a>
                </li>
                <li id="nav-settings">
                  <a
                    href="./settings-profile.html"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Settings"
                  >
                    <i className="icon-settings-1" />
                    <span>Settings</span>
                  </a>
                </li>
                <li id="nav-social">
                  <a
                    href="./social.html"
                    data-tooltip="nav-tooltip"
                    data-placement="right"
                    title="Social Media"
                  >
                    <i className="icon-target-2" />
                    <span>Social Media</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div
          className="modal fade"
          id="client-checkin--modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="client-checkin--modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-header--inner">
                  <h5 className="modal-title" id="client-checkin--modalLabel">
                    <i className="icon icon-user --green" /> Client Check In
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div className="modal-body">
                <div className="modal-body--inner">
                  <div className="form-group">
                    <label>Customer Phone or Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Customer Phone or Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Customer Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Customer Name"
                    />
                  </div>
                  <div className="modal-buttons d-flex align-items-center justify-content-between">
                    <button type="button" className="btn btn-link">
                      Send to Multiple Clients
                    </button>
                    <button type="button" className="btn btn-success">
                      Send a Review Invite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <header className="hl_header nav-shrink ">
          <div className="container-fluid">
            <select
              className="selectpicker hl_header--picker"
              data-width="fit"
              data-header="Switch Location <a href='#'>View Locations</a>"
            >
              <option data-content="<img src='./img/img-converse.png'/> Converse Store #32">
                Converse Store #32
              </option>
              <option data-content="<img src='./img/img-nike1.png'/> Nike Store, 49 Garnet Stream, Baja, CA">
                Nike Store, 49 Garnet Stream, Baja, CA
              </option>
              <option data-content="<img src='./img/img-nike2.png'/> Nike Store, Andersen Center 83b, West 82nd Street, San Francisco, CA">
                Nike Store, Andersen Center 83b, West 82nd Street, San
                Francisco, CA
              </option>
            </select>
            <div className="hl_header--controls">
              <a
                href="#"
                className="btn btn-circle btn-yellow hl_header--recent-activities -notification"
                id="recent_activities-toggle"
              >
                <i className="icon-list" />
                <span className="sr-only">View Recent Activities</span>
              </a>
              <a
                href="#"
                className="btn btn-circle btn-primary hl_header--copy-link"
                data-toggle="modal"
                data-target="#review-link--modal"
              >
                <i className="icon-link" />
                <span className="sr-only">Copy Review Link</span>
              </a>
              <div className="hl_header--dropdown hl_header--phone dropdown --no-caret">
                <a
                  href="#"
                  className="dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="btn btn-circle btn-green-lt">
                    <i className="fas fa-phone" />
                  </span>
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
                      <button type="button" className="btn btn-primary">
                        <i className="icon icon-duplicate" />
                      </button>
                    </div>
                  </div>
                  <div className="call-recording">
                    <h3>Call Recording:</h3>
                    <div className="toggle">
                      <input
                        type="checkbox"
                        className="tgl tgl-light"
                        id="call-recording"
                      />
                      <label className="tgl-btn" htmlFor="call-recording" />
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
                      <a href="#" className="test">
                        Test
                      </a>
                    </div>
                    <div className="audio-settings-item">
                      <label>Ringing:</label>
                      <div className="select-control-wrap">
                        <select className="select-control">
                          <option>System Default</option>
                          <option>Built-in Output</option>
                        </select>
                      </div>
                      <a href="#" className="test">
                        Test
                      </a>
                    </div>
                    <div className="audio-settings-item">
                      <label>Microphone:</label>
                      <div className="select-control-wrap">
                        <select className="select-control">
                          <option>System Default</option>
                          <option>Built-in Output</option>
                        </select>
                      </div>
                      <a href="#" className="test">
                        Test
                      </a>
                    </div>
                  </div>
                  <div className="hl_header--phone-footer">
                    <div className="form-group">
                      <i className="fas fa-phone" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Dial a number"
                      />
                      <button type="button" className="btn btn-success btn-sm">
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hl_header--dropdown dropdown --no-caret">
                <a
                  href="#"
                  className="hl_header--avatar dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="avatar">
                    <div className="avatar_img">
                      <img
                        src="./img/img-avatar-sample1.png"
                        alt="Avatar Name"
                      />
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="hl_recent-activities">
          <div className="hl_recent-activities--inner">
            <ul className="hl_recent-activities--list list-unstyled">
              <li className="hl_recent-activities--item --notification">
                <div className="avatar --sm">
                  <div className="avatar_img --blue">BM</div>
                </div>
                <p>
                  <strong>Bruce Mann</strong> sent a Review Request to  Amanda
                  Nunes. 
                </p>
                <p className="location">
                  Nike Store, 49 Garnet Stream, Baja, CA
                </p>
                <p className="time-date">10 min ago</p>
              </li>
              <li className="hl_recent-activities--item --notification">
                <div className="avatar --sm">
                  <div className="avatar_img">
                    <img src="./img/img-avatar-sample4.png" alt="Avatar Name" />
                  </div>
                </div>
                <p>
                  <strong>Henry J.</strong> sent a Review Request to  Amanda
                  Nunes. 
                </p>
                <p className="location">
                  Nike Store, 49 Garnet Stream, Baja, CA
                </p>
                <p className="time-date">10 min ago</p>
              </li>
              <li className="hl_recent-activities--item --notification">
                <span className="recent-activities--icon --rating">
                  <i className="icon icon-star-filled" />
                </span>
                <p>Our Average Rating went up! </p>
                <p className="location">
                  Nike Store, 49 Garnet Stream, Baja, CA
                </p>
                <p className="time-date">10 min ago</p>
              </li>
              <li className="hl_recent-activities--item">
                <span className="recent-activities--icon --reviews">
                  <i className="icon icon-send" />
                </span>
                <p>Milestone of 5,000 team Review Requestes hit! </p>
                <p className="location">
                  Nike Store, 49 Garnet Stream, Baja, CA
                </p>
                <p className="time-date">10 min ago</p>
              </li>
              <li className="hl_recent-activities--item">
                <div className="avatar --sm">
                  <div className="avatar_img --orange">GT</div>
                </div>
                <p>
                  <strong>Gerald Terry</strong> sent a Review Request to  Amanda
                  Nunes. 
                </p>
                <p className="location">
                  Nike Store, 49 Garnet Stream, Baja, CA
                </p>
                <p className="time-date">10 min ago</p>
              </li>
              <li className="hl_recent-activities--item">
                <div className="avatar --sm">
                  <div className="avatar_img --green">RF</div>
                </div>
                <p>
                  <strong>Ricardo Foster</strong> sent a Review Request to 
                  Amanda Nunes. 
                </p>
                <p className="location">
                  Nike Store, 49 Garnet Stream, Baja, CA
                </p>
                <p className="time-date">10 min ago</p>
              </li>
              <li className="hl_recent-activities--item">
                <div className="avatar --sm">
                  <div className="avatar_img">
                    <img src="./img/img-avatar-sample2.png" alt="Avatar Name" />
                  </div>
                </div>
                <p>
                  <strong>Samantha Irving</strong> sent a Review Request to 
                  Amanda Nunes.
                </p>
                <p className="location">
                  Nike Store, 49 Garnet Stream, Baja, CA
                </p>
                <p className="time-date">10 min ago</p>
              </li>
              <li className="hl_recent-activities--item">
                <div className="avatar --sm">
                  <div className="avatar_img">
                    <img src="./img/img-avatar-sample3.png" alt="Avatar Name" />
                  </div>
                </div>
                <p>
                  <strong>Cecelia Atkins</strong> sent a Review Request to 
                  Amanda Nunes. 
                </p>
                <p className="location">
                  Nike Store, 49 Garnet Stream, Baja, CA
                </p>
                <p className="time-date">10 min ago</p>
              </li>
              <li className="hl_recent-activities--item">
                <div className="avatar --sm">
                  <div className="avatar_img --purple">NP</div>
                </div>
                <p>
                  <strong>Norman E. Parque</strong> sent a Review Request to 
                  Amanda Nunes. 
                </p>
                <p className="location">
                  Nike Store, 49 Garnet Stream, Baja, CA
                </p>
                <p className="time-date">10 min ago</p>
              </li>
              <li className="hl_recent-activities--item">
                <a href="#">Load More</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="modal review-link--modal"
          tabIndex="-1"
          role="dialog"
          id="review-link--modal"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="modal-body">
                <img src="./img/img-link-review-copied.png" />
                <h4>Link copied to clipboard!</h4>
                <p>www.somekindoflink.com/mycompanyname/213213</p>
              </div>
            </div>
          </div>
        </div>
        <section className="hl_wrapper nav-shrink d-flex">
          <section
            className={
              this.state.showRowPane ||
              this.state.showElementsPane ||
              this.state.showHeaderSettings ||
              this.state.showImageSettings
                ? "hl_wrapper--inner page-creator --menu-active"
                : "hl_wrapper--inner page-creator"
            }
            id="page-creator"
          >
            <section className="hl_page-creator--main">
              <div className="hl_page-creator--menu">
                <div className="menu--left">
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    data-tooltip="tooltip"
                    data-placement="top"
                    title="Back"
                  >
                    <i className="fas fa-arrow-left" />
                  </button>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-tooltip="tooltip"
                      data-placement="top"
                      title="Desktop"
                      id="page-creator-desktop"
                    >
                      <i className="fas fa-desktop" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-tooltip="tooltip"
                      data-placement="top"
                      title="Mobile"
                      id="page-creator-mobile"
                    >
                      <i className="fas fa-mobile-alt" />
                    </button>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-tooltip="tooltip"
                      data-placement="top"
                      title="Apps"
                    >
                      <i className="fas fa-plug" />
                    </button>
                    <div className="dropdown" id="settings-group">
                      <button
                        type="button"
                        className="btn btn-light btn-sm dropdown-toggle"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-toggle="dropdown"
                        data-tooltip="tooltip"
                        data-placement="top"
                        title="Settings"
                      >
                        <i className="fas fa-cogs" />
                        <span className="btn-text">Settings</span>
                      </button>
                      <div className="dropdown-menu">
                        <div className="nav">
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#integrations"
                          >
                            Integrations
                          </a>
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#seo"
                          >
                            SEO Meta Data
                          </a>
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#tracking"
                          >
                            Tracking Code
                          </a>
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#css"
                          >
                            Custom CSS
                          </a>
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#background"
                          >
                            Background
                          </a>
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#typography"
                          >
                            Typography
                          </a>
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#general"
                          >
                            General
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-light btn-sm dropdown-toggle"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-toggle="dropdown"
                        data-tooltip="tooltip"
                        data-placement="top"
                        title="Pop up"
                      >
                        <i className="fas fa-external-link-alt" />
                        <span className="btn-text">Pop up</span>
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">
                          Show Popup
                        </a>
                        <a className="dropdown-item" href="#">
                          Edit Settings
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-tooltip="tooltip"
                      data-placement="top"
                      title="Undo"
                    >
                      <i className="fas fa-undo" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-tooltip="tooltip"
                      data-placement="top"
                      title="Redo"
                      disabled
                    >
                      <i className="fas fa-redo" />
                    </button>
                  </div>
                </div>
                <div className="menu--right">
                  <div className="btn-group">
                    <div className="dropdown" id="section-group">
                      <button
                        type="button"
                        className="btn btn-light btn-sm dropdown-toggle"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-toggle="dropdown"
                        data-tooltip="tooltip"
                        data-placement="top"
                        title="Sections"
                      >
                        <i className="fas fa-expand" />
                        <span className="btn-text">Sections</span>
                      </button>
                      <div className="dropdown-menu">
                        <div className="nav">
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#add-section"
                          >
                            Add Section
                          </a>
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#manage-sections"
                          >
                            Manage
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown" id="row-group">
                      <button
                        type="button"
                        className="btn btn-light btn-sm dropdown-toggle"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-toggle="dropdown"
                        data-tooltip="tooltip"
                        data-placement="top"
                        title="Rows"
                      >
                        <i className="fas fa-bars" />
                        <span className="btn-text">Rows</span>
                      </button>
                      <div className="dropdown-menu">
                        <div className="nav">
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#add-row"
                          >
                            Add Row
                          </a>
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#manage-rows"
                          >
                            Manage
                          </a>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-tooltip="tooltip"
                      data-placement="top"
                      title="Columns"
                      id="column-group"
                    >
                      <i className="fas fa-columns" />
                      <span className="btn-text">Columns</span>
                    </button>
                    <div className="dropdown" id="element-group">
                      <button
                        type="button"
                        className="btn btn-light btn-sm dropdown-toggle"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-toggle="dropdown"
                        data-tooltip="tooltip"
                        data-placement="top"
                        title="Elements"
                      >
                        <i className="fas fa-code" />
                        <span className="btn-text">Elements</span>
                      </button>
                      <div className="dropdown-menu">
                        <div className="nav">
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#add-element"
                          >
                            Add Element
                          </a>
                          <a
                            className="dropdown-item"
                            data-toggle="tab"
                            href="#manage-elements"
                          >
                            Manage
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-tooltip="tooltip"
                      data-placement="top"
                      title="Preview"
                    >
                      <i className="far fa-eye" />
                      <span className="btn-text">Preview</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-tooltip="tooltip"
                      data-placement="top"
                      title="Save"
                    >
                      <i className="far fa-save" />
                      <span className="btn-text">Save</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="hl_page-creator--content">
                <section className="hl_page-creator--section">
                  <div className="hl_page-creator--actions">
                    <div className="move-actions">
                      <span
                        data-tooltip="tooltip"
                        data-placement="right"
                        title="Up"
                      >
                        <i className="icon icon-arrow-up-2" />
                      </span>
                      <span
                        data-tooltip="tooltip"
                        data-placement="right"
                        title="Down"
                      >
                        <i className="icon icon-arrow-down-2" />
                      </span>
                    </div>
                    <div className="more-actions">
                      <span
                        data-tooltip="tooltip"
                        data-placement="left"
                        title="Settings"
                      >
                        <i className="fas fa-cog" />
                      </span>
                      <span
                        data-tooltip="tooltip"
                        data-placement="left"
                        title="Clone"
                      >
                        <i className="far fa-eye" />
                      </span>
                      <span
                        data-tooltip="tooltip"
                        data-placement="left"
                        title="Save"
                      >
                        <i className="far fa-copy" />
                      </span>
                      <span
                        data-tooltip="tooltip"
                        data-placement="left"
                        title="Delete"
                      >
                        <i className="far fa-trash-alt" />
                      </span>
                    </div>
                  </div>
                  <span
                    className="add-new-section"
                    data-tooltip="tooltip"
                    data-placement="bottom"
                    title="Add New Section"
                  >
                    <i className="icon icon-plus" />
                  </span>
                  {this.state.allObjects.length === 0 ? (
                    <div
                      href=""
                      className="new-row-blank"
                      onClick={() => {
                        this.setState({ showRowPane: true });
                      }}
                    >
                      <span className="btn btn-light5 btn-slim">
                        Add New Row
                      </span>
                    </div>
                  ) : (
                    this.state.allObjects
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((eachObject, index) => {
                        if (eachObject.type === "row") {
                          return this.renderRow(eachObject, index);
                        }
                      })
                  )}
                </section>
              </div>
            </section>

            <section
              className={
                this.state.showHeaderSettings || this.state.showImageSettings
                  ? "hl_page-creator--settings-group active"
                  : "hl_page-creator--settings-group"
              }
            >
              <a href="#" className="close-group" id="close-settings-group">
                <i className="icon icon-close" />
              </a>
              <div className="hl_settings-group">
                <div className="tab-content" id="hl_settings-group-tab">
                  <div
                    className="tab-pane fade"
                    id="integrations"
                    role="tabpanel"
                    aria-labelledby="integrations-tab"
                  >
                    <h2>Email Integration Settings</h2>
                    <div className="integrations">
                      <div className="text-center">
                        <h5>Auto Responder Integration</h5>
                        <p>
                          Here you will be able to hook up your integrations
                          with your auto-responder service...
                        </p>
                        <p className="not-connected">
                          <i className="icon icon-close" /> Not Connected
                        </p>
                      </div>
                      <hr />
                      <div className="form-group">
                        <label>Integrations</label>
                        <select className="selectpicker" data-width="100%">
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Action</label>
                        <select className="selectpicker" data-width="100%">
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>List to Add</label>
                        <select className="selectpicker" data-width="100%">
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="seo"
                    role="tabpanel"
                    aria-labelledby="seo-tab"
                  >
                    <h2>SEO Mata Data</h2>
                    <div className="seo">
                      <div className="warning">
                        <p>Warning: Change the Default SEO Page Title.</p>
                      </div>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          rows="3"
                        />
                      </div>
                      <div className="form-group">
                        <label>Keywords</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Keywords"
                          value="clickfunnels/ landing page, web site editor"
                        />
                      </div>
                      <div className="form-group">
                        <label>Author</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Author"
                          value="Your Name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Social Image</label>
                        <input type="file" placeholder="Social Image" />
                      </div>
                      <hr />><h3>SEO Preview</h3>
                      <div className="seo-card --seo1">
                        <h4 className="seo-title">
                          My Awesome Landing Page - Powered by ClickFunnels.com
                        </h4>
                        <p>
                          <a href="#" className="seo-link">
                            http://yourwebsite.com/would-be-here
                          </a>
                        </p>
                        <p className="seo-description">
                          description for your awesome landing page
                        </p>
                      </div>
                      <div className="seo-card --seo2">
                        <h4 className="seo-title">
                          My Awesome Landing Page - Powered by ClickFunnels.com
                        </h4>
                        <p className="seo-description">
                          description for your awesome landing page
                        </p>
                        <p>
                          <a href="#" className="seo-link">
                            http://yourwebsite.com/would-be-here
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tracking"
                    role="tabpanel"
                    aria-labelledby="tracking-tab"
                  >
                    <h2>Tracking Code</h2>
                    <div className="tracking">
                      <div className="form-group">
                        <label>Add HTML/Javascript</label>
                        <textarea
                          className="form-control"
                          placeholder="Add HTML/Javascript here..."
                          rows="5"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="css"
                    role="tabpanel"
                    aria-labelledby="css-tab"
                  >
                    <h2>Custom CSS</h2>
                    <div className="css">
                      <div className="form-group">
                        <label>Add CSS</label>
                        <textarea
                          className="form-control"
                          placeholder="Add custo CSS here..."
                          rows="5"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      this.state.showHeaderSettings
                        ? "tab-pane fade active show"
                        : "tab-pane fade"
                    }
                    id="header"
                    role="tabpanel"
                    aria-labelledby="header-tab"
                  >
                    <h2>Text Elements</h2>
                    <div className="general">
                      <div className="form-group">
                        <label>Header Text</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter header text here"
                          value={this.state.currentHeaderText}
                          name="currentHeaderText"
                          onChange={this.handleChange}
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-success btn-block"
                        onClick={this.setHeaderText}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      this.state.showImageSettings
                        ? "tab-pane fade active show"
                        : "tab-pane fade"
                    }
                    id="image"
                    role="tabpanel"
                    aria-labelledby="image-tab"
                  >
                    <h2>Media Elements</h2>
                    <div className="general">
                      <div className="form-group">
                        <label>Image URL</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter image URL here"
                          name="currentImageText"
                          value={this.state.currentImageText}
                          onChange={this.handleChange}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-success btn-block"
                        onClick={this.setImageText}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="background"
                    role="tabpanel"
                    aria-labelledby="background-tab"
                  >
                    <h2>Background</h2>
                    <div className="background">
                      <div className="form-group">
                        <label>Background Image</label>
                        <input type="file" />
                      </div>
                      <div className="form-group">
                        <label>Color</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Color"
                        />
                      </div>
                      <div className="form-group">
                        <label>Background Video</label>
                        <select className="selectpicker" data-width="100%">
                          <option>Off</option>
                          <option>On</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="typography"
                    role="tabpanel"
                    aria-labelledby="typography-tab"
                  >
                    <h2>Typography</h2>
                    <div className="typography">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Aperiam, expedita. Porro, ea magni doloremque et
                        fuga optio laudantium? Mollitia esse aliquam enim
                        facilis eius natus laborum dolor laboriosam numquam
                        sapiente?
                      </p>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="general"
                    role="tabpanel"
                    aria-labelledby="general-tab"
                  >
                    <h2>General Settings</h2>
                    <div className="general">
                      <div className="form-group">
                        <label>On Submit Go To</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="On Submit Go To"
                        />
                      </div>
                      <div className="form-group">
                        <label>Digital Assets</label>
                        <select className="selectpicker" data-width="100%">
                          <option>- no asset / download -</option>
                          <option>Facebook Strategy Guide</option>
                          <option>Anurli</option>
                          <option>Horatio D Medium</option>
                          <option>Horatio D Light</option>
                          <option>Patient Rush Favicon</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Affiliate Badge</label>
                        <select className="selectpicker" data-width="100%">
                          <option>Hide</option>
                          <option>Show</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Search Engines</label>
                        <select className="selectpicker" data-width="100%">
                          <option>Hide</option>
                          <option>Show</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        className="btn btn-success btn-block"
                      >
                        Save Page as Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="hl_page-creator--sections-group">
              <a href="#" className="close-group" id="close-section-group">
                <i className="icon icon-close" />
              </a>
              <div className="hl_section-group">
                <div className="tab-content" id="hl_section-group-tab">
                  <div
                    className="tab-pane fade"
                    id="add-section"
                    role="tabpanel"
                    aria-labelledby="add-section-tab"
                  >
                    <div className="add-section">
                      <h2>Add Sections</h2>
                      <div className="add-section-body">
                        <div className="section-cards">
                          <div className="section-card">
                            <div className="icon">
                              <i className="far fa-square" />
                            </div>
                            <h5>Full Width</h5>
                          </div>
                          <div className="section-card">
                            <div className="icon">
                              <i className="far fa-square" />
                            </div>
                            <h5>Wide</h5>
                          </div>
                          <div className="section-card">
                            <div className="icon">
                              <i className="far fa-square" />
                            </div>
                            <h5>Medium</h5>
                          </div>
                          <div className="section-card">
                            <div className="icon">
                              <i className="far fa-square" />
                            </div>
                            <h5>Small</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="manage-sections"
                    role="tabpanel"
                    aria-labelledby="manage-sections-tab"
                  >
                    <div className="manage-sections">
                      <h2>Manage Sections</h2>
                      <div className="sections-section-group-wrap">
                        <div className="sections-section-group">
                          <h3>All Sections</h3>
                          <ul className="sections">
                            <li>
                              <h4>Section</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Section</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Section</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Section</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Section</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={
                this.state.showRowPane
                  ? "hl_page-creator--rows-group active"
                  : "hl_page-creator--rows-group"
              }
            >
              <a
                href="#"
                className="close-group"
                id="close-row-group"
                onClick={() => this.setState({ showRowPane: false })}
              >
                <i className="icon icon-close" />
              </a>
              <div className="hl_row-group">
                <div className="tab-content" id="hl_row-group-tab">
                  <div
                    className={
                      this.state.showRowPane
                        ? "tab-pane fade active show"
                        : "tab-pane fade"
                    }
                    id="add-row"
                    role="tabpanel"
                    aria-labelledby="add-row-tab"
                  >
                    <div className="add-row">
                      <h2>Add Row</h2>
                      <div className="add-row-body">
                        <div className="row-cards">
                          <div
                            className="row-card"
                            onClick={() => this.addRow(1)}
                          >
                            <div className="icon">
                              <i className="fas fa-columns" />
                            </div>
                            <h5>1 Column</h5>
                          </div>
                          <div
                            className="row-card"
                            onClick={() => this.addRow(2)}
                          >
                            <div className="icon">
                              <i className="fas fa-columns" />
                            </div>
                            <h5>2 Column</h5>
                          </div>
                          <div
                            className="row-card"
                            onClick={() => this.addRow(3)}
                          >
                            <div className="icon">
                              <i className="fas fa-columns" />
                            </div>
                            <h5>3 Column</h5>
                          </div>
                          <div className="row-card">
                            <div className="icon">
                              <i className="fas fa-columns" />
                            </div>
                            <h5>4 Column</h5>
                          </div>
                          <div className="row-card">
                            <div className="icon">
                              <i className="fas fa-columns" />
                            </div>
                            <h5>5 Column</h5>
                          </div>
                          <div className="row-card">
                            <div className="icon">
                              <i className="fas fa-columns" />
                            </div>
                            <h5>6 Column</h5>
                          </div>
                          <div className="row-card">
                            <div className="icon">
                              <i className="fas fa-columns" />
                            </div>
                            <h5>Left Sidebar</h5>
                          </div>
                          <div className="row-card">
                            <div className="icon">
                              <i className="fas fa-columns" />
                            </div>
                            <h5>Right Sidebar</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="manage-rows"
                    role="tabpanel"
                    aria-labelledby="manage-rows-tab"
                  >
                    <div className="manage-rows">
                      <h2>Manage Rows</h2>
                      <div className="rows-section-group-wrap">
                        <div className="rows-section-group">
                          <h3>Section</h3>
                          <ul className="rows">
                            <li>
                              <h4>2 Column Row</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="rows-section-group">
                          <h3>Section</h3>
                          <ul className="rows">
                            <li>
                              <h4>1 Column Row</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>1 Column Row</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="rows-section-group">
                          <h3>Section</h3>
                          <ul className="rows">
                            <li>
                              <h4>2 Column Row</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="rows-section-group">
                          <h3>Section</h3>
                          <ul className="rows">
                            <li>
                              <h4>1 Column Row</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>1 Column Row</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="hl_page-creator--columns-group">
              <a href="#" className="close-group" id="close-column-group">
                <i className="icon icon-close" />
              </a>
              <div className="manage-columns">
                <h2>Manage Columns</h2>
                <div className="columns-section-group-wrap">
                  <div className="columns-section-group">
                    <h3>Section > 2 Column Row</h3>
                    <ul className="columns">
                      <li>
                        <h4>Left Column</h4>
                        <div className="actions">
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-edit" />
                          </a>
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-eye" />
                          </a>
                        </div>
                      </li>
                      <li>
                        <h4>Right Column</h4>
                        <div className="actions">
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-edit" />
                          </a>
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-eye" />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="columns-section-group">
                    <h3>Section > 1 Column Row</h3>
                    <ul className="columns">
                      <li>
                        <h4>Full Column</h4>
                        <div className="actions">
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-edit" />
                          </a>
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-eye" />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="columns-section-group">
                    <h3>Section > 2 Column Row</h3>
                    <ul className="columns">
                      <li>
                        <h4>Left Column</h4>
                        <div className="actions">
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-edit" />
                          </a>
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-eye" />
                          </a>
                        </div>
                      </li>
                      <li>
                        <h4>Right Column</h4>
                        <div className="actions">
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-edit" />
                          </a>
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-eye" />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="columns-section-group">
                    <h3>Section > 1 Column Row</h3>
                    <ul className="columns">
                      <li>
                        <h4>Full Column</h4>
                        <div className="actions">
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-edit" />
                          </a>
                          <a href="#" className="btn btn-square-sm btn-light4">
                            <i className="far fa-eye" />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={
                this.state.showElementsPane
                  ? "hl_page-creator--element-group active"
                  : "hl_page-creator--element-group"
              }
            >
              <a
                href="#"
                className="close-group"
                id="close-element-group"
                onClick={() => this.setState({ showElementsPane: false })}
              >
                <i className="icon icon-close" />
              </a>
              <div className="hl_element-group">
                <div className="tab-content" id="hl_element-group-tab">
                  <div
                    className={
                      this.state.showElementsPane
                        ? "tab-pane fade active show"
                        : "tab-pane fade"
                    }
                    id="add-element"
                    role="tabpanel"
                    aria-labelledby="add-element-tab"
                  >
                    <div className="add-element">
                      <div className="add-element-menu">
                        <ul>
                          <li className="active">
                            <a href="#">All</a>
                          </li>
                          <li>
                            <a href="#">Text</a>
                          </li>
                          <li>
                            <a href="#">Media</a>
                          </li>
                          <li>
                            <a href="#">Form</a>
                          </li>
                          <li>
                            <a href="#">Content</a>
                          </li>
                          <li>
                            <a href="#">Countdown</a>
                          </li>
                          <li>
                            <a href="#">Misc</a>
                          </li>
                        </ul>
                      </div>
                      <div className="add-element-body">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                        </div>
                        <div className="element-group">
                          <h4>Text</h4>
                          <div
                            className="element-cards"
                            onClick={() => this.addSelectedElement("header")}
                          >
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-heading" />
                              </div>
                              <h5>Headline</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-font" />
                              </div>
                              <h5>Sub-headline</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-paragraph" />
                              </div>
                              <h5>Paragraph</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-list" />
                              </div>
                              <h5>Bullet List</h5>
                            </div>
                          </div>
                        </div>
                        <div className="element-group">
                          <h4>Media</h4>
                          <div className="element-cards">
                            <div
                              className="element-card"
                              onClick={() => this.addSelectedElement("image")}
                            >
                              <div className="icon">
                                <i className="fas fa-image" />
                              </div>
                              <h5>Image</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-images" />
                              </div>
                              <h5>Image Popup</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-play-circle" />
                              </div>
                              <h5>Video</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="far fa-play-circle" />
                              </div>
                              <h5>Video popup</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-volume-up" />
                              </div>
                              <h5>Audio player</h5>
                            </div>
                          </div>
                        </div>
                        <div className="element-group">
                          <h4>Form</h4>
                          <div className="element-cards">
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-stop" />
                              </div>
                              <h5>Button</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fab fa-facebook-f" />
                              </div>
                              <h5>Facebook Option</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="far fa-square" />
                              </div>
                              <h5>Input</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="far fa-hand-pointer" />
                              </div>
                              <h5>Select Box</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-comment-alt" />
                              </div>
                              <h5>Text Area</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-check-square" />
                              </div>
                              <h5>Checkbox Headline</h5>
                            </div>
                          </div>
                        </div>
                        <div className="element-group">
                          <h4>Advance Form</h4>
                          <div className="element-cards">
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-sms" />
                              </div>
                              <h5>SMS Sign up</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-file-invoice" />
                              </div>
                              <h5>Billing Add.</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-file-invoice" />
                              </div>
                              <h5>Shipping Add.</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-poll-h" />
                              </div>
                              <h5>Survey</h5>
                            </div>
                          </div>
                        </div>
                        <div className="element-group">
                          <h4>Content Blocks</h4>
                          <div className="element-cards">
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-circle" />
                              </div>
                              <h5>Icon</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-file-image" />
                              </div>
                              <h5>Img Feature</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-link" />
                              </div>
                              <h5>Navigation</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="far fa-question-circle" />
                              </div>
                              <h5>FAQ</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="far fa-window-minimize" />
                              </div>
                              <h5>Divider</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-window-minimize" />
                              </div>
                              <h5>Progress bar</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-list" />
                              </div>
                              <h5>Image List</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-table" />
                              </div>
                              <h5>Pricing Table</h5>
                            </div>
                          </div>
                        </div>
                        <div className="element-group">
                          <h4>Countdown</h4>
                          <div className="element-cards">
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-hourglass-start" />
                              </div>
                              <h5>Countdown</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="far fa-clock" />
                              </div>
                              <h5>Minute Timer</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-clock" />
                              </div>
                              <h5>Day Timer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="element-group">
                          <h4>Misc Elements</h4>
                          <div className="element-cards">
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-share-alt-square" />
                              </div>
                              <h5>Social Share</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-bell" />
                              </div>
                              <h5>Privacy Notice</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-comments" />
                              </div>
                              <h5>FB Comments</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-align-center" />
                              </div>
                              <h5>Text Block</h5>
                            </div>
                            <div className="element-card">
                              <div className="icon">
                                <i className="fas fa-code" />
                              </div>
                              <h5>Custom JS/HTML</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="manage-elements"
                    role="tabpanel"
                    aria-labelledby="manage-elements-tab"
                  >
                    <div className="manage-elements">
                      <h2>Manage Elements</h2>
                      <div className="elements-section-group-wrap">
                        <div className="elements-section-group">
                          <h3>Section > Left Column</h3>
                          <ul className="elements">
                            <li>
                              <h4>Image</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="elements-section-group">
                          <h3>Section > Right Column</h3>
                          <ul className="elements">
                            <li>
                              <h4>Headline</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Headline</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Input Form</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Input Form</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Button</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="elements-section-group">
                          <h3>Section > Full Column</h3>
                          <ul className="elements">
                            <li>
                              <h4>Headline</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Button</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Input</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Button</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Headline</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="elements-section-group">
                          <h3>Section > Right Column</h3>
                          <ul className="elements">
                            <li>
                              <h4>Headline</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Headline</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Input Form</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Input Form</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <h4>Button</h4>
                              <div className="actions">
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="fas fa-arrows-alt-v" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-eye" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-copy" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-square-sm btn-light4"
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>

        {/* <div id="outdated" aria-hidden="true">
          <h5>:(</h5>
          <h6>Your browser is out-of-date!</h6>
          <p>
            This website is built using latest technologies. Unfortunately your
            browser doesn't support those. Please update your browser to view
            this website correctly. Thank you.
            <a
              id="btnUpdateBrowser"
              href="http://outdatedbrowser.com/"
              target="_blank"
            >
              Update my browser now{" "}
            </a>
          </p>
        </div> */}
      </>
    );
  }
}
