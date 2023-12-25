import Alert from '@mui/material/Alert';

const Message = ({ severity, children }) => {
  return <Alert severity={severity}>{children}</Alert>;
};

Message.defaultProps = {
  severity: 'info', // Les valeurs possibles sont "error", "warning", "info", "success"
};

export default Message;
