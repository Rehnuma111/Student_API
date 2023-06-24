import React, { useEffect, useState } from "react";
import axios from "axios";
import app_config from "./config";
import ReactPaginate from "react-paginate";
import "./App.css";
const url = app_config.app_url;

const Demo = () => {
  const [students, setStudents] = useState([]);
  // const [searchOption, setSearchOption] = useState("");
  // const [searchValue, setSearchValue] = useState("");
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [sortField, setSortField] = useState(" ");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("Name");

  useEffect(() => {
    axios
      .get(url + "/allstudents")
      .then((response) => {
        setStudents(response.data);
        console.log(response.data);
        setTotalStudents(response.data.length);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const pagesVisited = pageNumber * studentsPerPage;
  console.log(pagesVisited);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortedStudents = [...students]
    .sort((studentA, studentB) => {
      const fieldA = sortField === "name" ? studentA.name : studentA.email;
      const fieldB = sortField === "name" ? studentB.name : studentB.email;

      if (fieldA < fieldB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    })
    .slice(pagesVisited, pagesVisited + studentsPerPage);

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSearchType(event.target.value);
  };

  // Filter the data based on the selected school
  const filteredDataBySchool = selectedSchool
    ? students.filter((item) => item.schoolName === selectedSchool)
    : students;

  // Filter the data based on the search query and type
  const filteredDataBySearch = filteredDataBySchool.filter((item) => {
    // setPageNumber(0);
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

  return (
    <>
      <div className="d-flex justify-content-center  mt-4 w-50 gap-3">
        <input
          type="text"
          className="form-control ms-2"
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

        {/* School Name dropdown */}
        <select
          className="form-select w-50"
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
      </div>
      <p>Total Students: {totalStudents}</p>
      <p>
        {selectedSchool}:{filteredDataBySchool.length}
      </p>

      <div className="container p-1 mx-auto table-container">
        <table className="table table-bordered table-striped mt-5 text-center ">
          <thead className="fixed-header">
            <tr>
              <th scope="col">Sno.</th>
              <th scope="col">FullName</th>
              <th scope="col">Class</th>
              <th scope="col">Email</th>
              <th scope="col">School</th>
              <th scope="col">Logins</th>
              <th scope="col">Wellness Champ</th>
              <th scope="col">Earthivist</th>
              <th scope="col">Chief Animal Officer</th>
              <th scope="col">Super Empowerer</th>
              <th scope="col">Pro Motivator</th>
              <th scope="col">Total Posts</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataBySearch.map((student, index) => (
              <tr key={student._id}>
                <th scope="row">{index + 1 + pagesVisited}</th>
                <td>{student.fullName}</td>
                <td>{student.className}</td>
                <td>{student.email.slice(0, 20)}</td>
                <td>{student.schoolName.slice(0, 10)}</td>
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
        {sortedStudents.length === 0 && (
          <div className="text-center mt-5">
            <p>No data found based on the search criteria.</p>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(students.length / studentsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default Demo;
