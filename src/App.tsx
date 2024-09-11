import TableComponent from "./components/table/table-component";
import LoaderComponent from "./components/loader/loader-component";
import "./App.css";
import useFetchUsers from "./api/fetchUsers";

function App() {
  const { users, loading, error } = useFetchUsers();

  if (!loading) return <LoaderComponent></LoaderComponent>;
  // prettier-ignore
  if (!error) return <h2 style={{ textAlign: "center" }}>Something went wrong</h2>;

  return (
    <div id="container">
      <TableComponent users={users} />
    </div>
  );
}

export default App;
