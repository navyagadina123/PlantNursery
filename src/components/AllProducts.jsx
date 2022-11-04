import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import Product from './Product'
import queryString from 'query-string'
import TopSlider from './TopSlider'

function AllProduct() {
  const [products, setProducts] = useState([])
  const state = useSelector((state) => state)
  const location = useLocation()
  const [item, setItem] = useState({})
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const history = useHistory()

  const [showDialog, setShowDialog] = useState('modal fade')
  const [display, setDisplay] = useState('none')

  const showModal = (prod) => {
    setShowDialog('modal fade show')
    setDisplay('block')
    setItem(prod)
  }

  const checkItem = (prodid) => {
    return state.cart.findIndex((x) => x.id === prodid) < 0
  }

  const closeDialog = () => {
    setShowDialog('modal fade')
    setDisplay('none')
  }

  const loadDataFromServer = () => {
    axios.get('/api/plants').then((resp) => {
      console.log(resp.data.data.total)
      setProducts(resp.data.data)
      console.log(products)
    })
  }

  useEffect(() => {
    let pcat = queryString.parse(location.search)
    console.log(pcat.cat)
    if (pcat.cat !== undefined) {
      axios.get('/api/plants/cats?cat=' + pcat.cat).then((resp) => {
        console.log(resp.data)
        setProducts(resp.data.data)
        console.log(products)
      })
    } else {
      loadDataFromServer()
    }
  }, [location])
  const addToCart = (item) => {
    console.log(item)
    if (sessionStorage.getItem('userid') == null) {
      alert('Please login first to buy product')
      history.push('/clogin')
    } else if (sessionStorage.getItem('role') !== 'customer') {
      alert('Only customer can buy product')
    } else {
      if (checkItem(item.id)) {
        showModal()
        setDisplay('none')
        setShowDialog('modal fade')
        item.qty = qty
        dispatch({ type: 'AddItem', payload: item })
        alert('Item added to cart successfully')
      } else {
        alert('Item already in cart')
      }
    }
  }

  return (
    <>
      <div className='container-fluid p-2'>
        <TopSlider />
      </div>
      <div className='container-fluid' style={{ width: '92%' }}>
        <div className='card shadow bg-transparent'>
          <div className='card-body'>
            <div className='row'>
              {products.map((x) => (
                <Product key={x.id} x={x} showModal={showModal} />
              ))}
            </div>
          </div>
        </div>
        {display == 'block' ? (
          <div
            className={showDialog}
            style={{ zIndex: '1000', display: display }}
          >
            <div
              className='model-lg modal-dialog'
              style={{ minWidth: '700px' }}
            >
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5>Add to Cart</h5>
                  <button onClick={closeDialog} className='close'>
                    &times;
                  </button>
                </div>
                <div className='modal-body'>
                  <div className='d-flex'>
                    <img src={'/' + item.photo} style={{ width: '300px' }} />
                    <div className='ml-3'>
                      <h4 className='pb-2 text-success'>{item.pname}</h4>
                      <p className='font-weight-bold'>Category: {item.cat}</p>
                      <p>{item.descr}</p>
                      <p className='font-weight-bold'>
                        Price: &#8377; {item.price}
                      </p>
                      <div className='form-group form-row'>
                        <label className='col-sm-5 col-form-label font-weight-bold'>
                          Quantity
                        </label>
                        <div className='col-sm-7'>
                          <input
                            type='number'
                            className='form-control form-control-sm'
                            max={item.qty}
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          />
                        </div>
                      </div>
                      <button
                        onClick={(e) => addToCart(item)}
                        className='btn btn-success btn-sm float-right'
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default AllProduct
