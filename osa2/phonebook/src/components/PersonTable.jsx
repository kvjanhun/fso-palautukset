const PersonTable = ({ persons, onClick }) => 
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Number</th>
      </tr>
    </thead>
    <tbody>
      {persons.length === 0 ? (
        <tr>
          <td colSpan="3">No results found</td>
        </tr>
      ) : (
        persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => onClick(person.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>

export default PersonTable