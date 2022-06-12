import React from "react";
import { Table } from "react-bootstrap";
import "./Tablecomponent.css";
import { Button } from "react-bootstrap";
import Updatemodalcomponent from "./Updatemodalcomponent";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Switch } from "@material-ui/core";

let activity_to_be_updated = null
let activity_to_be_updated_index = -1
let completed = 0
let pending = 0
let last_index=[]

export default function Tablecomponent({
  tablecomponentdataprop,
  tablecomponentindexprop,
  switchstatusprop,
  completed_count,
  pending_count,
}) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);


  function handleDeleteClick(delete_index) {
    tablecomponentdataprop.splice(delete_index.target.value, 1);
    tablecomponentindexprop.splice(delete_index.target.value, 1);
    switchstatusprop.splice(delete_index.target.value, 1);
    last_index.splice(delete_index.target.value, 1)
    alert("Activity Deleted !!!");
    get_count();
  }

  function handleUpdateclick(e) {
    setOpenUpdateModal(true);
    activity_to_be_updated_index = e.target.value;
    activity_to_be_updated =
      tablecomponentdataprop[activity_to_be_updated_index];
  }

  function handlechange(e) {
    switchstatusprop[e.target.value] = e.target.checked;
    get_count();
    let checked_index = tablecomponentindexprop[e.target.value];
    let checked_value = tablecomponentdataprop[e.target.value];
    let switch_index = switchstatusprop[e.target.value];
    if (e.target.checked === true) {

      tablecomponentindexprop.splice(e.target.value, 1);
      tablecomponentindexprop.splice(
        tablecomponentindexprop.length - completed + 1,
        0,
        checked_index
      );


      tablecomponentdataprop.splice(e.target.value, 1);
      tablecomponentdataprop.splice(
        tablecomponentdataprop.length - completed + 1,
        0,
        checked_value
      );

      switchstatusprop.splice(e.target.value, 1);
      switchstatusprop.splice(
        switchstatusprop.length - completed + 1,
        0,
        switch_index
      );

       last_index[tablecomponentdataprop.length - completed] = parseInt(e.target.value) 
    }

   else if (e.target.checked === false) 
    {

      tablecomponentindexprop.splice(e.target.value, 1);
      tablecomponentindexprop.splice(
        last_index[e.target.value],
        0,
        checked_index
      );

      tablecomponentdataprop.splice(e.target.value, 1);
      tablecomponentdataprop.splice(
        last_index[e.target.value],
        0,
        checked_value
      );

      switchstatusprop.splice(e.target.value, 1);
      switchstatusprop.splice(
        last_index[e.target.value],
        0,
        switch_index
      );

    }
  }
  
  console.log("last_index : ", last_index);
  function getUpdatedData(updated_activity) {
    tablecomponentdataprop[activity_to_be_updated_index] = updated_activity;
  }

  function get_count() {
    completed = 0;
    pending = 0;
    for (let i = 0; i < switchstatusprop.length; i++) {
      if (switchstatusprop[i] === true) completed++;
    }
    pending = switchstatusprop.length - completed;
    completed_count(completed);
    pending_count(pending);
  }

  if (tablecomponentdataprop.length !== 0)
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr key={-1}>
              <th className="tableheading" colSpan={4}>
                ACTIVITIES
              </th>
            </tr>
          </thead>
          <tbody>
            {tablecomponentdataprop.map((data, i) => (
              <tr key={tablecomponentindexprop[i]}>
                <td className="checkboxspecs col-md-1">
                  <Switch color="primary" value={i} onChange={handlechange} />
                </td>
                <td
                  className="table-text col-md-8"
                  style={{
                    textDecoration:
                      switchstatusprop[i] === true ? "line-through" : "none",
                  }}
                >
                  {data}
                </td>
                <td>
                  <Updatemodalcomponent
                    openUpdateModal={openUpdateModal}
                    closeUpdateModal={() => setOpenUpdateModal(false)}
                    updateActivity={activity_to_be_updated}
                    setOpenUpdateModal={setOpenUpdateModal}
                    updated_data_callback={getUpdatedData}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    value={i}
                    className="spaceButton rounded-circle"
                    onClick={handleUpdateclick}
                  >
                    <MdModeEdit className="button-icons" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded-circle"
                    value={i}
                    onClick={handleDeleteClick}
                  >
                    <MdDelete className="button-icons" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
}
