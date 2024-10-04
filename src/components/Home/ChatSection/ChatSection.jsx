import "./ChatSection.css";
import { useEffect, useState } from "react";
import axios from "axios";
import headericon from "./images/AI Generate-icon.svg";
import searchbtn from "./images/Generate B.svg";
import ChatBotHome from "./chatBotHome/ChatBotHome";
import akiraIcon from "./images/akira-icon.svg";
import LoadingBar from "../../DataSetFlow/LoadingBar/LoadingBar";
import dropdownIcon from "./images/dropdown.svg";
import dropupIcon from "./images/dropupIcon.svg";

function ChatMessage({ message, isUser }) {
  const username = localStorage.getItem("username");
  if (username) {
    var firstChar = username.slice(0, 1);
  }
  return (
    <>
      {isUser ? (
        <div className="user-message">
          <div className="user-icon">{firstChar}</div>
          <p>{message}</p>
        </div>
      ) : (
        <div className="bot-message">
          <img src={akiraIcon} alt="" style={{ width: "30px" }} />
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default function ChatSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [dataset, setDataset] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [filteredDropdownData, setFilteredDropdownData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [displayname, setDisplayname] = useState("");

  const FormData = require("form-data");
  let formdata = new FormData();
  var fileid = localStorage.getItem("fileid");
  var userid = localStorage.getItem("userid");

  useEffect(() => {
    var dropdownlistdata = localStorage.getItem("dataSourceTableData");
    const parsedData = JSON.parse(dropdownlistdata) || [];
    setDropdownData(parsedData);
    setFilteredDropdownData(parsedData);
    setDisplayname(localStorage.getItem("display_name") || "");
  }, []);

  async function handleSearchAI(e) {
    e.preventDefault();
    setIsLoading(true);
    setFlag(true);
    try {
      formdata.append("query", searchQuery);
      formdata.append("user_id", userid);
      formdata.append("file_id", fileid);
      const response = await axios.post(
        `https://data-quality-ai-backend.lab.neuralcompany.team/query/conversation_id/0`,
        formdata,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const newMessage = { text: searchQuery, isUser: true };
      const botResponse = {
        text: response.data.response.output,
        isUser: false,
      };
      setChatHistory((prevHistory) => [
        ...prevHistory,
        newMessage,
        botResponse,
      ]);

      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const EnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSearchAI(e);
    }
  };

  const handleDropdown = () => {
    setActiveDropdown(!activeDropdown);
    if (!activeDropdown) {
      setFilteredDropdownData(dropdownData);
    }
  };

  const handleDatasetSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setDataset(searchTerm);
    const filtered = dropdownData.filter(
      (item) =>
        item &&
        item.display_name &&
        item.display_name.toLowerCase().includes(searchTerm)
    );
    setFilteredDropdownData(filtered);
  };

  const handleDropdownAPI = (name, id) => {
    setDisplayname(name);
    localStorage.setItem("display_name", name);
    localStorage.setItem("fileid", id);
    setActiveDropdown(false);
    window.location.reload(false);
  };

  return (
    <div className="chat-section">
      <div className="header">
        <div className="header-left-content">
          <p>Databot</p>
          <img src={headericon} alt="img" />
        </div>
        <div className="header-right-content">
          <p>Connected Data : </p>
          <div className="dropdown-list" onClick={handleDropdown}>
            <p>{displayname}</p>
            {activeDropdown ? (
              <img src={dropupIcon} alt="" />
            ) : (
              <img src={dropdownIcon} alt="" />
            )}
          </div>
          {activeDropdown && (
            <div className="active-dropdown">
              <div>
                <div className="chat-section-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search Data"
                    value={dataset}
                    onChange={handleDatasetSearch}
                  />
                </div>
                {filteredDropdownData.map((value, index) =>
                  value && value.display_name ? (
                    <div key={index}>
                      <p
                        onClick={() =>
                          handleDropdownAPI(value.display_name, value.file_id)
                        }
                      >
                        {value.display_name}
                      </p>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chat-section-wrapper">
        <div className="chat-section-body">
          {flag ? (
            <div className="chat-history">
              {chatHistory.length === 0 ? (
                <div className="chat-section-loading-bar">
                  <LoadingBar />
                </div>
              ) : (
                chatHistory.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message.text}
                    isUser={message.isUser}
                  />
                ))
              )}
            </div>
          ) : (
            <ChatBotHome />
          )}
        </div>

        <div className="chat-section-search-query-wrapper">
          <form onSubmit={handleSearchAI}>
            <textarea
              onKeyDown={EnterPress}
              type="text"
              name="search-query"
              id="search-query"
              placeholder="Ask your AI for data summary..."
              value={searchQuery}
              required
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="search-query-btn"
              type="submit"
              disabled={isLoading}
            >
              <img src={searchbtn} alt="btn" /> <p>Search</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// import "./ChatSection.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import headericon from "./images/AI Generate-icon.svg";
// import searchbtn from "./images/Generate B.svg";
// import ChatBotHome from "./chatBotHome/ChatBotHome";
// import akiraIcon from "./images/akira-icon.svg";
// import LoadingBar from "../../DataSetFlow/LoadingBar/LoadingBar";
// import dropdownIcon from "./images/dropdown.svg";

// function ChatMessage({ message, isUser }) {
//   const username = localStorage.getItem("username");
//   if (username) {
//     var firstChar = username.slice(0, 1);
//   }
//   return (
//     <>
//       {isUser ? (
//         <div className="user-message">
//           <div className="user-icon">{firstChar}</div>
//           <p>{message}</p>
//         </div>
//       ) : (
//         <div className="bot-message">
//           <img src={akiraIcon} alt="" style={{ width: "30px" }} />
//           <p>{message}</p>
//         </div>
//       )}
//     </>
//   );
// }

// export default function ChatSection() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [dataset, setDataset] = useState();
//   const [activeDropdown, setActiveDropdown] = useState(false);
//   const [dropdownData, setDropdownData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [flag, setFlag] = useState(false);
//   const [displayname, setDisplayname] = useState();

//   const FormData = require("form-data");
//   let formdata = new FormData();
//   var fileid = localStorage.getItem("fileid");
//   var userid = localStorage.getItem("userid");

//   useEffect(() => {
//     var dropdownlistdata = localStorage.getItem("dataSourceTableData");
//     setDropdownData(JSON.parse(dropdownlistdata));
//     setDisplayname(localStorage.getItem("display_name"));
//   }, []);

//   async function handleSearchAI(e) {
//     e.preventDefault();
//     setIsLoading(true);
//     setFlag(true);
//     try {
//       formdata.append("query", searchQuery);
//       formdata.append("user_id", userid);
//       formdata.append("file_id", fileid);
//       const response = await axios.post(
//         `https://data-quality-ai-backend.lab.neuralcompany.team/query/conversation_id/0`,
//         formdata,
//         {
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         }
//       );
//       const newMessage = { text: searchQuery, isUser: true };
//       const botResponse = {
//         text: response.data.response.output,
//         isUser: false,
//       };
//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         newMessage,
//         botResponse,
//       ]);

//       setSearchQuery("");
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const EnterPress = (e) => {
//     if (e.keyCode === 13 && e.shiftKey === false) {
//       e.preventDefault();
//       handleSearchAI(e);
//     }
//   };

//   const handleDropdown = () => {
//     if (activeDropdown === false) {
//       setActiveDropdown(true);
//     } else {
//       setActiveDropdown(false);
//     }
//   };
//   const handleDropdownAPI = ({ name, id }) => {
//     setDisplayname(name);
//   };

//   return (
//     <div className="chat-section">
//       <div className="header">
//         <div className="header-left-content">
//           <p>Databot</p>
//           <img src={headericon} alt="img" />
//         </div>
//         <div className="header-right-content">
//           <p>Connected Data : </p>
//           <div className="dropdown-list" onClick={handleDropdown}>
//             <p> {displayname}</p>
//             <img src={dropdownIcon} alt="" />
//           </div>
//           {activeDropdown ? (
//             <>
//               <div className="active-dropdown">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Search Data"
//                     value={dataset}
//                     onChange={(e) => setDataset(e.target.value)}
//                   />
//                   {dataset ? (
//                     <></>
//                   ) : (
//                     dropdownData?.map((value, index) => (
//                       <div key={index}>
//                         <p
//                           onClick={handleDropdownAPI(
//                             value?.display_name,
//                             value?.file_id
//                           )}
//                         >
//                           {value?.display_name}
//                         </p>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//       <div className="chat-section-wrapper">
//         <div className="chat-section-body">
//           {flag ? (
//             <div className="chat-history">
//               {chatHistory.length === 0 ? (
//                 <>
//                   <div className="chat-section-loading-bar">
//                     <LoadingBar />
//                   </div>
//                 </>
//               ) : (
//                 chatHistory.map((message, index) => (
//                   <ChatMessage
//                     key={index}
//                     message={message.text}
//                     isUser={message.isUser}
//                   />
//                 ))
//               )}
//             </div>
//           ) : (
//             <ChatBotHome />
//           )}
//         </div>

//         <div className="chat-section-search-query-wrapper">
//           <form onSubmit={handleSearchAI}>
//             <textarea
//               onKeyDown={EnterPress}
//               type="text"
//               name="search-query"
//               id="search-query"
//               placeholder="Ask your AI for data summary..."
//               value={searchQuery}
//               required
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button
//               className="search-query-btn"
//               type="submit"
//               disabled={isLoading}
//             >
//               <img src={searchbtn} alt="btn" /> <p>Search</p>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
