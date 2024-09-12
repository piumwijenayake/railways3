import React,{useState} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../filter/filtermenu.css';
import image1 from '../../assets/image1.jpeg'; // Adjust the path if necessary
import image2 from '../../assets/image3.jpg';  // Adjust the path if necessary
import image3 from '../../assets/image4.jpg';  // Adjust the path if necessary
import TrainTable from './TrainTable';
import TrainMap from '../TrainDetails';
import Modals from '../Popup/Modal';
const Filtermenu = () => {
  
  const [selected, setSelected] = useState([]);
  const [fromlocation, setFromLocation] = useState('');
  const [tolocation, setToLocation] = useState('');
  const [datearrived, setDateArrived] = React.useState(new Date());
  const [passengers, setPassengers] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

const handleChange = (event) => {
  setSelectedValue(event.target.value);
};
const handleDropdown2Change = (event) => {
  setSelectedOption2(event.target.value);
};



  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleSearch = async () => {
      try {
          const response = await axios.post('http://localhost:3000/services/book/train/searchseats', {
              fromlocation,
              tolocation,
              datearrived,
              passengers
          });
          setResults(response.data);
          console.log(setResults(response.data))
      } catch (err) {
          setError('An error occurred while fetching data.');
          console.log(err);
      }
  };


const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelected = results.map((n) => n._id);
    setSelected(newSelected);
    return;
  }
  setSelected([]);
};

const handleClick = (event, id) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  setSelected(newSelected);
};

const isSelected = (id) => selected.indexOf(id) !== -1;


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1>Srilankan Railway</h1>
        <nav>
          <a href="#home" style={{ color: 'white', margin: '0 10px' }}>Home</a>
          <a href="#contact" style={{ color: 'white', margin: '0 10px' }}>Locations</a>

        </nav>
      </div>
      <Slider {...settings} className="slider">
        <div>
          <img src={image1} alt="Slide 1" />
        </div>
        <div>
          <img src={image2} alt="Slide 2" />
        </div>
        <div>
          <img src={image3} alt="Slide 3" />
        </div>
      </Slider>
      <div className="large-card">
        <div className="input-row">
          <input
           type="text" placeholder="From Location" 
           className="input-box" 
           value={fromlocation}
           onChange={(e) => setFromLocation(e.target.value)}
           />
          <input type="text" placeholder="To Location"
           className="input-box"
           value={tolocation}
           onChange={(e) => setToLocation(e.target.value)} />
          <input type="text" className="input-box" 
          value={passengers}
          placeholder='Enter your Travellers'
          onChange={(e) => setPassengers(e.target.value)}/>
          
          <input  type="date"
                                        name="ArrivalDate"
                                        value={datearrived}
                onChange={(e) => setDateArrived(e.target.value)}
                />

          







        </div>
        <button className="submit-button" onClick={handleSearch}>Submit</button>
        {results.length > 0 ? (
          <TrainTable
            results={results}
            selected={selected}
            handleSelectAllClick={handleSelectAllClick}
            handleClick={handleClick}
            isSelected={isSelected}
          />
        ) : (
          <p>No results found</p>
        )}
      </div>
      <div className="additional-card"  id="contact">
      <TrainMap/>
        
      </div>
     
    </div>
  );
}

export default Filtermenu;