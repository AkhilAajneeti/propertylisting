import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IoBriefcase, IoLocationSharp } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { getJobById, submitJobApplication } from "../api/jobApi";
const JobDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    resume: null,
  });

  // Fetch job detail by ID
  useEffect(() => {
    getJobById(id)
      .then((data) => {
        setJob(data);
      })
      .catch((err) => console.log("Error fetching jobs:", err));
  }, [id]);

  // Handle text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("name", formData.name);
    sendData.append("email", formData.email);
    sendData.append("mobile", formData.mobile);
    sendData.append("job_posting", id);
    sendData.append("job_title", job.title);
    sendData.append("resume", formData.resume);

    try {
      await submitJobApplication(sendData);
      toast.success("Application Submitted Successfully 🎉");
      setTimeout(() => navigate("/thankyou"), 1500);
    } catch (err) {
      console.error("Error submitting application", err);
      toast.error("❌ Something went wrong! Please try again.");
    }
  };

  if (!job) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div>
      <ToastContainer />

      {/* Banner */}
      <div
        className="text-white text-center py-5"
        style={{
          background: "linear-gradient(182deg, #c80a17 13%, #000000) 45%",
        }}
      >
        <h1 className="fw-bold">{job.title}</h1>
        <div className="row text-center mb-4">
          <div className="col-12 d-flex justify-content-center gap-4">
            <div className="d-flex align-items-center gap-2">
              <FaUserTie /> <p className="mb-0">{job.experience}</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <IoLocationSharp /> <p className="mb-0">{job.location}</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <IoBriefcase /> <p className="mb-0">Full Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-sm-6">
            <h4 className="fw-bold text-gradient">Job Description</h4>
            <div dangerouslySetInnerHTML={{ __html: job.description }} />

            <h4 className="fw-bold mt-4">Required Skills</h4>
            <div dangerouslySetInnerHTML={{ __html: job.requirements }} />

            <h4 className="fw-bold mt-4">
              Salary: <span className="salary">{job.salary}</span>
            </h4>
          </div>

          <div className="col-sm-6 d-flex justify-content-center">
            <div className="ContactForm">
              <h4 className="fw-bold mb-4">Apply Now</h4>

              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Upload Resume</label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                  />
                </div>

                <div className="col-12">
                  <button className="applyBTN" type="submit">
                    Apply Now <FaTelegramPlane />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
