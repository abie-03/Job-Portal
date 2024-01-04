import React from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const UpdateJob = () => {
  const { id } = useParams();
  const {
    _id,
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    companyLogo,
    employmentType,
    description,
    postedBy,
    skills,
  } = useLoaderData();
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    //console.log(data)
    fetch(`http://localhost:5000/update-job/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert("Job Updated Successfully");
        }
        reset();
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10px px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={jobTitle}
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name </label>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                defaultValue={companyName}
                {...register("companyName")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              />
            </div>
          </div>

          <div className=" flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="$2ok"
                defaultValue={minPrice}
                {...register("minPrice")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary </label>
              <input
                type="text"
                placeholder="$120k"
                defaultValue={maxPrice}
                {...register("maxPrice")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              />
            </div>
          </div>

          <div className=" flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                {...register("salaryType")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              >
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location </label>
              <input
                type="text"
                placeholder="Ex: New York"
                defaultValue={jobLocation}
                {...register("jobLocation")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              />
            </div>
          </div>

          <div className=" flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date </label>
              <input
                type="date"
                placeholder="Ex: 2023-11-03"
                defaultValue={postingDate}
                {...register("postingDate")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              >
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="NoExperience">No Experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets: </label>
            <CreatableSelect
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6 py-4"
              defaultValue={skills}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          <div className=" flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo </label>
              <input
                type="url"
                placeholder="Paste your company logo URR: https://weshare.com/img1"
                defaultValue={companyLogo}
                {...register("companyLogo")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employementType")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
              >
                <option value={employmentType}>{employmentType}</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="Temporary">Temporary </option>
              </select>
            </div>
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              defaultValue={description}
              placeholder="Job Description"
              {...register("description")}
            />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              defaultValue={postedBy}
              placeholder="Your email"
              {...register("postedBy")}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outine-none sm:text-sm sm-leading-6"
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
