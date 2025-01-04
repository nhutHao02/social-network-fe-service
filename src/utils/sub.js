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

export function formatTimeFromNow(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now - inputDate;

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds <= 30) {
      return "1m ago";
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 31) {
      return `${diffInDays}d ago`;
    } else {
      const day = inputDate.getDate().toString().padStart(2, "0");
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
      const year = inputDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
}