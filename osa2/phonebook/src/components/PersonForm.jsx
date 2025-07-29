const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => <form onSubmit={onSubmit}>
  <div>
    name: <input 
      value={newName} 
      onChange={onNameChange}
      placeholder="at least 3 characters" />
  </div>
  <div>
    number: <input 
      value={newNumber} 
      onChange={onNumberChange}
      placeholder="e.g. 040-1234567" />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>

export default PersonForm