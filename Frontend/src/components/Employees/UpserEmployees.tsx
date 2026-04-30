import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { upsertEmployee } from "../../api/apiServices/employeeService";
import { listDepartments } from "../../api/apiServices/departmentService";
import { toast } from "react-toastify";

const UpsertEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state;

  const [departments, setDepartments] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    departmentId: "", // ✅ NEW FIELD
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

  // ✅ populate edit
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  // ✅ fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await listDepartments();
      if (res.status === 1) {
        setDepartments(res.data);
      }
    } catch {
      toast.error("Failed to load departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      setTimeout(() => {
        navigate("/employees");
      }, 1000);
    } catch (err: any) {
      toast.error(err || "Submission failed");
    }
  };
// const handleSubmit = async (e: any) => {
//   e.preventDefault();

//   console.log("Sending data:", formData); // 🔥 debug

//   // basic validation
//   if (!formData.name || !formData.email) {
//     toast.error("Name and Email are required");
//     return;
//   }

//   try {
//     const res = await upsertEmployee(formData);

//     console.log("Response:", res); // 🔥 debug

//     if (res.status === 1) {
//       toast.success(res.msg);

//       setTimeout(() => {
//         navigate("/employees");
//       }, 1000);
//     } else {
//       toast.error(res.msg || "Something went wrong");
//     }

//   } catch (err: any) {
//     console.error("Error:", err); // 🔥 debug

//     toast.error(err?.response?.data?.msg || "Submission failed");
//   }
// };
  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      {/* <form className="w-full max-w-4xl bg-white p-8 rounded-xl space-y-8 shadow"> */}
      <form
  onSubmit={handleSubmit}
  className="w-full max-w-4xl bg-white p-8 rounded-xl space-y-8 shadow"
>
<h2 className="text-2xl font-bold text-center">
    {formData._id ? "Update Employee" : "Add Employee"}
  </h2>
{/* 🔹 BASIC DETAILS */}
<h3 className="font-bold text-lg border-b pb-2">Basic Details</h3>

<div className="grid md:grid-cols-2 gap-4">
  <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
  <input name="email" placeholder="Email" onChange={handleChange} className="input" />
  <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
  <input type="date" name="dob" onChange={handleChange} className="input" />

  <select name="gender" onChange={handleChange} className="input">
    <option value="">Gender</option>
    <option>Male</option>
    <option>Female</option>
    <option>Other</option>
  </select>
</div>

{/* 🔹 JOB DETAILS */}
<h3 className="font-bold text-lg border-b pb-2">Work Details</h3>

<div className="grid md:grid-cols-2 gap-4">

  <select name="departmentId" onChange={handleChange} className="input">
    <option value="">Select Department</option>
    {departments.map(d => (
      <option key={d._id} value={d._id}>{d.name}</option>
    ))}
  </select>

  <input name="jobTitle" placeholder="Job Title" onChange={handleChange} className="input" />

  <select name="employeeType" onChange={handleChange} className="input">
    <option value="">Employee Type</option>
    <option>Full-time</option>
    <option>Part-time</option>
    <option>Intern</option>
  </select>

  <input type="date" name="joiningDate" onChange={handleChange} className="input" />

  <select name="workLocation" onChange={handleChange} className="input">
    <option value="">Work Location</option>
    <option>Office</option>
    <option>Remote</option>
  </select>

  <input name="experience" placeholder="Experience (years)" onChange={handleChange} className="input" />

  <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="input" />

  <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} className="input" />
</div>

{/* 🔹 SALARY */}
<h3 className="font-bold text-lg border-b pb-2">Salary</h3>

<div className="grid md:grid-cols-2 gap-4">
  <input name="salary" placeholder="Salary / CTC" onChange={handleChange} className="input" />

  <select name="paymentType" onChange={handleChange} className="input">
    <option value="">Payment Type</option>
    <option>Monthly</option>
    <option>Hourly</option>
  </select>
</div>

{/* 🔹 ADDRESS */}
<h3 className="font-bold text-lg border-b pb-2">Address</h3>

<div className="grid md:grid-cols-2 gap-4">
  <input name="currentAddress" placeholder="Current Address" onChange={handleChange} className="input" />
  <input name="permanentAddress" placeholder="Permanent Address" onChange={handleChange} className="input" />
  <input name="city" placeholder="City" onChange={handleChange} className="input" />
  <input name="state" placeholder="State" onChange={handleChange} className="input" />
  <input name="pincode" placeholder="Pincode" onChange={handleChange} className="input" />
</div>



{/* 🔹 SUBMIT */}
<button className="w-full bg-blue-600 text-white py-3 rounded">
  Create Employee
</button>

</form>
    </div>
  );
};

export default UpsertEmployee;
