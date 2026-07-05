
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        if(!fullName.trim()){
            setError("Please enter your full name");
            setIsLoading(false);
            return;
        }
        
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

        // signup api call
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
            });
            if(response.status === 201){
                toast.success("Profile created successfully");
                navigate("/login");
            }
        } catch (err) {
            console.error("something went wrong" , err);
            setError(err.message);
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <>
        
        <div className="h-screen w-full relative flex items-center justify-center overfloew-hidden">
            {/* Background image with blur */}
            <img src="#" alt="Background" />

            <div className="relative z-10 w-full max-w-lg px-6">

                 <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your spendings by joining with us.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            {/* Profile image */}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Full Name"
                                placeholder="Enter your full Name"
                                type="text" />

                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="Enter your email"
                                type="text" />

                            <div className="col-span-2">
                                <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="e.g, kjsuh5555fr"
                                type="password" />
                            </div>

                        </div>
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`btn-primary w-full py-3 text-lg text-white bg-purple-800 rounded-md font-medium cursor-pointer flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed':''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5"/>
                                    Signing Up...
                                </>
                            ) : (
                                "SIGN UP"
                            )}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Already have an account?
                            <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Login</Link>
                        </p>
                    </form>


                 </div>

            </div>




        </div>
        </>

    )
}

export default Signup;