import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Feedback() {
  const [feedback, setfeedback] = useState()
  const customer = sessionStorage.getItem('id')
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8080/api/feedbacks/', {
        feedback: feedback,
        customerid: customer,
      })
      .then((resp) => {
        alert('Feedback submitted')
        history.push('/')
      })
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-5 mx-auto'>
          <div className='card mt-3'>
            <div className='card-body'>
              <h4 className='p-2 text-center'>Customer Feedback</h4>
              <form>
                <div className='form-group'>
                  <label>Feedback</label>
                  <textarea
                    rows={4}
                    className='form-control'
                    onChange={(e) => setfeedback(e.target.value)}
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className='btn btn-primary float-right'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
