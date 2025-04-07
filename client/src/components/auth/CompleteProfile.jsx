import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5555";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [newCollege, setNewCollege] = useState("");
  const [newBranch, setNewBranch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [photo, setPhoto] = useState(null);
  const [idDoc, setIdDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingCollege, setIsAddingCollege] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .post(`${BACKEND_URL}/verifytoken`, { token })
      .then((res) => {
        if (res.data.profileCompleted) navigate("/");
        else setLoading(false);
      })
      .catch(() => setLoading(false));

    axios
      .get(`${BACKEND_URL}/colleges`)
      .then((res) => setColleges(res.data))
      .catch((err) => console.error("Fetching colleges failed:", err));
  }, [navigate]);

  const handleCollegeChange = (e) => {
    const selected = e.target.value;
    setSelectedCollege(selected);
    const college = colleges.find((c) => c.name === selected);
    setBranches(college ? college.branches : []);
    setSelectedBranch("");
  };

  const handleAddCollegeOrBranch = async () => {
    if (isAddingCollege && (!newCollege || !newBranch)) {
      return alert("Enter both college and branch!");
    }

    if (!isAddingCollege && (!selectedCollege || !newBranch)) {
      return alert("Select a college and enter branch!");
    }

    try {
      const response = isAddingCollege
        ? await axios.post(`${BACKEND_URL}/addcollege`, {
            name: newCollege,
            branch: newBranch,
          })
        : await axios.post(`${BACKEND_URL}/addbranch`, {
            college: selectedCollege,
            branch: newBranch,
          });

      const updatedColleges = isAddingCollege
        ? [...colleges, response.data]
        : colleges.map((c) =>
            c.name === response.data.name ? response.data : c
          );

      setColleges(updatedColleges);
      setSelectedCollege(response.data.name);
      setBranches(response.data.branches);
      setSelectedBranch(newBranch);
      setNewCollege("");
      setNewBranch("");
      setIsAddingCollege(false);
      alert("Added successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleSubmit = async () => {
    if (
      !selectedCollege ||
      !selectedBranch ||
      !graduationYear ||
      !photo ||
      !idDoc
    ) {
      return alert("Please fill all fields and upload both files.");
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("collegeName", selectedCollege);
      formData.append("branch", selectedBranch);
      formData.append("graduationYear", graduationYear);
      formData.append("photo", photo);
      formData.append("idDoc", idDoc);

      await axios.post(`${BACKEND_URL}/completeprofile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile completed!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-lg font-semibold">Loading...</div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        Complete Your Profile
      </h2>

      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-gray-700">College Info</span>
        <button
          className="text-blue-600 text-sm underline"
          onClick={() => {
            setIsAddingCollege(!isAddingCollege);
            setNewCollege("");
            setNewBranch("");
          }}
        >
          {isAddingCollege ? "Back to selection" : "Add new college/branch"}
        </button>
      </div>

      {isAddingCollege ? (
        <>
          <input
            type="text"
            placeholder="New College Name"
            value={newCollege}
            onChange={(e) => setNewCollege(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="New Branch"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleAddCollegeOrBranch}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add College & Branch
          </button>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              College Name
            </label>
            <input
              list="collegeList"
              value={selectedCollege}
              onChange={(e) => {
                setSelectedCollege(e.target.value);
                const selected = colleges.find(
                  (c) => c.name === e.target.value
                );
                setBranches(selected ? selected.branches : []);
                setSelectedBranch("");
              }}
              placeholder="Search or select your college"
              className="w-full p-2 border rounded shadow-sm"
            />
            <datalist id="collegeList">
              {colleges.map((c) => (
                <option key={c.name} value={c.name} />
              ))}
            </datalist>
          </div>

          <div className="space-y-2 mt-4">
            <label className="block text-gray-700 font-medium">Branch</label>
            <input
              list="branchList"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              placeholder="Search or select your branch"
              className="w-full p-2 border rounded shadow-sm"
              disabled={!selectedCollege}
            />
            <datalist id="branchList">
              {branches.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </div>

          <div className="space-y-2 mt-4">
            <label className="block text-gray-700 font-medium">
              Add New Branch (Optional)
            </label>
            <input
              type="text"
              placeholder="Type to add new branch"
              value={newBranch}
              onChange={(e) => setNewBranch(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAddCollegeOrBranch}
              className="w-full mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Add Branch
            </button>
          </div>



          <div className="space-y-2 mt-6">
            <label className="block text-gray-700 font-medium">
              Graduation Year
            </label>
            <select
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full p-2 border rounded bg-white shadow-sm"
            >
              <option value="">Select your graduation year</option>
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>


          <div className="space-y-2 mt-4">
            <label className="block text-gray-700 font-medium">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2 mt-4">
            <label className="block text-gray-700 font-medium">
              Upload ID Document
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setIdDoc(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Profile"}
          </button>
        </>
      )}
    </div>
  );


};

export default CompleteProfile;
