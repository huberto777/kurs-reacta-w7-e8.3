import React from "react";
import TimeboxEditing from "./TimeboxEditing";

function Timebox({
  timebox,
  onDelete,
  onEdit,
  editCurrentTimebox,
  onUpdate,
  onCancel,
  editMode,
}) {
  const { id, title, totalTimeInMinutes } = timebox;
  return (
    <>
      {editCurrentTimebox === id ? (
        <TimeboxEditing
          timebox={timebox}
          onUpdate={onUpdate}
          onCancel={onCancel}
        />
      ) : (
        <div className={`Timebox ${editMode ? "inactive" : ""}`}>
          <h3>
            {title} - {totalTimeInMinutes} min.
          </h3>
          <button onClick={onDelete} disabled={editMode}>
            Usuń
          </button>
          <button onClick={onEdit} disabled={editMode}>
            Zmień
          </button>
        </div>
      )}
    </>
  );
}

export default Timebox;
