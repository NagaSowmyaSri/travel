import React, { useState, useEffect } from "react";
import { FiSearch, FiLogOut, FiChevronLeft } from "react-icons/fi";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const [image, setImage] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const fetchCalendarData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setCalendarData(data.slice(0, 30)); // Simulating 30 days in a month
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setIsAddingStory(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const changeMonth = (direction) => {
    if (direction === "prev") {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (currentMonth === 0) setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if (currentMonth === 11) setCurrentYear(currentYear + 1);
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">Travel Story</h1>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search Notes" className="search-input" />
        </div>
        <div className="user-info">
          <div className="user-avatar">DW</div>
          <div className="logout-container" onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}>
            <FiLogOut className="logout-icon" style={{ cursor: "pointer", fontSize: "24px" }} />
            <label>Logout</label>
          </div>
        </div>
      </header>

      <main className="main-content">
        {!isAddingStory ? (
          <>
            <div className="intro-message">
              <h2>Start creating your first Travel Story!</h2>
              <p>Click the add button to jot down your thoughts, ideas, and memories. Let's get started.</p>
            </div>
            <div className="calendar">
              <div className="calendar-header">
                <button onClick={() => changeMonth("prev")}>&lt;</button>
                <span>{months[currentMonth]} {currentYear}</span>
                <button onClick={() => changeMonth("next")}>&gt;</button>
              </div>
              <div className="calendar-grid">
                {calendarData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleDateClick(item.id)}
                    className={`calendar-day ${selectedDate === item.id ? "selected" : ""}`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="add-story">
            <button
              className="back-button"
              onClick={() => setIsAddingStory(false)}
            >
              <FiChevronLeft /> Back
            </button>
            <h2 className="add-story-title">Add Story</h2>
            <div className="form-group">
              <label>TITLE</label>
              <input type="text" placeholder="A Day at the Great Wall" className="input" />
            </div>
            <div className="form-group">
              <label>DATE</label>
              <input type="text" value={selectedDate ? `${selectedDate}th Sep 2024` : ""} readOnly className="input" />
            </div>
            <div className="form-group">
              <label>IMAGE</label>
              <input type="file" onChange={handleImageChange} className="input-file" />
              {image && <img src={image} alt="Selected" className="image-preview" />}
            </div>
            <textarea placeholder="Your Story" className="story-textarea"></textarea>
            <button onClick={() => setIsAddingStory(false)} className="save-story-button">
              Save Story
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
