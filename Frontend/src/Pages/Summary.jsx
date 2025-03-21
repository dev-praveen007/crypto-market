import React, { useState, useEffect } from "react";

/** Models */
import CryptoDetails from "../Models/DetailsModel";
import { useSelector } from "react-redux";
import { getMarketPrice, getUserHoldings, SellCryptos } from "../Actions/Actions";
import { PageLoader } from "../Components/PageLoader";
import { MdLogout } from "react-icons/md";
import { isEmpty, ToastContainer } from "../utils/common";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";


const PortfolioSummary = () => {
    const [cryptoList, setCryptoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [userHoldings, setUserHoldings] = useState([]);
    const [sellModal, setsellModal] = useState(false);
    const [quantity, setQuantity] = useState("")


    const { userData } = useSelector(state => state?.user);

    const navigate = useNavigate()
    const fetchCryptoData = async () => {
        setLoading(true);
        try {
            const response = await getMarketPrice({ page });
            setCryptoList(response?.data);
        } catch (error) {
            console.error("Error fetching crypto data:", error);
        }
        setLoading(false);
    };

    const fetchHoldings = async () => {
        const resp = await getUserHoldings();
        setUserHoldings(resp?.data || [])
    }

    useEffect(() => {
        fetchCryptoData();
        fetchHoldings();
    }, [page]);

    const handleShowDetails = (crypto) => {
        setSelectedCrypto(crypto);
        setShowModal(true);
    };

    const onLogout = () => {
        ToastContainer("success", "Logged out successfully.")
        localStorage.clear();
        navigate("/")
    }

    const sellCrypto = async () => {
        if (isEmpty(quantity)) return ToastContainer("error", "Enter quantity");

        const resp = await SellCryptos({ crypto: selectedCrypto?._id, qty: quantity, price: 0, symbol: selectedCrypto?.symbol });
        ToastContainer(resp?.status, resp?.message);
        if (resp?.status === "success") {
            setsellModal(false)
            fetchHoldings()
        }
    }

    if (loading) return <PageLoader />;

    return (
        <div className="container mt-5">
            <div className="d-flex flex-row justify-content-between align-items-center " >
                <h5>Hi! {userData?.username}</h5>
                <h2 className="mb-4 text-center fw-bold text-primary">Cryptocurrency Market</h2>
                <h5 className="cursor-pointer" onClick={() => onLogout()} >Logout <MdLogout /></h5>
            </div>

            {userHoldings?.length != 0 &&
                <div className="table-responsive shadow-lg rounded">
                    <h2 className="my-4 text-center fw-bold text-primary">User holdings</h2>
                    <table className="table table-hover text-center align-middle border rounded-3">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Balance</th>
                                <th>Symbol</th>

                            </tr>
                        </thead>
                        <tbody>
                            {userHoldings.map((crypto, index) => (
                                <tr key={crypto.id} className="table-light">
                                    <td className="fw-bold">{index + 1}</td>
                                    <td className="fw-semibold">{crypto._id}</td>
                                    <td className="text-uppercase">{crypto.totalAmount}</td>
                                    <td className="text-uppercase">{crypto.symbol}</td>
                                    <td>
                                        <button onClick={() => { setsellModal(true); setSelectedCrypto(crypto) }} className="btn btn-primary btn-sm">Sell</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}

            <div className="table-responsive shadow-lg rounded">
                <h2 className="my-4 text-center fw-bold text-primary">Current Market Datas</h2>
                <table className="table table-hover text-center align-middle border rounded-3">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Current Price</th>
                            <th>Market Cap</th>
                            <th>24h Change</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptoList?.length != 0 &&
                            cryptoList?.map((crypto, index) => (
                                <tr key={crypto.id} className="table-light">
                                    <td className="fw-bold">{index + 1}</td>
                                    <td><img src={crypto.image} alt={crypto.name} width={40} height={40} className="rounded-circle" /></td>
                                    <td className="fw-semibold">{crypto.name}</td>
                                    <td className="text-uppercase">{crypto.symbol}</td>
                                    <td className="fw-bold text-primary">${crypto.current_price.toLocaleString()}</td>
                                    <td>${crypto.market_cap.toLocaleString()}</td>
                                    <td className={crypto.price_change_percentage_24h >= 0 ? "text-success fw-bold" : "text-danger fw-bold"}>
                                        {crypto.price_change_percentage_24h.toFixed(2)}%
                                    </td>
                                    <td>
                                        <button onClick={() => handleShowDetails(crypto)} className="btn btn-primary btn-sm">View</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* <nav>
                <ul className="pagination justify-content-center mt-4">
                    {Array.from({ length: Math.ceil(cryptoList.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                            <button onClick={() => paginate(i + 1)} className="page-link shadow-sm">
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav> */}
            <div className="d-flex justify-content-end align-items-center my-3 gap-3" >
                <button onClick={() => setPage(page => page - 1)} className="btn btn-primary btn-sm">
                    back
                </button>
                <button onClick={() => setPage(page => page + 1)} className="btn btn-primary btn-sm">
                    next
                </button>
            </div>
            {selectedCrypto && (
                <CryptoDetails
                    id={selectedCrypto.id}
                    setShowModal={() => { setShowModal(false); fetchHoldings(); }}
                    showModal={showModal}
                />
            )}

            {sellModal &&
                <Modal show={sellModal} onHide={() => setsellModal(false)} size="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>Buy {crypto?.name}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <label className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                name="qty"
                                placeholder="Enter quantity"
                                value={quantity}
                                max={selectedCrypto?.totalAmount}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <button className="btn btn-primary w-100 mt-3" onClick={() => sellCrypto()}>
                                Buy
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            }

        </div>
    );
};

export default PortfolioSummary;
