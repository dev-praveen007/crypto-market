import React from "react";
import Lottie from "lottie-react";
import Loader from '../Assets/loader.json';

export const PageLoader = () => {

    return (
        <>
            <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center " >
                <Lottie animationData={Loader} loop style={{ width: "10%" }} />
            </div>
        </>
    )
}