import React, { useEffect, useState } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from './components/Table/Table';
import Filter from './components/Filter/Filter';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [events, setEvents] = useState({});
  const [page, setPage] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [filter, setFilter] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filterChange = (filterVal) => {
    setPage(0)
    if (filterVal.length === 0) {
      setFilter({});
    } else {
      setFilter({ eventType: filterVal });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetch(`/api/eventTypesOptions`)
      .then((res) => res.json())
      .then((json) => {
        setOptions(json.options);
      });
    return () => {};
  }, []);

  useEffect(() => {
    fetch(`/api/events/paginate?page=${page + 1}&limit=${rowsPerPage}&filter=${JSON.stringify(filter)}`)
      .then((res) => res.json())
      .then((json) => {
        setEvents(json);
      });
    return () => {};
  }, [page, rowsPerPage, filter]);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <div className="MainContainer">
          <div>
            <div className="title">Events Table</div>
            <div className="select">
              <Filter options={options} onChange={filterChange} />
            </div>
            <Table
              data={events}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
