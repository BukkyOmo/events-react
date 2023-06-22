const FormatDate = (date1) => {
    let date_1 = new Date(date1)
    let date_2 = new Date();

    let difference_in_time = date_2.getTime() - date_1.getTime();
    let difference_in_days = Math.ceil(difference_in_time / (1000 * 3600 * 24));

    if (difference_in_days === 1) {
        return 'Today'
    }

    return `${difference_in_days} days ago`;
}

export default FormatDate;
