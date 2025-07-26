import { Link } from "react-router-dom";

const VerifySuccess = () => {
    return (
        <>
            <h2 style={{ margin: "100px", textAlign: "center" }}>
                Email verified successfully ✅
            </h2>
            <div className="d-flex justify-content-center">
                <li className="nav-item list-unstyled">
                    <Link
                        className="btn btn-success px-4 py-2"
                        to="/signin"
                    >
                        Login
                    </Link>
                </li>
            </div>
        </>
    );
};

export default VerifySuccess;
