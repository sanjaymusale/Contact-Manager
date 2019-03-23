import React from 'react'

const style = {
    height: '40px',
    color: 'white',
}
const Footer = (props) => {
    return (
        <div>
            <nav className="bg-primary" style={style}>
                <p className="text-center"> <span >Copyright &copy; DCT-ACADEMY , 2019 . Developed By <i><b>Sanjay Musale</b></i> </span></p>
            </nav>
        </div>

    )
}


export default Footer