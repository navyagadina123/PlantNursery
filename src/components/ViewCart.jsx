import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function ViewCart() {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const [cod, setcod] = useState(false)
  const [paymethod, setpaymethod] = useState('By Card')
  const [address, setAddress] = useState({
    city: '',
    state: 'Delhi',
    zip: '12324',
    country: 'India',
  })
  const [payment, setPayment] = useState({
    cardno: '1212444433336666',
    nameoncard: 'Test Name',
    cvv: '123',
    amount: state.cart.reduce((a, b) => a + b.price, 0),
  })
  const deleteItem = (item) => {
    let resp = window.confirm('Are you sure to delete this item ?')
    if (resp) {
      dispatch({ type: 'RemoveItem', payload: item })
      let amount = state.cart.reduce((a, b) => a + b.qty * b.price, 0)
      console.log('Amount ', amount)
    }
  }
  const handleAddressInput = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handlePaymentInput = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    console.log(state.cart)
    let amount = state.cart.reduce((a, b) => a + b.qty * b.price, 0)
    setPayment({ ...payment, amount: amount })
    console.log('Amount => ', amount)
  }, [state.cart])

  const handleSubmit = (e) => {
    e.preventDefault()
    let amount = state.cart.reduce((a, b) => a + b.qty * b.price, 0)
    console.log('Amount ', payment.amount)
    setPayment({ ...payment, amount: amount })
    console.log(state.cart)
    let data = {
      cart: state.cart,
      payment: payment,
      address: address,
      paymethod: paymethod,
      customerid: sessionStorage.getItem('id'),
    }
    console.log(data)
    axios.post('/api/orders', data).then((resp) => {
      console.log(resp)
      dispatch({ type: 'Clear' })
      history.push('/myorders')
    })
  }
  return (
    <div className='container-fluid'>
      {state.cart.length > 0 ? (
        <div className='row'>
          <div className='col-sm-7'>
            <h4 className='p-2'>Cart View</h4>
            <table className='table table-bordered table-sm table-light table-striped'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Plant Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        className='mr-2 float-left'
                        src={'/' + item.photo}
                        width='100'
                      />
                      {item.bname}
                    </td>
                    <td>&#8377; {item.price}</td>
                    <td>{item.qty}</td>
                    <td>&#8377; {item.qty * item.price}</td>
                    <td>
                      <button
                        onClick={(e) => deleteItem(item)}
                        className='btn btn-danger btn-sm'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan='4'>Total Amount</th>
                  <th>
                    &#8377;{' '}
                    {state.cart.reduce((a, b) => a + b.qty * b.price, 0)}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className='col-sm-4 bg-white text-dark py-2'>
            <form onSubmit={handleSubmit}>
              <h5 className='p-2'>Address Information</h5>
              <div className='form-group form-row'>
                <label className='col-sm-4 form-control-label'>City</label>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    name='city'
                    required
                    value={address.city}
                    onChange={handleAddressInput}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group form-row'>
                <label className='col-sm-4 form-control-label'>State</label>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    name='state'
                    required
                    value={address.state}
                    onChange={handleAddressInput}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group form-row'>
                <label className='col-sm-4 form-control-label'>Zip</label>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    name='zip'
                    required
                    value={address.zip}
                    onChange={handleAddressInput}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group form-row'>
                <label className='col-sm-4 form-control-label'>Country</label>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    name='country'
                    required
                    value={address.country}
                    onChange={handleAddressInput}
                    className='form-control'
                  />
                </div>
              </div>

              <h5 className='p-2'>Payment Information</h5>
              <div
                className='btn-group btn-group-toggle mb-2'
                data-toggle='buttons'
              >
                <label
                  className='btn btn-outline-success'
                  onClick={(e) => setpaymethod('Cash on Delivery')}
                >
                  <input
                    type='radio'
                    name='paymethod'
                    id='option1'
                    value='Cash on Delivery'
                    autoComplete='off'
                  />
                  Cash on Delivery
                </label>
                <label
                  className='btn btn-outline-success active'
                  onClick={(e) => setpaymethod('By Card')}
                >
                  <input
                    type='radio'
                    name='paymethod'
                    id='option2'
                    value='By Card'
                    autoComplete='off'
                    checked={(e) => setpaymethod(e.target.value)}
                  />
                  By Card
                </label>
              </div>

              {paymethod == 'By Card' ? (
                <div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>
                      Card No
                    </label>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        name='cardno'
                        value={payment.cardno}
                        onChange={handlePaymentInput}
                        className='form-control'
                        maxLength='16'
                      />
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>
                      Name on Card
                    </label>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        name='nameoncard'
                        value={payment.nameoncard}
                        onChange={handlePaymentInput}
                        className='form-control'
                      />
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>
                      Expiry Date
                    </label>
                    <div className='col-sm-8'>
                      <input type='month' required className='form-control' />
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>CVV</label>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        maxLength='3'
                        value={payment.cvv}
                        onChange={handlePaymentInput}
                        className='form-control'
                      />
                    </div>
                  </div>
                  <div className='form-group form-row'>
                    <label className='col-sm-4 form-control-label'>
                      Billed Amount
                    </label>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        maxLength='3'
                        readOnly
                        value={payment.amount}
                        onChange={handlePaymentInput}
                        className='form-control'
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              <button className='btn btn-success float-right'>
                Place Order
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h4>Cart is Empty</h4>
      )}
    </div>
  )
}

export default ViewCart
