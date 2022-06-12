import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

export default function Updatemodalcomponent({
  openUpdateModal,
  closeUpdateModal,
  updateActivity,
  setOpenUpdateModal,
  updated_data_callback
}) {


  const [updated_activity,setupdated_activity] = useState(null)
  const [disableSubmit,setdisableSubmit] = useState(true)

  function handleupdatechange(e)
  {
    setupdated_activity(e.target.value)
    validate(e.target.value)
  }
  function handlesaveclick()
  {
    setupdated_activity(null)
    setOpenUpdateModal(false)
    updated_data_callback(updated_activity)
    setdisableSubmit(true)
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

  if (openUpdateModal === false) return null;
  else
    return (
      <div>
        <Modal show={openUpdateModal} centered>
          <Modal.Header>
            <Modal.Title>Update Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please update activity</p>
            <FormControl defaultValue={updateActivity} onChange={handleupdatechange}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handlesaveclick} disabled={disableSubmit}>Save</Button>
            <Button variant="danger" onClick={closeUpdateModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}
