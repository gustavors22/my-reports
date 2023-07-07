import type { AppProps } from 'next/app';
import type { Page } from '../types/types';
import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import '../styles/pages/pages.scss';
import { SessionProvider } from 'next-auth/react';
import CheckAuth from '../components/CheckAuth';

type Props = AppProps & {
    Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
    if (Component.getLayout) {
        return <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>;
    } else {
        return (
            <SessionProvider session={pageProps.session}>
                <CheckAuth>
                    <LayoutProvider>
                        <Layout>
                                <Component {...pageProps} />
                        </Layout>
                    </LayoutProvider>
                </CheckAuth>
            </SessionProvider>
        );
    }
}
