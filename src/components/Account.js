import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Account = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccountDetails = async () => {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:8080/account?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                // Pre-populate the fields with the returned data
                setFirstName(data.firstName || '');
                setLastName(data.lastName || '');
                setAddress1(data.address1 || '');
                setAddress2(data.address2 || '');
                setCity(data.city || '');
                setState(data.state || '');
                setZipCode(data.zipCode || '');
                setPhoneNumber(data.phoneNumber || '');
                setEmail(data.email || '');
            } else {
                alert("Failed to fetch account details");
            }
        };
        fetchAccountDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        console.log("fetch userId",userId);
        if (!userId) {
            alert("User not logged in. Please log in to continue.");
            navigate("/login");
            return;
        }
        // setIsLoggedIn(true);
        const response = await fetch("http://localhost:8080/account", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId, firstName, lastName, address1, address2, city, state, zipCode, phoneNumber, email})
        });
        const status = response.status;
        const responseJson = await response.json();
        console.log("responseJson", responseJson);
        if (status === 201) {
            alert("Update Successful")
            navigate("/");
        } else {
            alert("Problem with Account POST");
        }
    };
    return (
        <>
            <div className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        <p><a href="/">About</a></p>
                    </div>

                    <div className="col-sm-8 text-left">
                        <h1>Create Account</h1>
                        <form className="account-form" action="/submit_account" method="POST" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name:</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address1">Address Line 1:</label>
                                <input
                                    type="text"
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address2">Address Line 2:</label>
                                <input
                                    type="text"
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    // required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City:</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State:</label>
                                <select className="form-control" id="state" value={state}
                                        onChange={(e) => setState(e.target.value)} required>
                                    <option value="" disabled selected>Select your state</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipCode">Zip Code:</label>
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number:</label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {/*<div className="form-group">*/}
                            {/*    <label htmlFor="email">Email:</label>*/}
                            {/*    <input type="email" className="form-control" id="email" name="email" required/>*/}
                            {/*</div>*/}
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary btn-custom">Submit</button>
                                <button type="reset" className="btn btn-danger btn-custom">Reset</button>
                            </div>
                        </form>
                    </div>

                    <div className="col-sm-2 sidenav">
                        <div className="well">
                            <p>Learn more about our amazing Banana Bread! Join us at Banana Bread Co</p>
                        </div>
                        <div className="well">
                            <p>Did you know Banana's appeared in the U.S. in 1870?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Account;