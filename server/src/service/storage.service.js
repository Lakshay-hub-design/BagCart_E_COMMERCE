const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, filename) {
    try {
        const base64 = file.toString("base64")
        const result = await imagekit.files.upload({
            file: `data:image/jpeg;base64,${base64}`,   
            fileName: filename
        });
        return result;
    } catch (err) {
        console.error("ImageKit upload error:", err);
        throw err;
    }
}

module.exports = { uploadFile };
