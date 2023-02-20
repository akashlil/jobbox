import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetjobsQuery } from "../features/job/jobApiIn";

const Jobs = () => {
  const { data, isError, isLoading } = useGetjobsQuery();

  return (
    <div className="pt-14 px-8">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Find Jobs</h1>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {data?.data.map((data) => (
          <JobCard key={data._id} jobData={data} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
