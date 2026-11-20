// 10 Students Database
const studentsData = [
    { 
        ip: "192.168.1.101", roll: "101", name: "Aarav Sharma", course: "B.Tech CS", city: "Ghaziabad", 
        openCount: 2,
        history: [
            { device: "Dell XPS 13 (Windows 11)", time: "10:15 AM" },
            { device: "HP Pavilion (Windows 10)", time: "02:30 PM" }
        ]
    },
    { 
        ip: "192.168.1.102", roll: "102", name: "Ananya Verma", course: "BCA", city: "Noida", 
        openCount: 1,
        history: [
            { device: "MacBook Air M2 (macOS)", time: "11:05 AM" }
        ]
    },
    { 
        ip: "192.168.1.103", roll: "103", name: "Rohan Gupta", course: "B.Sc IT", city: "Delhi", 
        openCount: 2,
        history: [
            { device: "Lenovo ThinkPad T14", time: "09:20 AM" },
            { device: "Asus VivoBook 15", time: "01:10 PM" }
        ]
    },
    { 
        ip: "192.168.1.104", roll: "104", name: "Priya Singh", course: "MCA", city: "Lucknow", 
        openCount: 1,
        history: [
            { device: "Acer Aspire 5 (Windows 11)", time: "12:00 PM" }
        ]
    },
    { 
        ip: "192.168.1.105", roll: "105", name: "Kabir Khan", course: "B.Tech AI", city: "Meerut", 
        openCount: 2,
        history: [
            { device: "MacBook Pro 14 (macOS)", time: "08:50 AM" },
            { device: "Dell Inspiron 15", time: "03:15 PM" }
        ]
    },
    { 
        ip: "192.168.1.106", roll: "106", name: "Sneha Patel", course: "BBA", city: "Ahmedabad", 
        openCount: 1,
        history: [
            { device: "HP Envy x360", time: "10:40 AM" }
        ]
    },
    { 
        ip: "192.168.1.107", roll: "107", name: "Vikramaditya Joshi", course: "B.Com", city: "Pune", 
        openCount: 1,
        history: [
            { device: "Lenovo IdeaPad Slim 5", time: "01:55 PM" }
        ]
    },
    { 
        ip: "192.168.1.108", roll: "108", name: "Neha Yadav", course: "B.Tech EC", city: "Kanpur", 
        openCount: 1,
        history: [
            { device: "Asus ROG Zephyrus", time: "11:30 AM" }
        ]
    },
    { 
        ip: "192.168.1.109", roll: "109", name: "Aditya Nair", course: "B.Sc Data Science", city: "Bengaluru", 
        openCount: 1,
        history: [
            { device: "Apple MacBook Air M1", time: "09:10 AM" }
        ]
    },
    { 
        ip: "192.168.1.110", roll: "110", name: "Riya Choudhary", course: "MBA", city: "Jaipur", 
        openCount: 1,
        history: [
            { device: "Microsoft Surface Laptop 4", time: "02:05 PM" }
        ]
    }
];

let blockedDevices = [];
let activeStudent = null;

// Password Strength Checker
function checkStrength() {
    const password = document.getElementById("password").value;
    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text");
    const inputField = document.getElementById("password");
    const unlockBtn = document.getElementById("unlock-btn");

    if (password.length === 0) {
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
        inputField.style.borderColor = "#ccc";
        disableButton(unlockBtn);
        return;
    }

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "#e74c3c";
        inputField.style.borderColor = "#e74c3c";
        strengthText.textContent = "Weak Password (Low)";
        strengthText.style.color = "#e74c3c";
        disableButton(unlockBtn);
    } 
    else if (score === 3 || score === 4) {
        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "#f1c40f";
        inputField.style.borderColor = "#f1c40f";
        strengthText.textContent = "Medium Password";
        strengthText.style.color = "#d4ac0d";
        disableButton(unlockBtn);
    } 
    else {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "#2ecc71";
        inputField.style.borderColor = "#2ecc71";
        strengthText.textContent = "Strong Password - Access Granted!";
        strengthText.style.color = "#27ae60";
        
        unlockBtn.disabled = false;
        unlockBtn.classList.add("active");
    }
}

function disableButton(btn) {
    btn.disabled = true;
    btn.classList.remove("active");
}

function openAdminSearch() {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("search-page").style.display = "block";
    updateBlockedDevicesUI();
}

// Search Student by IP
function searchStudent() {
    const enteredIp = document.getElementById("ip-input").value.trim();
    const currentDevice = document.getElementById("current-device-select").value;
    const resultBox = document.getElementById("result-box");
    const errorMsg = document.getElementById("error-msg");

    if (!enteredIp) return;

    if (blockedDevices.includes(currentDevice)) {
        resultBox.style.display = "none";
        errorMsg.textContent = `Access Denied! The device "${currentDevice}" has been BLOCKED by the administrator.`;
        errorMsg.style.display = "block";
        return;
    }

    const student = studentsData.find(s => s.ip === enteredIp);

    if (!student) {
        resultBox.style.display = "none";
        errorMsg.textContent = "No student record found for this IP address.";
        errorMsg.style.display = "block";
        return;
    }

    student.openCount += 1;
    const currentTime = new Date().toLocaleTimeString();
    student.history.unshift({ device: currentDevice, time: currentTime });

    activeStudent = student;

    document.getElementById("st-roll").textContent = student.roll;
    document.getElementById("st-name").textContent = student.name;
    document.getElementById("st-course").textContent = student.course;
    document.getElementById("st-city").textContent = student.city;
    document.getElementById("st-ip").textContent = student.ip;

    resultBox.style.display = "block";
    errorMsg.style.display = "none";
}

function openStudentDashboard() {
    if (!activeStudent) return;

    document.getElementById("search-page").style.display = "none";
    document.getElementById("student-dashboard-page").style.display = "block";

    renderStudentDashboard();
}

function renderStudentDashboard() {
    document.getElementById("dash-student-name").textContent = `${activeStudent.name}'s Dashboard`;
    document.getElementById("dash-student-meta").textContent = `Roll No: ${activeStudent.roll} | Course: ${activeStudent.course} | IP: ${activeStudent.ip}`;
    document.getElementById("dash-open-count").textContent = activeStudent.openCount;

    const uniqueDevices = new Set(activeStudent.history.map(item => item.device));
    document.getElementById("dash-unique-devices").textContent = uniqueDevices.size;

    const historyContainer = document.getElementById("dash-history-list");
    let html = "";
    activeStudent.history.forEach((entry) => {
        const isBlocked = blockedDevices.includes(entry.device);
        const btnClass = isBlocked ? "btn-unblock" : "btn-block";
        const btnText = isBlocked ? "Unblock Device" : "Block Device";
        const badgeHtml = isBlocked ? `<span class="badge-blocked">BLOCKED</span>` : "";

        html += `
            <div class="history-item">
                <div class="device-info">
                    <strong>${entry.device}</strong> ${badgeHtml}<br>
                    <small style="color: #777;">Accessed at: ${entry.time}</small>
                </div>
                <button class="action-btn-small ${btnClass}" onclick="toggleDeviceBlock('${entry.device}')">${btnText}</button>
            </div>
        `;
    });
    historyContainer.innerHTML = html;
}

function toggleDeviceBlock(deviceName) {
    if (blockedDevices.includes(deviceName)) {
        blockedDevices = blockedDevices.filter(d => d !== deviceName);
    } else {
        blockedDevices.push(deviceName);
    }
    renderStudentDashboard();
}

function unblockDeviceFromAdmin(deviceName) {
    blockedDevices = blockedDevices.filter(d => d !== deviceName);
    updateBlockedDevicesUI();
}

function updateBlockedDevicesUI() {
    const container = document.getElementById("blocked-devices-container");
    if (blockedDevices.length === 0) {
        container.innerHTML = `<p style="color: #888; margin: 5px 0;">No devices are currently blocked.</p>`;
        return;
    }

    let html = "";
    blockedDevices.forEach(device => {
        html += `
            <div class="block-item">
                <span style="color: #c0392b; font-weight: bold;">${device}</span>
                <button class="action-btn-small btn-unblock" onclick="unblockDeviceFromAdmin('${device}')">Unblock</button>
            </div>
        `;
    });
    container.innerHTML = html;
}

function backToSearch() {
    document.getElementById("student-dashboard-page").style.display = "none";
    document.getElementById("search-page").style.display = "block";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("ip-input").value = "";
    updateBlockedDevicesUI();
}

function lockPortal() {
    document.getElementById("password").value = "";
    checkStrength();
    document.getElementById("ip-input").value = "";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("error-msg").style.display = "none";
    
    document.getElementById("search-page").style.display = "none";
    document.getElementById("student-dashboard-page").style.display = "none";
    document.getElementById("login-page").style.display = "block";
}