export const prepareLineChartData = (transactions = []) => {

    if (!transactions.length) return [];

    const groupedData = {};

    transactions.forEach((transaction) => {

        const date = new Date(transaction.date).toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "short"
            }
        );

        if (!groupedData[date]) {
            groupedData[date] = {
                date,
                fullDate: transaction.date,
                total: 0,
                details: []
            };
        }

        groupedData[date].total += Number(transaction.amount);

        groupedData[date].details.push({
            source: transaction.categoryName,
            amount: transaction.amount
        });
    });

    // return Object.values(groupedData);
    return Object.values(groupedData).sort(
        (a, b) => new Date(a.fullDate) - new Date(b.fullDate)
    );
};