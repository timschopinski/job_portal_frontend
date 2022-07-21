import { NextResponse} from "next/server";

const allowedParams = [
    'keyword',
    'location',
    'page',
    'education',
    'experience',
    'salary',
    'job_type'
];

console.log('xd')
export async function middleware(req) {

    const url = req.nextUrl;
    let changed = false;
    console.log('xd')

    url.searchParams.forEach((param, key) => {
        if(!allowedParams.includes(key)) {
            url.searchParams.delete(key);
            changed = true;
        }
    });

    if(changed) {
        return NextResponse.redirect(url);
    }
}

