import { useEffect, useState } from "react";
import axios from "axios";
import AddEditModal from "./components/AddEditModal";
import ConfirmDelete from "./components/ConfirmDelete";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default function CurrencyPage() {
  // State variables
  const [currencies, setCurrencies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    id: null,
    country: "",
    name: "",
    symbol: "",
    internal_id: "",
    value: "",
    current_value: "",
  });

  // Fetch currencies from API
  const fetchCurrencies = async () => {
    const res = await api.get("/user/currency/");
    const data = Array.isArray(res.data) ? res.data : res.data.results || [];
    setCurrencies(data);
    console.log("Fetched currencies:", data);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  //fetch country options
  const countryOptions = [
    ...new Map(
      currencies
        .filter((c) => c.country_data)
        .map((c) => [c.country, c.country_data])
    ).values(),
  ];
// Handlers for Add, Edit, Delete
  const handleAdd = () => {
    setFormData({
      id: null,
      country: "",
      name: "",
      symbol: "",
      internal_id: "",
      value: "",
      current_value: "",
    });
    setStep(1);
    setShowModal(true);
  };
//Edit handler
  const handleEdit = (row) => {
    setFormData({
      id: row.id,
      country: row.country,
      name: row.name,
      symbol: row.symbol,
      internal_id: row.internal_id,
      value: row.value,
      current_value: row.current_value,
    });
    setStep(1);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };
//Submit handler
  const handleSubmit = async () => {
    const data = { ...formData };
    delete data.id;

    if (formData.id) {
      await api.put(`/user/currency/${formData.id}/`, data);
    } else {
      await api.post("/user/currency/", data);
    }

    setShowModal(false);
    await fetchCurrencies();
  };
//Delete handler
  const handleDelete = async () => {
    await api.delete(`/user/currency/${deleteId}/`);
    setDeleteId(null);
    await fetchCurrencies();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Currency List</h1>
        {/* // Add Currency Button */}
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Currency
        </button>
      </div>
{/* Currency View Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-3 text-left">Flag</th>
              <th className="border px-4 py-3 text-left">Country</th>
              <th className="border px-4 py-3 text-left">Currency</th>
              <th className="border px-4 py-3 text-left">Symbol</th>
              <th className="border px-4 py-3 text-left">Value</th>
              <th className="border px-4 py-3 text-left">Actions</th>
            
            </tr>
          </thead>
          <tbody>
            {currencies.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {/* Fetch Country Flag, if not present show dash */}
                  {row.country_data?.image_url ? (
                    <img
                      src={row.country_data.image_url}
                      className="w-8 h-5"
                      alt={row.country_data.long_name}
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="border px-4 py-2">
                  {/* Fetch Country name, if not present show dash */}
                  {row.country_data?.long_name || "—"}
                </td>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">{row.symbol}</td>
                <td className="border px-4 py-2">{row.current_value}</td>
                

                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    {/* // Action Buttons: Edit and Delete */}
                    <button
                      onClick={() => handleEdit(row)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(row.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <AddEditModal
        open={showModal}
        formData={formData}
        countryOptions={countryOptions}
        step={step}
        onClose={() => setShowModal(false)}
        onChange={handleChange}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />

      {/* Delete Modal */}
      {deleteId && (
        <ConfirmDelete
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}