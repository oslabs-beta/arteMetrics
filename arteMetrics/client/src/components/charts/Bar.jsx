import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Data from '../../querydata.json';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const results = [];
const labels = [];

for (let i in Data) {
  results.push(Data[i].duration.toString() / 1000000);
  labels.push(i.toString());
}

const data = {
  labels: [...labels],
  datasets: [
    {
      label: 'Time in milliseconds',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [...results]
    }
  ]
};

const BarGraph = () => {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({
    path: undefined,
    parentType: undefined,
    fieldName: undefined,
    returnType: undefined,
    startOffset: undefined,
    duration: undefined
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function log(event, array) {
    if (array[0]) {
      setInfo({
        path: Data[array[0]._index].path.toString().replace(/,/g, ' => '),
        parentType: Data[array[0]._index].parentType,
        fieldName: Data[array[0]._index].fieldName,
        returnType: Data[array[0]._index].returnType,
        startOffset: Data[array[0]._index].startOffset,
        duration: Data[array[0]._index].duration
      });
      show ? handleClose() : handleShow();
    }
  }
  return (
    <div>
      <center>
        <h2>Trace Data</h2>
      </center>
      <Bar
        data={data}
        width={1000}
        height={500}
        options={{
          onClick: log,
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                display: true,
                type: 'logarithmic',
                ticks: {
                  min: 0.001, //minimum tick
                  max: 1000, //maximum tick
                  callback: function(value, index, values) {
                    return Number(value.toString()); //pass tick values as a string into Number function
                  },
                  maxTicksLimit: 8
                }
              }
            ]
          }
        }}
      />
      <Modal
        show={show}
        onHide={handleClose}
        info={info}
        centered
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Trace Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Path: {info.path}</h5>
          <h5>Parent Type: {info.parentType}</h5>
          <h5>Field Name: {info.fieldName}</h5>
          <h5>Return Type: {info.returnType}</h5>
          <h5>Start Offset: {info.startOffset}</h5>
          <h5>Duration: {info.duration}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BarGraph;
