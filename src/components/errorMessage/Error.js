import errorSrc from './error.gif';

const Error = () => {
  return (
    <img
      style={{
        display: 'block',
        width: '250px',
        objectFit: 'contain',
        margin: '0 auto',
      }}
      src={errorSrc}
      alt="error gif"
    ></img>
  );
};

export default Error;
