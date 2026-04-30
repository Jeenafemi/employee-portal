
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { upsertEmployee } from "../../api/apiServices/employeeService";
import { toast } from "react-toastify";

const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state; 

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    experience: "",
    reactExperience: "",
    gender: "",
    resume: "",
    coverLetter: "",
    immediate: "",
    startDate: "",
    hired: false,
  });

  // ✅ populate on edit
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          resume: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await upsertEmployee(formData);

      toast.success(res.msg);

      // ✅ redirect after save
      setTimeout(() => {
        navigate("/employees");
      }, 1000);

    } catch (err: any) {
      toast.error(err || "Submission failed");
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <form
        className="w-full max-w-2xl bg-white p-8 rounded-xl space-y-6 shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">
          {formData._id ? "Update Employee" : "Add Employee"}
        </h2>

        {/* Name + Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="input" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="input" />
        </div>

        {/* Phone */}
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input" />

        {/* Experience */}
        <select name="experience" value={formData.experience} onChange={handleChange} className="input">
          <option value="">Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2">1-2 years</option>
          <option value="3-5">3-5 years</option>
        </select>

        {/* React Experience */}
        <textarea name="reactExperience" value={formData.reactExperience} onChange={handleChange} placeholder="React Experience" className="input" />

        {/* Resume */}
        <input type="file" onChange={handleFileChange} className="input" />

        {/* Start Date */}
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input" />

        {/* Submit */}
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          {formData._id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Form;
