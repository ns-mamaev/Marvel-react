import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
 
const PageNotFound = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 600, fontSize: 24, marginBottom: 20 }}>Page not found :/(</p>
      <Link style={{ display: 'block', textAlign: 'center', fontWeight: 600, fontSize: 20 }} to="/">Back to home</Link>
    </div>
  )
};

export default PageNotFound;