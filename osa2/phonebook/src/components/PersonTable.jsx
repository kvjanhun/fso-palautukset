const PersonTable = ({ persons }) => 
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
          <td colSpan="2">No results found</td>
        </tr>
      ) : (
        persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>

export default PersonTable