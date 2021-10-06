import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import testClass from './testfunc';
import testObject from "./testfunc"
import uniqueId from "lodash.uniqueid"


function App() {

  const [counter, setCounter] = useState(0)
  const [testText, setTestText] = useState("")
  const [details, setDetails] = useState({name:"",num:""})
  const [arr, setArr] = useState([1,2,3,4,5])
  const [people, setPeople] = useState([])
  const htmlText = "<h1>hello<h1>"

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setDetails({...details, [name]:value})
  }

  useEffect(() => {
    fetchPeople();
  },[]);

  async function fetchPeople(){
    await axios.get("https://randomuser.me/api/?results=20")
      .then(res => setPeople(res.data.results))
      .catch((err) => 
        {console.error(err)}
      )
  }


  // for (let i = 0; i < cars.length; i++) {
  //   text += cars[i] + "<br>";
  // }

  // const result = words.filter(word => word.length > 6);

  return (
    <div className="App">
      <div>Hello There</div>

      <div >
        <p>{counter}</p>
      </div>

      <div className="add-button" onClick={()=>setCounter(counter+1)}>
        <p>Click</p>
      </div>
   
      <div >
        <p>{details.name}</p>
        <p>{details.num}</p>
      </div>

      <input name="name" label="Name:" value={details.name} onChange={handleChange} />
      <input name="num" label="Num:" value={details.num} onChange={handleChange} />

      <div>
        {arr.map((element) => {
          return(
            <button  key={uniqueId()} onClick={()=>testObject.printName()}>{element}</button>
          )
        })}
      </div>

      <table>
        <tr>
          <th>City</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Country</th>
          <th>Post Code</th>
          <th>State</th>
          <th>Street Number </th>
          <th>Street Name</th>
        </tr>

        {
          people.map((person) =>{

            const {location} = person

            return(
              <tr>
                <td>{location.city}</td>
                <td>{location.coordinates.latitude}</td>
                <td>{location.coordinates.longitude}</td>
                <td>{location.country}</td>
                <td>{location.postcode}</td>
                <td>{location.state}</td>
                <td>{location.street.name} </td>
                <td>Street Name</td>
              </tr>
            )
          })
        }


      </table>

      {/* <div>
        {
          people.map((person) =>{
            return(
              <div key={ person.id.value ? person.id.value : person.id.name}>
                <p>{person.name.first}</p>
                <p>{person.cell}</p>
              </div>
            )
          })
        }
      </div> */}

    </div>
  );
}

export default App;
