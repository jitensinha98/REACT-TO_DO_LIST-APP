import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { useState } from "react";

export default function Addmodalcomponent({
  OpenAddModal,
  CloseAddModal,
  setOpenAddModal,
  sendActivityfromModal,
}) {
  const [activity, setactivity] = useState("")
  const [disableSubmit,setdisableSubmit] = useState(true)

  function submit_actions() {
    sendActivityfromModal(activity)
    alert("Activity Logged Successfully !!!")
    setOpenAddModal(false)
    setactivity(null)
    setdisableSubmit(true)
  }

  function handlechange(e)
  {
    setactivity(e.target.value)
    validate(e.target.value)
  }

  function validate(item)
  {
    let space_flag = 0
    for (let i = 0;i<item.length;i++)
    {
      if(item[i] === " ")
          space_flag = 1
      else
        {
          space_flag = 0
          break
        }
    }
    if (item.length !== 0 && space_flag === 0 )
    setdisableSubmit(false)
    else
    setdisableSubmit(true)
  }

  return (
    <div>
      <Modal show={OpenAddModal} centered>
        <Modal.Header>
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Please describe activity</p>
          <FormControl
            placeholder="Enter your activity"
            onChange={handlechange}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={submit_actions} disabled={disableSubmit}>
            Save
          </Button>
          <Button variant="danger" onClick={CloseAddModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
