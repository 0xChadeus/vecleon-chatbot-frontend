import aws from 'aws-sdk'

const region = "ap-southeast-2"
const bucketName = "mychatbucket123"
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export function s3Delete(imageName) {
    const params = ({
        Bucket: bucketName,
        Key: imageName,
    });
    s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  
        else     console.log(data);                 
    });
}

export default function generateUploadURL(imageName) {

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    });
    const uploadURL = s3.getSignedUrl('putObject', params);
    return uploadURL;
}

