import axios from 'axios'
import { useEffect, useState } from 'react'

function Feedbacks() {
  const [data, setdata] = useState([])
  useEffect(() => {
    axios.get('/api/feedbacks').then((resp) => {
      setdata(resp.data.data)
      console.log(data)
    })
  }, [])

  return (
    <div className='container-fluid'>
      <h4 className='text-white p-2 text-center'>All Feedbacks</h4>
      <table className='table table-bordered table-light table-striped table-hover'>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Feedback</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr key={x.id}>
              <td>{x.customer?.name}</td>
              <td>{x.feedback}</td>
              <td>{x.createdon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Feedbacks
