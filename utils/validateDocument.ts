
/**
 * Valid a document id in Dominican Republic using Luhn algorithm or modul 10.
 * @param documentId The document id to validate.
 * @returns True if the document id is valid, false otherwise.
 */
export const isValidDocumentId = (documentId: string): boolean => { 
    const cleanDocumentId: string = documentId.replace(/-/g, "");
    
    if (cleanDocumentId.length !== 11 || !/^\d{11}$/.test(cleanDocumentId)) {
        return false;
    }

    const multipliers: number[] = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    const checkDigit: number = parseInt(cleanDocumentId.slice(-1));

    let total: number = 0;

    for (let i: number = 9; i >= 0; i--) {
        const digit = parseInt(cleanDocumentId.charAt(i));
        let product = digit * multipliers[i];

        if (product > 9) {
            product -= 9;
        }

        total += product;
    }

    const lastDigitOfTotal: number = parseInt(total.toString().slice(-1));
    const expectedCheckDigit = lastDigitOfTotal > 0 ? 10 - lastDigitOfTotal : 0;

    return expectedCheckDigit === checkDigit;
}

/**
 * Valid a credit card number in Dominican Republic using Luhn algorithm or modul 10.
 * @param creditCard The credit card number to validate.
 * @returns True if the credit card number is valid, false otherwise.
 */
export const isValidCreditCard = (creditCard: string): boolean => {
    const cleanNumber: string = creditCard.replace(/\D/g, "");

    if(cleanNumber.length < 13 || cleanNumber.length > 19) {
        return false;
    }

    let sum = 0;
    let alternate = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let currentDigit = parseInt(cleanNumber[i], 10);

        if (alternate) {
            currentDigit *= 2;

            if (currentDigit > 9) {
                currentDigit -= 9;
            }
        } 

        sum += currentDigit;
        alternate = !alternate;
    }

    return sum % 10 === 0;
}