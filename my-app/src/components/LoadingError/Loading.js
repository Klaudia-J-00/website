const Loading = () => {
    return(
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status" style={{width: '50px', height: '50px'}}>
                <span className="sr-only">Ładowanie...</span>
            </div>
        </div>
    )
}

export default Loading;