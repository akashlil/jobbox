import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import candidate from "../../assets/candidate.svg";
import employer from "../../assets/employer.svg";
import CandidateRegistration from "./CandidateRegistration";
import EmployerRegistration from "./EmployerRegistration";

const AccountCreator = () => {
  console.log("duble");
  const {
    user: { role },
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { type } = useParams();

  if (type === "candidate") {
    return <CandidateRegistration />;
  }

  if (type === "employer") {
    return <EmployerRegistration />;
  }

  function handerRegisterCandidate() {
    if (role === "candidate") {
      toast.info("Your are alrady candidate register", {
        autoClose: 2000,
        position: "top-center",
      });
    } else if (role === "employer") {
      toast.info("Your are alrady employer register", {
        autoClose: 2000,
        position: "top-center",
      });
    } else {
      navigate("/register/candidate");
    }
  }

  function handerRegisterEmployer() {
    if (role === "employer") {
      toast.info("Your are alrady employer register", {
        autoClose: 2000,
        position: "top-center",
      });
      return;
    } else if (role === "candidate") {
      toast.info("Your are alrady candidate register", {
        autoClose: 2000,
        position: "top-center",
      });
      return;
    } else {
      navigate("/register/employer");
    }
  }

  return (
    <div className="h-screen pt-14">
      <h1 className="text-center my-10 text-2xl">Continue as ...</h1>
      <div className="flex justify-evenly ">
        <div
          onClick={() => handerRegisterCandidate()}
          className="flex flex-col justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group"
        >
          <img className="h-5/6" src={candidate} alt="" />
          <p className="text-center text-3xl">Candidate</p>
        </div>
        <div
          onClick={() => handerRegisterEmployer()}
          className="flex flex-col justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group"
        >
          <img className="h-[77%]" src={employer} alt="" />
          <p className="text-center text-3xl">Employer</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCreator;
