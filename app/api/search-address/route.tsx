import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

const sessiontoken = uuidv4();

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest"
// BASE_URL+'?q='+searchText+'?language=en&limit=6&session_token='+sessiontoken+"&access_token="+process.env.MAPBOX_ACCESS_TOKEN


export async function GET(request:any) {
    const {searchParams} = new URL(request.url)
    const searchText = searchParams.get('q')
    // {console.log(sessiontoken)}
    const URLL = BASE_URL+'?q='+searchText+'?language=en&limit=10&session_token='+sessiontoken+"&country=IN&access_token="+process.env.MAPBOX_ACCESS_TOKEN
    const res = await fetch(URLL,
    {
        headers:{
            "Content-Type": "application/json"
        }
    })
    const searchResult=await  res.json();
    return NextResponse.json(searchResult)
}