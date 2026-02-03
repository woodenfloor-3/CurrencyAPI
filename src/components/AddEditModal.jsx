export default function AddEditModal({
  open,
  formData,
  countryOptions,
  step,
  onClose,
  onChange,
  onNext,
  onBack,
  onSubmit,
}) {
  if (!open) return null;
//Add Validation
  const isStep1Valid = formData.country && formData.name && formData.symbol && formData.internal_id;
  const isStep2Valid = formData.value && formData.current_value;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {formData.id ? "Edit Currency" : "Add Currency"}
        </h3>
{/* Add Step Form  */}
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={onChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Country</option>
                {countryOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.long_name} ({c.abbreviation})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Currency Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="e.g., US Dollar"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Symbol <span className="text-red-500">*</span>
              </label>
              <input
                name="symbol"
                value={formData.symbol}
                onChange={onChange}
                placeholder="e.g., $"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Internal ID <span className="text-red-500">*</span>
              </label>
              <input
                name="internal_id"
                value={formData.internal_id}
                onChange={onChange}
                placeholder="e.g., USD"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
{/* // Step 2 Form */}
        {step === 2 && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Value Key <span className="text-red-500">*</span>
              </label>
              <input
                name="value"
                value={formData.value}
                onChange={onChange}
                placeholder="Value identifier"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
{/* // Current Value Form */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Value <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="current_value"
                value={formData.current_value}
                onChange={onChange}
                placeholder="e.g., 1.00"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
{/* // Buttons */}
        <div className="flex justify-between mt-6">
          <div>
            {step === 2 && (
              <button
                onClick={onBack}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Back
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>

            {step === 1 ? (
              <button
                onClick={onNext}
                disabled={!isStep1Valid}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={onSubmit}
                disabled={!isStep2Valid}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {formData.id ? "Update" : "Create"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}