import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error !== undefined) {
    throw result.error;
}

export const ebayHeaders = {
    Authorization: process.env.EBAY_AUTH,
    Cookie: 'route_fd70c0ed_16ee_459c_bd9d_46eecb4b8177=577ffe497406170d42be9f640928dafa; GCLB=CJqBz-GEuMXB7gE',
}
