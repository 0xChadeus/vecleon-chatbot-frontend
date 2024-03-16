// app/api/blogposts/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const blogPostsDirectory = path.join(process.cwd(), 'public', 'blogposts');
    const fileNames = fs.readdirSync(blogPostsDirectory);
    const blogPostFileNames = fileNames.filter((fileName) => fileName.endsWith('.txt'));
    return NextResponse.json(blogPostFileNames);
  } catch (error) {
    console.error('Error reading blog posts directory:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}