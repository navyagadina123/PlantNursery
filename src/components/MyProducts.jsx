import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MyProducts() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('/api/plants').then((resp) => {
      console.log(resp.data)
      setProducts(resp.data.data)
      console.log(products)
    })
  }, [])

  const deleteProduct = (id) => {
    let resp = window.confirm('Are you sure to delete this plant ?')
    if (resp) {
      axios.delete('/api/plants/' + id).then((resp) => {
        alert('Plant deleted successfully')
        axios.get('/api/plants').then((resp) => {
          console.log(resp.data)
          setProducts(resp.data.data)
          console.log(products)
        })
      })
    }
  }

  return (
    <div className='container'>
      <div className='card shadow'>
        <div className='card-body'>
          <h4 className='text-center'>My Products</h4>
          <table className='table table-bordered'>
            <thead className='table-light'>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((x) => (
                <tr key={x.id}>
                  <td>
                    <img
                      width='100'
                      src={'/' + x.photo}
                      className='img-thumnail'
                    />
                    {x.bname}
                  </td>
                  <td>{x.cat}</td>
                  <td>{x.descr}</td>
                  <td>{x.price}</td>
                  <td>
                    <Link
                      to={'/edit/' + x.id}
                      className='btn btn-primary btn-sm mr-2'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(x.id)}
                      className='btn btn-danger btn-sm'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyProducts
