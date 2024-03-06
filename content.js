 // Function to fetch time from WorldTimeAPI
        function fetchTime() {
            // Get the selected time zone
            const selectedTimeZone = document.getElementById("timezone").value;

            // Fetch time data from WorldTimeAPI
            fetch(`http://worldtimeapi.org/api/timezone/${selectedTimeZone}`)
                .then(response => response.json())
                .then(data => {
                    const currentTime = data.utc_datetime;
                    const userName = document.getElementById("name").value || "User";
                    document.getElementById("current-time").innerText = `${userName}, current time in ${selectedTimeZone}: ${currentTime}`;
                })
                .catch(error => {
                    console.error("Error fetching time:", error);
                });
        }

        // Function to populate the dropdown with time zones
        function populateTimeZones() {
            const dropdown = document.getElementById("timezone");

            // Fetch time zone data from WorldTimeAPI
            fetch("http://worldtimeapi.org/api/timezone")
                .then(response => response.json())
                .then(data => {
                    // Populate the dropdown with time zones
                    data.forEach(timezone => {
                        const option = document.createElement("option");
                        option.value = timezone;
                        option.text = timezone;
                        dropdown.add(option);
                    });
                })
                .catch(error => {
                    console.error("Error fetching time zones:", error);
                });
        }

        // Function to add colleague's name, time zone, and GMT offset to the list
        function addColleague() {
            const selectedTimeZone = document.getElementById("timezone").value;
            const colleagueName = document.getElementById("name").value || "User";
            const colleagueList = document.getElementById("colleague-list");

            // Fetch GMT offset data from WorldTimeAPI
            fetch(`http://worldtimeapi.org/api/timezone/${selectedTimeZone}`)
                .then(response => response.json())
                .then(data => {
                    const gmtOffset = data.utc_offset;
                    const colleagueItem = document.createElement("li");
                    colleagueItem.innerHTML = `${colleagueName}: ${selectedTimeZone} (GMT ${gmtOffset}) <button onclick="deleteColleague(this)">Delete</button>`;
                    colleagueList.appendChild(colleagueItem);

                    // Save the updated colleague list to local storage
                    saveColleagueList();
                })
                .catch(error => {
                    console.error("Error fetching GMT offset:", error);
                });
        }

        // Function to delete a colleague from the list
        function deleteColleague(button) {
            const listItem = button.parentNode;
            const colleagueList = document.getElementById("colleague-list");
            colleagueList.removeChild(listItem);

            // Save the updated colleague list to local storage
            saveColleagueList();
        }

        // Function to save the colleague list to local storage
        function saveColleagueList() {
            const colleagueList = document.getElementById("colleague-list").innerHTML;
            localStorage.setItem("colleagues", colleagueList);
        }

        // Function to load the colleague list from local storage on page load
        function loadColleagueList() {
            const colleagueList = localStorage.getItem("colleagues");
            if (colleagueList) {
                document.getElementById("colleague-list").innerHTML = colleagueList;
            }
        }
        
        // Call the function to populate the dropdown and load the colleague list on page load
        window.onload = function () {
            populateTimeZones();
            loadColleagueList();
        };