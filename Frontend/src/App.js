// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import app_config from "./config";
// import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
// import ReactPaginate from "react-paginate";
// import { FaCog } from "react-icons/fa";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

// import "./App.css";
// const url = app_config.app_url;

// const App = () => {
//   const [students, setStudents] = useState([]);
//   const [sortField, setSortField] = useState(" ");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [searchOption, setSearchOption] = useState("");
//   const [searchValue, setSearchValue] = useState("");
//   const [studentsPerPage, setStudentsPerPage] = useState(10);
//   const [pageNumber, setPageNumber] = useState(0);
//   const [showSettings, setShowSettings] = useState(false);
//   const [settingsValue, setSettingsValue] = useState("");
  
//   useEffect(() => {
//     axios
//       .get(url + "/students")
//       .then((response) => {
//         setStudents(response.data);
//         console.log("response.data", response.data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []);


//   const handleSettingsOpen = () => {
//     setShowSettings(true);
//   };

//   const handleSettingsClose = () => {
//     setShowSettings(false);
//   };

//   const handleSettingsSave = () => {
//     // Perform any necessary actions with the settings value
//     console.log("Settings value:", settingsValue);

//     // Close the settings popup
//     setShowSettings(false);
//   }; 

//   const pagesVisited = pageNumber * studentsPerPage;
//   console.log(pagesVisited);

//   const handleSort = (field) => {
//     if (field === sortField) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortOrder("asc");
//     }
//   };

//   const handleSearchOptionChange = (event) => {
//     setSearchOption(event.target.value);
//   };

//   const handleSearch = () => {
//     setPageNumber(0);

//     const filteredStudents = students.filter((student) => {
//       let field = "";
//       if (searchOption === "name") {
//         field = student.name.toLowerCase();
//       } else if (searchOption === "email") {
//         field = student.email.toLowerCase();
//       }
//       return field.includes(searchValue.toLowerCase());
//     });

//     setStudents(filteredStudents);

   
//   };

//   const handleStudentsPerPageChange = (event) => {
//     const selectedValue = parseInt(event.target.value);
//     setStudentsPerPage(selectedValue);
//     setPageNumber(0); // Reset the page number when changing the students per page
//   };
  

//   const handlePageChange = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   const sortedStudents = [...students]
//     .sort((studentA, studentB) => {
//       const fieldA = sortField === "name" ? studentA.name : studentA.email;
//       const fieldB = sortField === "name" ? studentB.name : studentB.email;

//       if (fieldA < fieldB) {
//         return sortOrder === "asc" ? -1 : 1;
//       }
//       if (fieldA > fieldB) {
//         return sortOrder === "asc" ? 1 : -1;
//       }
//       return 0;
//     })
//     .slice(pagesVisited, pagesVisited + studentsPerPage);

//   return (
//     <div>
//       <div className="d-flex justify-content-center  mt-4 w-50 gap-3">
//         <input
//           type="text"
//           className="form-control ms-2"
//           placeholder={`Search by ${searchOption}`}
//           value={searchValue}
//           onChange={(event) => setSearchValue(event.target.value)}
//         />
//         <button className="btn btn-primary ms-2 w-25 " onClick={handleSearch}>
//           Search
//         </button>
//         <select
//           className="form-select w-25"
//           value={searchOption}
//           onChange={handleSearchOptionChange}
//         >
//           <option value="name">Name</option>
//           <option value="email">Email</option>
//         </select>
//         <FaCog className="settings-icon" size={30} onClick={handleSettingsOpen} />
//       </div>
//       <Modal show={showSettings} onHide={handleSettingsClose} >
//         <Modal.Header closeButton>
//           {/* <Modal.Title>Enter value </Modal.Title>  */}
//         </Modal.Header>
//         <Modal.Body>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter value"
//             // value={settingsValue}
//             // onChange={handleStudentsPerPageChange}
//             // onChange={(event) => setSettingsValue(event.target.value)}
            
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleSettingsClose}>
//             Close
//           </Button>
//           <Button variant="primary"   onChange={handleStudentsPerPageChange} >
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <div className="container p-1 mx-auto table-container">
//         <table className="table table-bordered table-striped mt-5 text-center ">
//           <thead className="fixed-header">
//             <tr>
//               <th scope="col">Sno.</th>
//               <th scope="col" onClick={() => handleSort("name")}>
//                 Name{" "}
//                 {sortField === "name" && (
//                   <>
//                     {sortOrder === "asc" ? (
//                       <FaSortAlphaDown size={20} />
//                     ) : (
//                       <FaSortAlphaUp size={20} />
//                     )}
//                   </>
//                 )}
//               </th>
//               <th scope="col" onClick={() => handleSort("email")}>
//                 Email{" "}
//                 {sortField === "email" && (
//                   <>
//                     {sortOrder === "asc" ? (
//                       <FaSortAlphaDown size={20} />
//                     ) : (
//                       <FaSortAlphaUp size={20} />
//                     )}
//                   </>
//                 )}
//               </th>
//               <th scope="col">PhoneNo</th>
//               <th scope="col">ClassName</th>
//               <th scope="col" onClick={() => handleSort("grade")}>
//                 Grade{" "}
//                 {sortField === "grade" && (
//                   <>
//                     {sortOrder === "asc" ? (
//                       <FaSortAlphaDown size={20} />
//                     ) : (
//                       <FaSortAlphaUp size={20} />
//                     )}
//                   </>
//                 )}
//               </th>
//               <th scope="col">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedStudents.map((student, index) => (
//               <tr key={student._id}>
//                 {/* {console.log("pagesVisited " , pagesVisited)}  */}
//                 <th scope="row">{index + 1 + pagesVisited}</th>
//                 <td>{student.name}</td>
//                 <td>{student.email}</td>
//                 <td>{student.phoneNo}</td>
//                 <td>{student.className}</td>
//                 <td>{student.grade}</td>
//                 <td>{student.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {sortedStudents.length === 0 && (
//           <div className="text-center mt-5">
//             <p>No data found based on the search criteria.</p>
//           </div>
//         )}
//       </div>

//       <div className="d-flex justify-content-center">
//         <ReactPaginate
//           previousLabel={"Previous"}
//           nextLabel={"Next"}
//           breakLabel={"..."}
//           breakClassName={"break-me"}
//           pageCount={Math.ceil(students.length / studentsPerPage)}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageChange}
//           containerClassName={"pagination"}
//           subContainerClassName={"pages pagination"}
//           activeClassName={"active"}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import AllStudentsData from './AllStudentsData';


const App = () => {
  return (
    <>
    <AllStudentsData/>
    {/* <Demo2 /> */}
    </>
  )
}

export default App