import React, {useState, useEffect} from 'react';
import TStepStatusLabel from '../../General/StatusLabel/TStepStatusLabel';
import {FormOutlined} from '@ant-design/icons';
import {IN_PROGRESS_STATUS} from '../../../shared/constants';
import {
  Badge,
  Form,
  Button,
  Card,
  Col,
  Row,
  Container,
  Table,
} from 'react-bootstrap';
const uniqid = require ('uniqid');
const BaseUrl = process.env.REACT_APP_URL_PATH;

function DropDownServices (props) {
  const options = items => {
    let content = [];

    if (items.length >= 1) {
      items.map ((item, key) =>
        content.push (
          <option key={uniqid ()} value={item.grp_id}>{item.grp_name}</option>
        )
      );
    }

    return content;
  };

  return (
    <Form.Group className="mb-3" controlId="formGroupDescription">
      <Form.Label>User Group<span className='text-color-red'>*</span></Form.Label>
      <Form.Select
        value={props.value}
        onChange={e => props.dropdownvalue (e.target.value)}
      >
        <option value="0">Select Group</option>
        {options (props.combolist)}
      </Form.Select>
    </Form.Group>
  );
}

export default DropDownServices;
