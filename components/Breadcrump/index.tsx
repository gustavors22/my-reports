import React from "react";
import { BreadCrumb } from 'primereact/breadcrumb';

interface BreadcrumpItem {
    label: string;
    icon?: string;
    to?: string;
}

interface BreadcrumpProps {
    items: BreadcrumpItem[];
}

export default function Breadcrump(props: BreadcrumpProps){
    const breadcrumbHome = { icon: 'pi pi-home', to: '/', label: 'Dashboard' };
    return (
        <div>
            <BreadCrumb model={props.items} home={breadcrumbHome} />
        </div>
    )

}