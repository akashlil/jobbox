import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import { useGetApplyJobListQuery } from "../../features/job/jobApiIn";

const ApplyList = () => {
  const {
    user: { role, email },
  } = useSelector((state) => state.auth);

  const { data, isError } = useGetApplyJobListQuery(email);
  return (
    <div className="p-5 gap-5">
      {data?.data?.map((datas) => (
        <JobCard jobData={datas}></JobCard>
      ))}
    </div>
  );
};

export default ApplyList;
