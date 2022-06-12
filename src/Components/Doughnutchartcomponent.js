import React from "react";
import { Doughnut } from "react-chartjs-2";

function  Doughnutchartcomponent({completed_count,pending_count}) {
  var x = completed_count
  var y = pending_count
  const data = {
    labels: ["Completed Activities", "Pending Activities"],
    datasets: [
      {
        data: [x,y],
        backgroundColor: ["rgb(137, 207, 240)","rgb(248, 131, 121)"],
      }
    ]
  }
  if (x !== 0 || y !== 0)
    return (<Doughnut data={data} />);
  else
    return null;
}

export default Doughnutchartcomponent;
