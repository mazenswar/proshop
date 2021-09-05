import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';



function PaymentScreen({ history }) {
  const { shippingAddress } = useSelector(state => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(!shippingAddress) {
      history.push('/shipping')
    }
  }, [history, shippingAddress])

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
    // dispatch()
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check 
              type="radio" 
              id="PayPal"
              label="PayPal or Credit Card"
              name="paymentMethod"
              value="PayPal"
              onChange={e => setPaymentMethod(e.target.value)}
              ></Form.Check>
                <Form.Check 
              type="radio" 
              id="Stripe"
              label="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={e => setPaymentMethod(e.target.value)}
              ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
