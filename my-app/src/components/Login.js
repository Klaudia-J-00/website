import './Login.css'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-5 d-none d-md-block login">
                    <img className='img-fluid pt-3 pb-3 px-2' src='../img/login_backdrop.jpg' alt="Login Backdrop" />
                </div>
                <div className="col-sm-12 col-md-7 login text-center">
                    <h5 className='header-login'>LOGOWANIE</h5>
                    <div className="row justify-content-center">
                        <div className="col-6 login-form">
                        <form onSubmit=''>
                            <div className="form-group">
                                <label htmlFor="email" className="col-sm-3 col-form-label">e-mail</label>
                                <input type="email" className="form-control" id="email" placeholder="Wprowadź e-mail" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-3 col-form-label">hasło</label>
                                <input type="password" className="form-control" id="password" placeholder="Wprowadź hasło" required />
                            </div>

                            <div className="form-group row button-submit">
                                <div className="col-sm-12">
                                    <button type="submit" className="btn btn-login">ZALOGUJ SIĘ</button>
                                </div>
                            </div>
                        
                        </form>
                        </div>
                    </div>
                    
                    
                    <div className="d-flex justify-content-center line-cont">
                        <div className="line"></div>
                        <span className="or-span">lub</span>
                        <div className="line"></div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="btn-google col-6">
                            <button className="btn btn-white btn-circle col-12">
                                <img src="../img/google.png" alt="btn" className='img-fluid'/>
                            </button>⠀
                            <button className="btn btn-white btn-circle col-12">
                                <img src="../img/facebook.png" alt="btn" className='img-fluid p-3'/>
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <p>Nie masz jeszcze konta? <Link to='/register' className='link'>Zarejestruj się</Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
}
  
export default Login;