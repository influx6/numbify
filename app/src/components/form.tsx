import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';

import './form.css'

const phoneNumberRegex = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
const usStylePhoneRegex = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/

type TextInputEvent = {
  target: {
    value: string
  }
}

type Props = {
  onSubmit: Function
  onType?: Function
}

export const NumberForm = (props: Props) => {
  const { onSubmit, onType } = props;
  const [invalid, setInvalid] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const onChange = (event: TextInputEvent) => {
    onType && onType();

    const { value } = event.target;
    setPhoneNumber(value);

    if (value.match(phoneNumberRegex) || value.match(usStylePhoneRegex)) {
      setInvalid(false);
      return;
    }
    setInvalid(true);
  }

  return (
    <div className="formWrapper">
      <Form className="form"> 
        <Form.Row className="centered">
          <Col sm="5">
            <Form.Control 
              required
              size="lg"
              type="tel"
              onChange={onChange} 
              value={phoneNumber} 
              className="formInput"
              placeholder="Phone Number" 
            />
          </Col>
          <div>
            <Button size="lg" active onClick={() => onSubmit(phoneNumber, invalid)} >
              Verify
            </Button>
          </div>
        </Form.Row>
    </Form>
    <div>
      {invalid && <p className="labelError">Number entered is invalid, please correct</p>}
    </div>
    </div>
  )
}

