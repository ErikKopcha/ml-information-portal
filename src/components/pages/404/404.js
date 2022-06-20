import ErrorMessage from '../../errorMessage/Error';
import { Link } from 'react-router-dom';

const textStyle = {
  'textAlign': 'center',
  'fontWeight': 'bold',
  'fontSize': '24px',
};

const linkStyle = {
  'display': 'block',
  'marginTop': '10px',
  'textAlign': 'center',
  'fontSize': '20px',
  'color': 'blue',
};

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={textStyle}>Page doesn't exist</p>
      <Link style={linkStyle} to="/">Back to main page</Link>
    </div>
  );
};

export default Page404;