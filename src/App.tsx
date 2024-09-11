import TableComponent from "./components/table/table-component";
import "./App.css";
import useFetchUsers from "./api/fetchUsers";

function App() {
  const { users, loading, error } = useFetchUsers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div id="container">
      <TableComponent users={users} />
    </div>
  );
}

export default App;
