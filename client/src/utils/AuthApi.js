import Cookies from "js-cookie";

// Simple login detection to determine if re-routes are necessary
// returns true if user is logged in
export default function isUserLoggedIn() {
    // Grab cookie created by successful login, if it exists
    let session = Cookies.get("sessionId") || 'no-cookie';
    return session !== "no-cookie";
}