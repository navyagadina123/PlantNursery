import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import productvalidation from './productvalidation'

function EditProduct() {
  console.log('Edit product page')
  const { prodid } = useParams()
  const [product, setProduct] = useState({
    id: prodid,
    pname: '',
    cat: '',
    price: '',
    descr: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const history = useHistory()

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(productvalidation(product))
    setSubmitted(true)
  }

  useEffect(() => {
    console.log(errors)

    axios.get('/api/plants/' + prodid).then((resp) => {
      console.log(resp.data.data)
      setProduct(resp.data.data)
    })

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(product)
      axios
        .put('/api/plants/' + prodid, product)
        .then((resp) => {
          let result = resp.data.data
          console.log(result)
          alert('Plant updated successfully')
          history.push('/myproducts')
        })
        .catch((error) => {
          console.log('Error', error)
          alert('Error saving product')
        })
    }
  }, [errors])
  return (
    <div className='container pt-3 card mt-3'>
      <div className='row'>
        <div className='col-sm-4'>
          <img className='img-thumbnail mt-3' src={'/' + product.photo} />
        </div>
        <div className='col-sm-6 offset-1 p-4'>
          <h4 className='text-center p-2'>
            Edit Plant (Plant Id : {product.id})
          </h4>
          <form onSubmit={handleSubmit}>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Plant Name</label>
              <div className='col-sm-8'>
                <input
                  type='text'
                  name='pname'
                  value={product.pname}
                  onChange={handleInput}
                  className='form-control'
                />
                {errors.pname && (
                  <small className='text-danger float-right'>
                    {errors.pname}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Category</label>
              <div className='col-sm-8'>
                <select
                  name='pcat'
                  value={product.cat}
                  onChange={handleInput}
                  className='form-control'
                >
                  <option value=''>Select Category</option>
                  <option>Plant</option>
                  <option>Planter</option>
                  <option>Flowering</option>
                </select>
                {errors.cat && (
                  <small className='text-danger float-right'>
                    {errors.cat}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Price</label>
              <div className='col-sm-8'>
                <input
                  type='number'
                  name='price'
                  value={product.price}
                  onChange={handleInput}
                  className='form-control'
                />
                {errors.price && (
                  <small className='text-danger float-right'>
                    {errors.price}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Description</label>
              <div className='col-sm-8'>
                <textarea
                  rows={4}
                  name='descr'
                  value={product.descr}
                  onChange={handleInput}
                  className='form-control'
                ></textarea>
                {errors.descr && (
                  <small className='text-danger float-right'>
                    {errors.descr}
                  </small>
                )}
              </div>
            </div>

            <button className='btn btn-primary float-right'>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
