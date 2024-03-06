// Function to fetch time from WorldTimeAPI
function fetchTime(selectedTimeZone, colleagueName) {
    return fetch(`http://worldtimeapi.org/api/timezone/${selectedTimeZone}`)
        .then(response => response.json())
        .then(data => {
            const gmtOffset = data.utc_offset;
            return `${colleagueName}: ${selectedTimeZone} (GMT ${gmtOffset})`;
        })
        .catch(error => {
            console.error("Error fetching GMT offset:", error);
            return null;
        });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "addColleague") {
        const selectedTimeZone = request.selectedTimeZone;
        const colleagueName = request.colleagueName;

        fetchTime(selectedTimeZone, colleagueName)
            .then(colleagueInfo => {
                sendResponse({ colleagueInfo });
            });
        
        return true; // Indicates that the response will be sent asynchronously
    }
});