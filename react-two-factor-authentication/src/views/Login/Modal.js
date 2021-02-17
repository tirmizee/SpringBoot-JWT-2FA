import React from 'react'
import './Modal.scss'

const Modal = ({otp, otpExpire, isOpen, refId, onChange, onSend, lodding}) => {

    const toMinute = (secondTime) => {
        let minute =  Math.floor(secondTime / 60);
        let second = secondTime % 60;
        return minute + ':' + leftPad(second, 2);
    }

    const leftPad = (str, max) => {
        str = str.toString();
        return str.length < max ? leftPad("0" + str, max) : str;
      }

    return (
        !isOpen ? null :
        <section className="modal-container">
            <div className="modal">
                <h1>Verify Security Code : <i>{refId}</i></h1>
                <p>expires <strong>{toMinute(otpExpire)}</strong> minute</p>
                <div className="input-otp">
                    <input 
                        disabled={lodding}
                        type="text" 
                        name="otp"
                        value={otp}
                        onChange={onChange}
                        placeholder="______"/>
                    </div>
                    
                <button className="otp-btn" onClick={onSend} disabled={lodding}>{ lodding ? 'Send...' : 'Send' }</button>
            </div>
        </section> 
    );
}

export default Modal;