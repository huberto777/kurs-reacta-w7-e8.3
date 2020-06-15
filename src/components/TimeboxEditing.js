import React from "react";

class TimeboxEditing extends React.Component {
  state = {
    title: this.props.timebox.title,
    totalTimeInMinutes: this.props.timebox.totalTimeInMinutes,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = () => {
    const { timebox, onUpdate } = this.props;
    const { title, totalTimeInMinutes } = this.state;
    onUpdate({ ...timebox, title, totalTimeInMinutes });
  };
  render() {
    const { title, totalTimeInMinutes } = this.state;
    return (
      <div className="TimeboxEditor">
        <label>
          Co robisz?
          <input
            name="title"
            value={title}
            onChange={this.handleChange}
            type="text"
          />
        </label>
        <br />
        <label>
          Ile minut?
          <input
            name="totalTimeInMinutes"
            value={totalTimeInMinutes}
            onChange={this.handleChange}
            type="number"
          />
        </label>
        <br />
        <button onClick={this.props.onCancel}>Anuluj</button>
        <button onClick={this.onSubmit}>Zatwierdź zmiany</button>
      </div>
    );
  }
}

export default TimeboxEditing;
