import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const apiKey = "69bb256251822257f5cd01e17b2f8f86";

  const [weather, setWeather] = useState({
    city: null,
    temp: null,
    humidity: null,
    wind: null,
    error: null,
  });

  const [data, setData] = useState([
    { id: 1, name: "John Doe", age: 25, city: "New York" },
    { id: 2, name: "Jane Smith", age: 32, city: "San Francisco" },
    { id: 3, name: "Bob Johnson", age: 48, city: "Chicago" },
    { id: 4, name: "Sally Thompson", age: 19, city: "Los Angeles" },
  ]);
  const [sortedState, setSortedState] = useState({
    id: false,
    name: false,
    age: false,
    city: false,
  });

  const onRequestWeather = async(e) => {
    e.preventDefault();
    const city = e.target.city.value.toLowerCase();
    console.log(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.cod === 200) {
      setWeather({
        city: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        error: null,
      });
    }
    else {
      setWeather({
        city: null,
        temp: null,
        humidity: null,
        wind: null,
        error: data.message,
      });
    }
  };


  const onSort = (e) => {
    const id = e.target.id;
    const sorted = [...data].sort((a, b) => {
      if (sortedState[id]) {
        setSortedState({ ...sortedState, [id]: false });
        return a[id] > b[id] ? 1 : -1;
      } else {
        setSortedState({ ...sortedState, [id]: true });
        return a[id] < b[id] ? 1 : -1;
      }
    });
    setData(sorted);
  };

  const filteredData = data.filter((item) => {  
    return Object.keys(item).some((key) => {
      return item[key].toString().toLowerCase().includes(search.toLowerCase());
    });
  });


  useEffect(() => {
    setData(filteredData);
  }, [search]);

  return (
    <div className="App">
      <div className='question1'>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);

          if (e.target.value === "") {
            setData([
              { id: 1, name: "John Doe", age: 25, city: "New York" },
              { id: 2, name: "Jane Smith", age: 32, city: "San Francisco" },
              { id: 3, name: "Bob Johnson", age: 48, city: "Chicago" },
              { id: 4, name: "Sally Thompson", age: 19, city: "Los Angeles" },
            ]);
          }
        }}
      />
      <table>
        <thead>
          <tr>
            <th>
              id{" "}
              <button id={"id"} onClick={onSort}>
                S
              </button>
            </th>
            <th>
              name
              <button id={"name"} onClick={onSort}>
                S
              </button>
            </th>
            <th>
              age
              <button id={"age"} onClick={onSort}>
                S
              </button>
            </th>
            <th>
              city
              <button id={"city"} onClick={onSort}>
                S
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.city}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <div className='question2'>

      <form onSubmit={onRequestWeather}>
        <input type="text" name="city" placeholder="city" />
        <button type="submit">Submit</button>
      </form>

      {weather.city ? (
        <div>
          <p>City: {weather.city}</p>
          {/* in celcius */}
          <p>Temperature: {weather.temp - 273.15} °C</p>
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind: {weather.wind * 2.237} mph</p>
        </div>
      ) : (
        <p>{weather.error}</p>
      )}


</div>
    </div>
    
  );
}

export default App;

// Given an array of objects representing data for a table, create a React component that renders the data in a table. The table should be sortable by any column and the table rows should be filterable based on a search input.
// Here's an example of the data:

// const data = [
//   { id: 1, name: 'John Doe', age: 25, city: 'New York' },
//   { id: 2, name: 'Jane Smith', age: 32, city: 'San Francisco' },
//   { id: 3, name: 'Bob Johnson', age: 48, city: 'Chicago' },
//   { id: 4, name: 'Sally Thompson', age: 19, city: 'Los Angeles' }
// ];

// The React component should have the following requirements:

// Display the data in a table format with columns for id, name, age, and city
// Allow the user to click on a column header to sort the data by that column in ascending or descending order
// Allow the user to filter the table rows by entering text in a search input field

// The component should be reusable and accept the data as a prop.
// Please provide a working solution and feel free to use any additional libraries or tools you are comfortable with.
