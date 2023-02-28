import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";
//create another array to splice in it
const unusedContacts = [...contacts];
const firstFive = unusedContacts.splice(0, 5);

function App() {
  const [cont, SetCont] = useState(firstFive);

  //random
  const addActor = () => {
    if (unusedContacts.length === 0) return;
    const randomActor = unusedContacts.splice(
      Math.floor(Math.random() * unusedContacts.length),
      1
    )[0];
    // console.log("randomID", randomActor.id);

    SetCont([...cont, randomActor]);
  };

  //sort by popularity

  const handleSortActor = () => {
    const copy = [...cont];
    copy.sort((a, b) => b.popularity - a.popularity);
    SetCont(copy);
  };

  //sort by popularity

  const handleSortActorName = () => {
    const copy = [...cont];
    copy.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    SetCont(copy);
  };

  //remove

  const handleRemoveActor = (id) => {
    const newList = cont.filter((elem) => elem.id !== id);
    SetCont(newList);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button className="btnTop" onClick={addActor}>
        Add a random Contact
      </button>
      <button className="btnTop" onClick={handleSortActor}>
        Sort Popularity
      </button>
      <button className="btnTop" onClick={handleSortActorName}>
        Sort Name
      </button>

      <table className="tab">
        <thead>
          <tr className="trTitle">
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        {cont.map((contact) => (
          <tbody className="containerBody" key={contact.id}>
            <tr>
              <td>
                <img className="pic" src={contact.pictureUrl} alt="pic" />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? "🏆" : ""}</td>
              <td>{contact.wonEmmy ? "🏆" : ""}</td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleRemoveActor(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default App;
