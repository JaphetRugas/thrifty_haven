import { NextRequest, NextResponse } from 'next/server';

interface Props {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { id } = params;



        return NextResponse.json(
            { status: 200 }
        );
    } catch (error) {
        console.error('Error checking product:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}