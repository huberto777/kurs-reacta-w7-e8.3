import React from "react";

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesApi";

class TimeboxList extends React.Component {
  state = {
    timeboxes: [],
    loading: true,
    error: null,
    searchQuery: "",
    editCurrentTimebox: null,
    editMode: false,
  };

  componentDidMount() {
    TimeboxesAPI.getAllTimeboxes()
      .then((timeboxes) => this.setState({ timeboxes }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  componentDidUpdate() {
    TimeboxesAPI.getTimeboxesByFullTextSearch(this.state.searchQuery).then(
      (timeboxes) => {
        this.setState({
          timeboxes: timeboxes.filter((timebox) =>
            timebox.title.toLowerCase().includes(this.state.searchQuery)
          ),
        });
      }
    );
  }

  addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox).then((addedTimebox) =>
      this.setState((prevState) => {
        const timeboxes = [...prevState.timeboxes, addedTimebox];
        return { timeboxes };
      })
    );
  };
  removeTimebox = (timeboxToRemove) => {
    TimeboxesAPI.removeTimebox(timeboxToRemove).then((id) =>
      this.setState((prevState) => {
        const timeboxes = prevState.timeboxes.filter(
          (timebox) => timebox.id !== id
        );
        return { timeboxes };
      })
    );
  };
  editTimebox = (timebox) => {
    this.setState({
      timebox,
      editCurrentTimebox: timebox.id,
      editMode: true,
    });
  };
  cancelEdit = () => {
    this.setState({
      editCurrentTimebox: null,
      editMode: false,
    });
  };
  updateTimebox = (timeboxToUpdate) => {
    TimeboxesAPI.partiallyUpdateTimebox(timeboxToUpdate).then(
      (updatedTimebox) =>
        this.setState((prevState) => {
          const timeboxes = prevState.timeboxes.map((timebox) =>
            timebox.id === timeboxToUpdate.id ? updatedTimebox : timebox
          );
          return { timeboxes, editCurrentTimebox: null, editMode: false };
        })
    );
  };

  handleCreate = (createdTimebox) => {
    try {
      this.addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboxa:", error);
    }
  };
  handleSearch = (e) => {
    this.setState({
      searchQuery: e.target.value.toLowerCase(),
    });
  };

  render() {
    // console.log(this.state.timeboxes);
    const { editCurrentTimebox, editMode } = this.state;
    return (
      <>
        <div className={`Timebox ${editMode ? "inactive" : ""}`}>
          <input
            placeholder="search"
            onInput={this.handleSearch}
            disabled={editMode}
          />
        </div>
        <TimeboxCreator onCreate={this.handleCreate} editMode={editMode} />
        {this.state.loading ? "Timeboxy się ładują..." : null}
        {this.state.error ? "Nie udało się załadować :(" : null}
        {this.state.timeboxes.map((timebox) => (
          <Timebox
            key={timebox.id}
            timebox={timebox}
            onDelete={() => this.removeTimebox(timebox)}
            onEdit={() => this.editTimebox(timebox)}
            onUpdate={this.updateTimebox}
            editCurrentTimebox={editCurrentTimebox}
            onCancel={this.cancelEdit}
            editMode={editMode}
          />
        ))}
      </>
    );
  }
}

export default TimeboxList;
