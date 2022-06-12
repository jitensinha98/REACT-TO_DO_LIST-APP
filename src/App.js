import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Addmodalcomponent from "./Components/Addmodalcomponent";
import "./App.css";
import Tablecomponent from "./Components/Tablecomponent";
import Doughnutchartcomponent from "./Components/Doughnutchartcomponent";

let activity_list = []
let activity_index = []
let switch_status = []
let index = -1;

export default function App() {
  const [OpenAddModal, setOpenAddModal] = useState(false)
  const [nCompleted , setnCompleted] = useState(0)
  const [nPending , setnPending] = useState(0)

  function getActivity(activity)
  {
    activity_list.push(activity)
    index = index + 1
    activity_index.push(index)
    switch_status.push(false)
    setnCompleted(0)
    setnPending(activity_list.length)
  }

  function getComplete(count)
  {
    setnCompleted(count)
  }

  function getPending(count)
  {
    setnPending(count)
  }
  return (
    <div className="Homepage shadow-lg p-3 mb-5 bg-white rounded border border-primary">
      <p className="heading border border-primary text-primary rounded">
        <span>Todo</span> List
      </p>
          <div className="float-child-right">
          <Doughnutchartcomponent completed_count={nCompleted} pending_count={nPending}/>
        </div>
        <br></br>
        <Button
            onClick={() => setOpenAddModal(true)}
            className="addbutton"
            variant="outline-primary"
          >
           + Add Task
          </Button>
          <Addmodalcomponent
            OpenAddModal={OpenAddModal}
            CloseAddModal={() => setOpenAddModal(false)}
            setOpenAddModal = {setOpenAddModal}
            sendActivityfromModal = {getActivity}
          />
          <div className="counter">
            <b>Completed Activities: </b>
            <span className="badge badge-primary rounded-circle">{nCompleted}</span>
            <div className="right-text-position">
              <b>Pending Activities: </b>
              <span className="badge badge-danger rounded-circle">{nPending}</span>
            </div>
          </div>
          <hr className="divider"></hr>
          <Tablecomponent tablecomponentdataprop={activity_list} tablecomponentindexprop={activity_index} switchstatusprop={switch_status} completed_count = {getComplete}
          pending_count = {getPending}/>
      </div>
  );
}
