let resumeText = "";

document.getElementById("resumeFile").addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        resumeText = e.target.result.toLowerCase();
    };

    reader.readAsText(file);
});

function analyzeResume() {

    const jobDescription = document
        .getElementById("jobDescription")
        .value
        .toLowerCase();

    const skills = [
        "python",
        "sql",
        "excel",
        "power bi",
        "tableau",
        "javascript",
        "html",
        "css",
        "react",
        "node.js",
        "data engineering",
        "etl",
        "pandas",
        "numpy",
        "aws",
        "azure",
        "spark"
    ];

    let matchedSkills = [];
    let missingSkills = [];

    skills.forEach(skill => {

        if (
            resumeText.includes(skill) &&
            jobDescription.includes(skill)
        ) {
            matchedSkills.push(skill);
        }
        else if (
            jobDescription.includes(skill) &&
            !resumeText.includes(skill)
        ) {
            missingSkills.push(skill);
        }
    });

    const matchPercentage =
        (matchedSkills.length /
            (matchedSkills.length + missingSkills.length || 1))
        * 100;

    document.getElementById("result").innerHTML = `
        <h2>Analysis Result</h2>

        <p><strong>Match Score:</strong>
        ${matchPercentage.toFixed(0)}%</p>

        <p><strong>Matched Skills:</strong></p>
        <ul>
            ${matchedSkills.map(skill => `<li>${skill}</li>`).join("")}
        </ul>

        <p><strong>Missing Skills:</strong></p>
        <ul>
            ${missingSkills.map(skill => `<li>${skill}</li>`).join("")}
        </ul>
    `;
}