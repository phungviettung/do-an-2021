const CLOUD_API = process.env.CLOUD_API
export const imageUpload = async (images) => {
    console.log('process.env',process.env)
    let imgArr = []
    for(const item of images){
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", "do_an_tungpv")
        formData.append("cloud_name", "tungpv")
        
        const res = await fetch(`http://api.cloudinary.com/v1_1/tungpv/image/upload`, {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr;
}