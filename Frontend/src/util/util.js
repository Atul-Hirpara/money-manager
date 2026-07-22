export const addThousandsSeparator = (num) => {

    if (num == null || isNaN(num)) {
        return "";
    }

    // Convert number to string
    const numStr = num.toString();

    // Split integer and decimal parts
    const parts = numStr.split(".");

    let integerPart = parts[0];
    const fractionalPart = parts[1];

    // Last 3 digits
    const lastThree = integerPart.substring(integerPart.length - 3);

    // Remaining digits
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if (otherNumbers !== "") {
        // Add comma after every 2 digits
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

        integerPart = formattedOtherNumbers + "," + lastThree;
    } else {
        integerPart = lastThree;
    }

    // Add decimal part back if present
    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};