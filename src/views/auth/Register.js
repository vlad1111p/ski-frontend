import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("TRAINER");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, password, role}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(
                    errorData.name || errorData.email || errorData.password || "Registration failed"
                );
                return;
            }
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 2000);
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            window.location.href = "http://localhost:8080/api/auth/google-authorize?redirect_uri=http://localhost:8080/api/auth/google-callback";
        } catch (err) {
            console.error("Failed to initiate Google login:", err);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-sm font-bold">
                                        Sign up with
                                    </h6>
                                </div>
                                <div className="btn-wrapper text-center">
                                    <button
                                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleGoogleSignUp}
                                    >
                                        <img
                                            alt="..."
                                            className="w-5 mr-1"
                                            src={require("assets/img/google.svg").default}
                                        />
                                        Google
                                    </button>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300"/>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onSubmit={handleRegister}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="name"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="role"
                                        >
                                            Role
                                        </label>
                                        <select
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        >
                                            <option value="TRAINER">Trainer</option>
                                            <option value="PARTICIPANT">Participant</option>
                                        </select>
                                    </div>
                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Register
                                        </button>
                                    </div>
                                    {error && (
                                        <div className="text-red-500 text-center mt-3">{error}</div>
                                    )}
                                    {success && (
                                        <div className="text-green-500 text-center mt-3">
                                            {success}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <Link to="/auth/login" className="text-blueGray-200">
                                    <small>Already have an account? Log in</small>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}