function fetchGitHubProfile() {
    const username = document.getElementById('github-username').value.trim();

    if (username === "") {
        alert("Please enter a GitHub username");
        return;
    }

    const apiUrl = `https://api.github.com/users/${username}`;

    // Make sure to clear previous results
    document.getElementById('profile').innerHTML = "<p>Loading...</p>";

    // Fetch data from GitHub API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "Not Found") {
                document.getElementById('profile').innerHTML = "<p>User not found</p>";
            } else {
                displayProfile(data);
            }
        })
        .catch(error => {
            console.error('Error fetching GitHub profile:', error);
            document.getElementById('profile').innerHTML = "<p>An error occurred. Please try again later.</p>";
        });
}

// Function to display the profile details
function displayProfile(data) {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = `
        <img src="${data.avatar_url}" alt="Profile Image" width="100">
        <h2>${data.name || data.login}</h2>
        <p>${data.bio || "No bio available"}</p>
        <p>Followers: ${data.followers} - Following: ${data.following}</p>
        <p>Public Repos: ${data.public_repos}</p>
        <a href="${data.html_url}" target="_blank">Visit Profile</a>
    `;
}
