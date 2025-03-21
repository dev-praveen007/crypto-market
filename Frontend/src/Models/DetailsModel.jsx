import React, { useState, useEffect } from "react";
import isEmpty from "is-empty";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BuyCryptos, getCoinDetails } from "../Actions/Actions";
import { ToastContainer } from "../utils/common";

const CryptoDetails = (props) => {
    const { id, setShowModal, showModal } = props;
    const [crypto, setCrypto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState("")
    const [buyModal, setBuyModal] = useState(false)

    const fetchCryptoDetails = async () => {
        try {
            const response = await getCoinDetails({ id });
            setCrypto(response?.data);
            console.log("response?.data", response?.data);

        } catch (error) {
            console.error("Error fetching crypto details:", error);
        }
        setLoading(false);
    };

    const buyCrypto = async () => {
        if (isEmpty(quantity)) return ToastContainer("error", "Enter quantity");

        const resp = await BuyCryptos({ crypto: id, qty: quantity, price: Number(crypto.market_data.current_price.usd || 0) * quantity, symbol: crypto.symbol });
        ToastContainer(resp?.status, resp?.message);
        if (resp?.status === "success") {
            setBuyModal(false)
            setShowModal()
        }
    }

    useEffect(() => {
        if (!isEmpty(id)) {
            fetchCryptoDetails();
        }
        return () => setCrypto(null)
    }, [id]);

    if (loading) return <p className="text-center text-muted">Loading details...</p>;
    if (!crypto) return <p className="text-center text-danger">Currency not found</p>;

    return (
        <div className="container mt-5">
            {/* {crypto &/& */}
            <Modal show={showModal} onHide={setShowModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{crypto?.name} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <img src={crypto.image.large} alt={crypto.name} className="mx-auto d-block mb-3" width={80} />
                        {/* <p>{crypto?.description?.en}</p> */}
                        <p><strong>Symbol:</strong> {crypto.symbol.toUpperCase()}</p>
                        <p><strong>Current Price:</strong> ${crypto.market_data.current_price.usd.toLocaleString()}</p>
                        <p><strong>Market Cap:</strong> ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
                        <p><strong>Total Supply:</strong> {crypto.market_data.total_supply?.toLocaleString() || "N/A"}</p>
                        <p><strong>Max Supply:</strong> {crypto.market_data.max_supply?.toLocaleString() || "N/A"}</p>
                        <p><strong>All-Time High:</strong> ${crypto.market_data.ath.usd.toLocaleString()}</p>
                        <p><strong>Genesis Date:</strong> {crypto.genesis_date}</p>
                        {/* <p><strong>Description:</strong> {crypto.description.en}</p> */}
                        <p><strong>Website:</strong> <a href={crypto.links.homepage[0]} target="_blank" rel="noopener noreferrer">{crypto.links.homepage[0]}</a></p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setBuyModal(true)}>Buy</Button>
                    <Button variant="secondary" onClick={setShowModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={buyModal} onHide={() => setBuyModal(false)} size="sm">
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
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button className="btn btn-primary w-100 mt-3" onClick={() => buyCrypto()}>
                            Buy
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};


export default CryptoDetails