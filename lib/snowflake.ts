export function generateSnowflake() {
    const epoch = 1692995914806;
    const time = Date.now() - epoch;
    const timeBits = time.toString(2).padStart(42, '0');
    const randomBits = Math.floor(Math.random() * 2 ** 13).toString(2).padStart(13, '0');
    const snowflake = parseInt(timeBits + randomBits, 2);
    return snowflake;
}