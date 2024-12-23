export function getSubName(email) {
    if (email.includes("@")) {
        return email.split("@")[0];
    }
    return "";
}

export function formatDateToMonthYear(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' }; 
    return date.toLocaleDateString('en-US', options);
}