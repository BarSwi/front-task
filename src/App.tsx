import TableComponent from "./components/table/table-component";
import LoaderComponent from "./components/loader/loader-component";
import "./App.css";
import useFetchUsers from "./api/fetchUsers";

function App() {
  const { users, loading, error } = useFetchUsers();

  if (!loading) return <LoaderComponent></LoaderComponent>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div id="container">
      <TableComponent users={users} />
    </div>
  );
}

export default App;
