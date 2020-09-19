// Footer.js

import React from 'react'

function Footer() {
    return (
        <div style={{textAlign: "center"}}>
            <hr />
            <small>Copyright &copy; {new Date().getFullYear()} PetRecs. All Rights Reserved<br /></small>
            {// if we use the pet icons...
             //<small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></small>
            }
            </div>
    )
}

export default Footer