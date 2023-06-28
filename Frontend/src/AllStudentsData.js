import React, { useEffect, useState } from "react";
import axios from "axios";
import app_config from "./config";
import ReactPaginate from "react-paginate";
import "./App.css";

const url = app_config.app_url;

const AllStudentsData = () => {
  const [students, setStudents] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const studentsPerPage = 10;
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("Name");
  const [totalStudents, setTotalStudents] = useState(0);
  const [counts, setCounts] = useState({
    earthivist: 0,
    wellnessChamp: 0,
    chiefAnimalOfficer: 0,
    superEmpowerer: 0,
  });

  useEffect(() => {
    axios
      .get(url + "/allstudents")
      .then((response) => {
        setStudents(response.data);
        calculateCounts(response.data); // Calculate counts for initial data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const calculateCounts = (data) => {
    let earthivistCount = 0;
    let wellnessChampCount = 0;
    let chiefAnimalOfficerCount = 0;
    let superEmpowererCount = 0;

    data.forEach((student) => {
      earthivistCount += student.earthivist;
      wellnessChampCount += student.wellnessChamp;
      chiefAnimalOfficerCount += student.chiefAnimalOfficer;
      superEmpowererCount += student.superEmpowerer;
    });

    setCounts({
      earthivist: earthivistCount,
      wellnessChamp: wellnessChampCount,
      chiefAnimalOfficer: chiefAnimalOfficerCount,
      superEmpowerer: superEmpowererCount,
    });
  };

  const pagesVisited = pageNumber * studentsPerPage;

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
    setPageNumber(0); // Reset page number when school filter changes
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setPageNumber(0); // Reset page number when class filter changes
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setPageNumber(0); // Reset page number when search query changes
  };

  const handleSelectChange = (event) => {
    setSearchType(event.target.value);
    setPageNumber(0); // Reset page number when search type changes
  };

  const filteredDataBySchool = selectedSchool
    ? students.filter((item) => item.schoolName === selectedSchool)
    : students;

  const filteredDataByClass = selectedClass
    ? filteredDataBySchool.filter((item) => item.className === selectedClass)
    : filteredDataBySchool;

  const filteredDataBySearch = filteredDataByClass.filter((item) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const fullNameLower = item.fullName.toLowerCase();
    const emailLower = item.email.toLowerCase();

    if (searchType === "Name") {
      return fullNameLower.includes(searchQueryLower);
    } else if (searchType === "Email") {
      return emailLower.includes(searchQueryLower);
    }

    return false;
  });

  const sortedStudents = filteredDataBySearch.slice(
    pagesVisited,
    pagesVisited + studentsPerPage
  );

  return (
    <>
        <div className="header-name d-flex justify-content-center  mt-4 w-full gap-3 ">
          <input
            type="text"
            className="form-control w-25"
            placeholder={"Search Name or mail"}
            value={searchQuery}
            onChange={handleInputChange}
          />

          <select
            className="form-select w-25"
            value={searchType}
            onChange={handleSelectChange}
          >
            <option value="Name">Name</option>
            <option value="Email">Email</option>
          </select>
          <select
            className="form-select w-25"
            value={selectedSchool}
            onChange={handleSchoolChange}
          >
            <option value="">Select School</option>
            <option value="Indraprastha World School">
              Indraprastha World School
            </option>
            <option value="Jm International School">
              Jm International School
            </option>
            <option value="KIIT World School, Pitampura">
              KIIT World School, Pitampura
            </option>
            <option value="GD Goenka Public School, Sec-22 Rohini">
              GD Goenka Public School, Sec-22 Rohini
            </option>
          </select>
          <select
            className="form-select w-25"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="">Select Class</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11">Class 11</option>

          </select>
        </div>
        <div className="d-flex align-items-center justify-content-evenly flex-wrap gap-2 mt-3">
          <h4>Total Students : {filteredDataByClass.length}</h4>
          {console.log("Ssf",filteredDataByClass.earthivist)}
          {/* <h4>Students In School: {sortedStudents.length}</h4> */}
          <h4>
            Count : {" "}
            {counts.earthivist +
              counts.wellnessChamp +
              counts.chiefAnimalOfficer +
              counts.superEmpowerer}
          </h4>
          <h4>Earthivist : {counts.earthivist}</h4>
          <h4>WellnessChamp : {counts.wellnessChamp}</h4>
           <h4>C.A.O : {counts.chiefAnimalOfficer}</h4>
           <h4>SuperEmpowerer : {counts.superEmpowerer}</h4>
         </div>
      

       <div className="row p-2">
         <div className="col-lg-10 mx-auto">
           <div className="card  rounded shadow border">
             <div className="card-body p-0  rounded">
               <div className="table-responsive">
                 <table className="table table-striped table-bordered ">
                   <thead className="fixed-header ">
                   <tr>
                       <th scope="col" title="Sno.">
                         Sno.
                      </th>
                     <th scope="col" title="FullName">
                         FullName
                       </th>
                       <th scope="col" title="Class">
                         Class
                       </th>
                       <th scope="col" title="Email">
                         Email
                       </th>
                       <th scope="col" title="School">
                         School
                       </th>
                       <th scope="col" title="Logins">
                         Logins
                       </th>
                       <th scope="col" title="Wellness champ">
                         Wel..Champ
                       </th>
                       <th scope="col" title="Earthivist">
                         Earthivist
                       </th>
                       <th scope="col" title="Chief Animal Office">
                         C.A.O
                       </th>
                       <th scope="col" title="Super Empowerer">
                         Sup Empow..
                       </th>
                       <th scope="col" title="">
                         Pro Motivator
                       </th>
                       <th scope="col" title="">
                         Total Posts
                       </th>
                     </tr>
                  </thead>
                  <tbody>
                    {sortedStudents.map((student, index) => (
                       <tr key={student._id}>
                       <th scope="row">{index + 1 + pagesVisited}</th>
                       <td title={student.fullName}>{student.fullName}</td>
                       <td title={student.className}>{student.className}</td>
                       <td title={student.email}>
                         {student.email.slice(0, 20)}
                       </td>
                       <td title={student.schoolName}>
                         {student.schoolName.slice(0, 10)}
                       </td>
                       <td>{student.totalLogins}</td>
                       <td>{student.wellnessChamp}</td>
                       <td>{student.earthivist}</td>
                       <td>{student.chiefAnimalOfficer}</td>
                       <td>{student.superEmpowerer}</td>
                       <td>{student.proMotivator}</td>
                       <td>{student.totalPosts}</td>
                     </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

       <div className="d-flex justify-content-center ">
         <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(
            filteredDataBySearch.length / studentsPerPage
          )}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default AllStudentsData;

// To modify the calculateCounts function to calculate the counts based on the school name, you can update it as follows:
