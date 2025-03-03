import { useEffect } from "react";
import { API_BASE_URL } from "../utils/Api";

const PayUPayment = ({ setToggle, form, hash, transactionId }) => {
    useEffect(() => {
        // Automatically submit the form when the component mounts
        document.getElementById("payu-form").submit();
    }, []);
    console.log(transactionId)

    return (
        <form id="payu-form" action="https://test.payu.in/_payment" method="post">
            <input type="hidden" name="key" value="A00Ozq" />
            <input type="hidden" name="txnid" value={transactionId} />
            <input type="hidden" name="productinfo" value={form?.productinfo} />
            <input type="hidden" name="amount" value={form?.amount} />
            <input type="hidden" name="email" value={form?.email} />
            <input type="hidden" name="firstname" value={form?.firstname} />
            <input type="hidden" name="lastname" value="" />
            <input type="hidden" name="surl" value={`${API_BASE_URL}/auth/user/success`} />
            <input type="hidden" name="furl" value={`${API_BASE_URL}/auth/user/failure`} />
            <input type="hidden" name="phone" value={form?.phone} />    
            {/* <input type="hidden" name="udf1" value={"14"} />    
            <input type="hidden" name="udf2" value={"someRandomDetail"} />     */}
            <input type="hidden" name="hash" value={hash} />
            {/* Optionally, hide the submit button since we're submitting programmatically */}
            <input type="submit" value="Submit" style={{ display: "none" }} />
        </form>
    );
};

export default PayUPayment;