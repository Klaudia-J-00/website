const Message = ({ variant, children }) => { 
    return <div className={`alert alert-${variant}`}>{children}</div>
};

Message.defaultProps = {
    variant: 'alert-info',
};

export default Message;