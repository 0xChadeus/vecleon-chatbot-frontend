import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import generateUploadURL from '@/components/aws-s3';
import { s3Delete } from '@/components/aws-s3';

// Configure AWS SDK with API keys/secrets from .env
AWS.config.update({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
});

const s3 = new AWS.S3();

export async function POST(req: NextRequest) {
    const data = await req.json();
    const imageName = data.imageName;
        try {
            console.log(imageName);
            const params = ({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: imageName,
                Expires: 60
            });
            const uploadURL = s3.getSignedUrl('putObject', params);
            return NextResponse.json({'url': uploadURL});

        } catch (error) {
            console.error('Error uploading file:', error);
            return NextResponse.json({'error': 'route handler error in POST'});
        }
}

export async function DELETE(req: NextRequest) {
    const data = await req.json();
    const imageName = data.imageName;
    try {
        const params = ({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: imageName,
        });
        s3.deleteObject(params, function(err, data) {
            if (err) console.log(err, err.stack);  
            else     console.log(data);                 
        });
        return NextResponse.json({'success': 'deleted'});
    } catch (error) {
        console.error('Error deleting file:', error);
        return NextResponse.json({'error': 'route handler error in DELETE'});
    }
}
