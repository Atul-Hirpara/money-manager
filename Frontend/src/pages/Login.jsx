
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { AppContext } from "../cotext/AppContext";
import { assets } from "../assets/assets";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {setUser} = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        if(!validateEmail(email)){
            setError("Please enter valid email address");
            setIsLoading(false);
            return;
        }
        
        if(!password.trim()){
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        setError("");

        // LOGIN API CALL
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            }); 
            const {token, user} = response.data;
            if(token){
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }
            else{
                console.error("Something went wrong" , error);
                setError(error.message);
            }
            
        }
        finally{
            setIsLoading(false);
        }
    }


    return (
    <>
        <div className="min-h-screen flex bg-[#FAFBFC]">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden bg-[#2A1144]">

                {/* Background Shape 1 */}
                <div
                    className="absolute inset-0 opacity-80"
                    style={{
                        clipPath: "polygon(0 0, 45% 0, 78% 100%, 0% 100%)",
                        background: "linear-gradient(180deg,#4B1F74 0%, #5A1B67 100%)",
                    }}
                ></div>

                {/* Background Shape 2 */}
                <div
                    className="absolute top-0 right-0 w-[42%] h-full opacity-90"
                    style={{
                        clipPath: "polygon(30% 0,100% 0,100% 100%,0 100%)",
                        background: "linear-gradient(180deg,#8F1D63 0%, #B22055 100%)",
                    }}
                ></div>

                {/* Background Shape 3 */}
                <div
                    className="absolute bottom-0 left-0 w-40 h-40 bg-[#1B0C2D]"
                    style={{
                        clipPath: "polygon(0 100%,100% 100%,0 0)",
                    }}
                ></div>

                <div className="absolute top-16 left-20 w-72 h-72 rounded-full bg-violet-500/10 blur-[140px]"></div>

                <div className="relative z-10 flex flex-col justify-center px-16 text-white w-full">

                    <div className="mb-12">
                        <h1 className="text-5xl font-bold leading-tight">
                        Money <br /> Manager
                        </h1>

                        <p className="mt-6 text-lg text-violet-100 max-w-md leading-8">
                        Track income, manage expenses and build better financial habits from one beautiful dashboard.
                        </p>
                    </div>

                    {/* floating dashboard preview */}
                    <div className="relative h-80">

                        <div className="float-card-one absolute top-0 left-0 w-80 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl rotate-[-3deg]">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-violet-100 text-sm">Total Balance</p>
                                    <h3 className="text-3xl font-bold mt-1">₹84,200</h3>
                                </div>
                                <div className="bg-emerald-400/20 text-emerald-200 text-xs px-2 py-1 rounded-full">
                                    +12.4%
                                </div>
                            </div>

                            <div className="mt-6 h-28 rounded-2xl bg-white/5 flex items-end justify-between px-3 pb-3">
                                <div className="w-8 bg-violet-300 rounded-full h-10"></div>
                                <div className="w-8 bg-violet-300 rounded-full h-16"></div>
                                <div className="w-8 bg-violet-300 rounded-full h-24"></div>
                                <div className="w-8 bg-violet-300 rounded-full h-20"></div>
                                <div className="w-8 bg-violet-300 rounded-full h-14"></div>
                            </div>
                        </div>

                        <div className="float-card-two absolute bottom-8 right-6 w-64 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl rotate-2">
                            <div className="flex items-center justify-between">
                                <span className="text-violet-100 text-sm">Income</span>
                                <span className="text-emerald-300 text-sm font-semibold">+₹18,500</span>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <div className="flex-1 h-2 bg-emerald-400 rounded-full"></div>
                                <div className="w-10 h-2 bg-white/20 rounded-full"></div>
                            </div>

                            <p className="text-xs text-violet-100 mt-3">Updated today</p>
                        </div>

                    </div>

                </div>
            </div>

        
            {/* RIGHT SIDE */}
            <div className="w-full lg:w-[52%] flex justify-center items-center px-6 py-8">

                <div className="w-full max-w-md">

                    {/* Heading */}
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-slate-900">
                            Welcome Back
                        </h2>

                        <p className="text-slate-600 mt-3 leading-7">
                            Sign in to continue managing your income, expenses and financial goals.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* INPUTS */}
                        <div className="space-y-5">

                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="Enter your email"
                                type="email"
                            />

                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                            />

                        </div>

                        {/* ERROR */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        {/* SUBMIT */}
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-violet-700 hover:bg-violet-800 transition-all duration-300 rounded-xl py-3.5 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer shadow-lg shadow-violet-500/20"
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="w-5 h-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                        {/* Divider */}
                        <div className="space-y-2">

                            <div className="flex items-center gap-4">
                                <hr className="flex-1 border-slate-200" />
                                <span className="text-slate-500 text-sm font-medium">
                                    OR
                                </span>
                                <hr className="flex-1 border-slate-200" />
                            </div>

                            {/* SIGNUP */}
                            <p className="text-center text-md text-slate-600">
                                Don't have an account?

                                <Link
                                    to="/signup"
                                    className="text-violet-700 font-semibold ml-2 hover:underline"
                                >
                                    Create Account
                                </Link>
                            </p>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    </>
);

}

export default Login;