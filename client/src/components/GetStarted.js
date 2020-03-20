import React from 'react'

const GetStarted = (props) => {
    const {setName, submitHandler} = props

    return(
        <div className="mt-4 text-center">
            <h2 className="card-title mt-5">Get started right now!</h2>
            <form onSubmit={submitHandler} className="mt-3 mb-5">
                <div className="form-group">
                    <label>I want to start chatting with the name...</label><br/>
                    <input type="text" placeholder="My name..." onChange={(e) => setName(e.target.value)} className="form-control col-10 mx-auto" />
                </div>
                <input type="submit" value="Start Chatting" className="btn btn-success" />
            </form>
        </div>
    )
}
export default GetStarted