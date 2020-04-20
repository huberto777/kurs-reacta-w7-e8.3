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
  };

  componentDidMount() {
    // l_7.8/e_2
    // TimeboxesAPI.createTimeboxesAPI("http://localhost:5000/timeboxes")
    //   .then(timeboxes => this.setState({ timeboxes }))
    //   .catch(error => this.setState({ error }))
    //   .finally(() => this.setState({ loading: false }));
    // TimeboxesAPI.getAllTimeboxes()
    //   .then((timeboxes) => this.setState({ timeboxes }))
    //   .catch((error) => this.setState({ error }))
    //   .finally(() => this.setState({ loading: false }));
    TimeboxesAPI.getTimeboxesByFullTextSearch(this.state.searchQuery)
      .then((timeboxes) =>
        this.setState({
          timeboxes: timeboxes.filter((timebox) =>
            timebox.title.includes(this.state.searchQuery)
          ),
        })
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox).then((addedTimebox) =>
      this.setState((prevState) => {
        const timeboxes = [...prevState.timeboxes, addedTimebox];
        return { timeboxes };
      })
    );
  };
  removeTimebox = (indexToRemove) => {
    TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove]).then(() =>
      this.setState((prevState) => {
        const timeboxes = prevState.timeboxes.filter(
          (timebox, index) => index !== indexToRemove
        );
        return { timeboxes };
      })
    );
  };
  updateTimebox = (id, timeboxToUpdate) => {
    TimeboxesAPI.partiallyUpdateTimebox(timeboxToUpdate).then(
      (updatedTimebox) =>
        this.setState((prevState) => {
          const timeboxes = prevState.timeboxes.map((timebox) =>
            timebox.id === id ? updatedTimebox : timebox
          );
          return { timeboxes };
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
    console.log(this.state.timeboxes);
    return (
      <>
        <div className="Timebox">
          <input placeholder="search" onChange={this.handleSearch} />
        </div>
        <TimeboxCreator onCreate={this.handleCreate} />
        {this.state.loading ? "Timeboxy się ładują..." : null}
        {this.state.error ? "Nie udało się załadować :(" : null}
        {this.state.timeboxes.map((timebox, index) => (
          <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => this.removeTimebox(index)}
            onEdit={() =>
              this.updateTimebox(timebox.id, {
                ...timebox,
                title: "Updated timebox",
                totalTimeInMinutes: 22,
              })
            }
          />
        ))}
      </>
    );
  }
}

export default TimeboxList;
