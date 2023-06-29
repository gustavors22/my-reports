import { useSession } from "next-auth/react";
import React from "react";
import Image from 'next/image';
import loadingGif from '../public/layout/images/loading.gif';
import { useRouter } from "next/router";

export default function CheckAuth(props: any): JSX.Element {
    const session = useSession();
    const router = useRouter();

    const renderLoading = () => {
        return (
            <div className="loading-img-container">
                <p className="loading-img-text">Loading...</p>
                <Image className="loading-img" src={loadingGif} alt="loading" />
            </div>
        )
    }

    if (session.status === 'loading') {
        return renderLoading();
    }

    if (session.status === 'unauthenticated') {
        router.push('/auth/login');
    }
    
    return props.children;
}