import { FiUser } from 'react-icons/fi'; // Import user icon from react-icons library

export const Navbar = () => {
    return (
        <div className="bg-gray-800 text-white shadow-md h-16 flex justify-between items-center px-4">
            <div className="text-xl font-semibold">Payment App</div>
            <div className="flex items-center">
                <div className="mr-4 flex items-center">
                    <span className="mr-2">Hello</span>
                    <FiUser className="text-xl" />
                </div>
                <div className="rounded-full h-10 w-10 bg-gray-500 flex justify-center items-center">
                    👋
                </div>
            </div>
        </div>
    );
}
