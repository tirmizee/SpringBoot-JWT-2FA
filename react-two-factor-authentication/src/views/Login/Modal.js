import React from 'react'
import './Modal.scss'

const toMinute = (secondTime) => {
    let minute =  Math.floor(secondTime / 60);
    let second = secondTime % 60;
    return minute + ':' + leftPad(second, 2);
}

const leftPad = (str, max) => {
    str = str.toString();
    return str.length < max ? leftPad("0" + str, max) : str;
}

const Modal = ({
    otp, 
    otpExpire, 
    isOpen, 
    refId, 
    onChange, 
    onSend, 
    lodding, 
    error
}) => {

    const {isError = false, message = ''} = error || {};

    return (
        !isOpen ? null :
        <section className="modal-container">
            <div className="modal">
                <h1>Verify Security Code : <i>{refId}</i></h1>
                <p>expires <strong>{toMinute(otpExpire)}</strong> minute</p>
                <small>please check your email</small>
                <div className="input-otp">
                    <input 
                        disabled={lodding}
                        type="text" 
                        name="otp"
                        value={otp}
                        onChange={onChange}
                        placeholder="______"/>
                    </div>
                <small class="error">ddd</small>
                <button className="otp-btn" onClick={onSend} disabled={lodding}>{ lodding ? 'Send...' : 'Send' }</button>
            </div>
        </section> 
    );
}

export default Modal;