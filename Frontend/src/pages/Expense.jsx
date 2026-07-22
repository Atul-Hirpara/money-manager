
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";
import Model from "../components/Model";
import { Plus, Trophy } from "lucide-react";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";

function Expense() {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    // fetch expense details from the API
    const fetchExpenseDetails = async () => {
        if(loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);
            if(response.status === 200){
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch expense details:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch expense details');
        } finally {
            setLoading(false);
        }

    }

    // fetch categories for expense
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if(response.status === 200){
                setCategories(response.data);
            }
        } catch (error) {
            console.log('Failed to fetch expense categories:', error);
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    }

    // save the expense details
    const handleAddExpense = async (expense) => {
        const {name, amount, date, icon, categoryId} = expense;

        // validation
        if(!name.trim()){
            toast.error("Please enter a name");
            return;
        }

        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if(!date){
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if(date > today){
            toast.error('Date cannot be in the future');
            return;
        }

        if(!categoryId){
            toast.error("Please select a category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            });

            if(response.status === 201){
                setOpenAddExpenseModel(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            console.log('Error adding expense', error);
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    }

    // delete expense details
    const deleteExpense = async (id) => {
       
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.log('Error deleting expense', error);
            toast.error(error.response?.data?.message || "Failed to delete expense");
        } 

    }

    // download expense details
    const handleDownloadExpenseDetails = async () => {
          
        if (expenseData.length === 0) {
            toast.error("No expense records available to download.");
            return;
        }

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {responseType: "blob"});
            let filename = "expense_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download expense details successfully");
        } catch (error) {
            console.log('Error downloading expense details:', error);
            toast.error(error.response?.data?.message || "Failed to download expenses");
        } 
    }

    // email expense details
    const handleEmailExpenseDetails = async () => {
    
        if (expenseData.length === 0) {
            toast.error("No expense records available to email.");
            return;
        }

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if(response.status === 200){
                toast.success("Expense details emailed successfully");
            }
        } catch (error) {
            console.log('Error emailing expense details:', error);
            toast.error(error.response?.data?.message || "Failed to email expense");
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);


    return(
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* overview for expense with line chart*/}
                        <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModel(true)}/>
                    </div>

                    <ExpenseList 
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />

                    {/* Add expense model */}
                    <Model
                        isOpen={openAddExpenseModel}
                        onClose={() => setOpenAddExpenseModel(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        
                        />
                    </Model>

                    {/* Delete expense Model */}
                    <Model
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure want to delete this expense details?"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        
                        />
                    </Model>


                </div>
            </div>
        </Dashboard>
    )
}

export default Expense;