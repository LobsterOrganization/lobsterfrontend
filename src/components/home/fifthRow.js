import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch} from "react-redux";
//import { getSentiment } from "C:/Users/HOST/OneDrive/Documents/NeoFrontEnd/frontendV2/src/actions/sentiments.actions.js";


import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";


import { Line} from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const options = {
  plugins: { legend: { display: true } },
  layout: { padding: { bottom: 100 } },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Nombre de tweets',
        color: 'black',   // Changed color to black for better visibility
        font: {
          size: 20,
        }
      },
      ticks: {
        color: "black",  // Changed color to black for better visibility
        font: {
          size: 18,
        },
      },
      grid: {
        color: "#243240",
      },
      beginAtZero:true,
    },
    x: {
      title: {
        display: true,
        color: 'black',  // Changed color to black for better visibility
        font: {
          size: 10,
        }
      },
      ticks: {
        color: "black",  // Changed color to black for better visibility
        font: {
          size: 18,
        },
      },
    },
  },
};


const Content = () => {
  const sentiments = useSelector((state) => state.sentimentsReducer);
  const [dates, setDates] = useState([]);
  const [negatif, setNegatif] = useState([]);
  const [neutre, setNeutre] = useState([]);
  const [positif, setPositif] = useState([]);

  useEffect(() => {
    if (sentiments) {
      const newDates = [];
      const newNegatif = [];
      const newNeutre = [];
      const newPositif = [];

      Object.keys(sentiments).map(key => {
        newDates.push(sentiments[key].Date);
        newNegatif.push(sentiments[key].Negatif);
        newNeutre.push(sentiments[key].Neutre);
        newPositif.push(sentiments[key].Positif);
      });

      setDates(newDates);
      console.log("MAREECARR", newDates);
      setNegatif(newNegatif);
      setNeutre(newNeutre);
      setPositif(newPositif);
    }
  }, [sentiments]);
    

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Negatif",
        data: negatif,
        fill: false,
        backgroundColor: "#f94144",
        borderColor: "#f94144",
      },
      {
        label: "Neutre",
        data: neutre,
        fill: false,
        backgroundColor: "#f8961e",
        borderColor: "#f8961e",
      },
      {
        label: "Positif",
        data: positif,
        fill: false,
        backgroundColor: "#90be6d",
        borderColor: "#90be6d",
      },
    ],
  };

  if (!sentiments || Object.keys(sentiments).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-content-first" id="first-content" >
      <div className="container-fluid">
        <div className="row" >
        
          <div className="col-md" id="first-row-content" >
          <h4 className="text-center">             
              Fluctuation des sentiments des Tweets sur l'hydrogène : un des facteurs les plus échangés sur la Transition Energétique (par semaine)
           
            <div style={{ width: "1100px", height: "250px", display: "flex", justifyContent: "center", alignItems: "center", marginTop : "10%" , marginLeft: "10%"}} >
         
              <Line data={data} options={options} plugins={[Legend]}/>
              
            </div>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

const FifthRow = () => {
  return <Content />;
};

export default FifthRow;
