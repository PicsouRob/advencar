
/**
 * convert a number to a formatted string with $RD pesos
 * @param amount 
 * @returns the formatted amount in $RD pesos
 */
export const formatMoney = (amount: number): string => {
    return "RD$ " + amount.toLocaleString("en-US", {
        style: "decimal",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
