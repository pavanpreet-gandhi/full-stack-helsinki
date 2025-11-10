const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} type='text' placeholder="Enter name..." />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} type='tel' placeholder="Enter phone number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm