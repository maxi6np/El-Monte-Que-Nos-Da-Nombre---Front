const Error = ({ children }) => {
    return (
        <div className="bg-danger text-white text-center p-3 text-uppercase
    font-weight-bold me-3 w-100">
            {children}
        </div>
    )
}
export default Error