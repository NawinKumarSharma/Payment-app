import React, { useEffect, useState } from "react";
import { Balance } from "../components/Balance";
import { Navbar } from "../components/Navbar";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setBalance(response.data.balance);
        })
        .catch(error => {
            console.error('Error fetching balance:', error.message);
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="m-8">
                <Balance value={balance} /> 
                <Users />
            </div>
        </div>
    );
};
