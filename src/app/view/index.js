import useQueryUser from "../hooks/useQueryUser";

function App() {
  const { users, loading } = useQueryUser();
  return (
    <div className="App">
      {loading && <p>Loading ...</p>}
      {!loading && users && (
        <table>
          <thead>
            <tr>
              <th>id</th>
            </tr>
          </thead>
          <tbody>
            {users.user.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
