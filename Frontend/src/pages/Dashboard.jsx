import { Balance } from "../components/Balance"
import { Navbar } from "../components/Navbar"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return <div>
        <Navbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}