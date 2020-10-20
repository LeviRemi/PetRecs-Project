// Footer.js

import React from 'react'

function Footer() {
    return (
        <div className="footer" style={{textAlign: "center", margin: "15px"}}>
            <hr />
            <small>Copyright &copy; {new Date().getFullYear()} PetRecs. All Rights Reserved<br /></small>
            {
             <small>Pet icons made by <a target="_blank" rel="noopener noreferrer" href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a target="_blank" rel="noopener noreferrer" href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></small>
            }
        </div>
    )
}

export default Footer