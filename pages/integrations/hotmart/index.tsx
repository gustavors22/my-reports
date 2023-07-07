import React, { useEffect, useState } from 'react';
import Breadcrump from '../../../components/Breadcrump';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function Hotmart() {
    const [webhookLink, setWebhookLink] = useState<string>('');

    useEffect(() => {
        setWebhookLink("https://teste.com/webhook.com")
    }, [])

    const onCopyBtnClickHandle = () => {
        navigator.clipboard.writeText(webhookLink)
        alert("Link copiado")
    }

    return (
        <>
            <div className='page-container'>
                <Breadcrump items={[{ label: 'Integrações', to: '/integrations' }, { label: 'Hotmart' }]} />
                <div className="card p-fluid">
                    <h5>Link do Webhook</h5>
                    <div className="field">
                            <InputText id="name2" type="text" disabled={true} value={webhookLink}/>
                    </div>
                    <div className="field">
                            <Button label='Copiar' onClick={onCopyBtnClickHandle}/>
                    </div>
                </div>
                <div className="grid">
                    <div className="col-12">
                        <div className="card">
                            <h5>Filter Menu</h5>
                            <DataTable
                                value={[]}
                                paginator
                                className="p-datatable-gridlines"
                                showGridlines
                                rows={10}
                                dataKey="id"
                                // filters={[{ field: 'country.name', value: 'United States' }]}
                                filterDisplay="menu"
                                loading={false}
                                responsiveLayout="scroll"
                                emptyMessage="No data found."
                                header={(
                                    <div className="table-header">
                                        Vendas Hotmart
                                    </div>
                                )}
                            >
                                <Column field="product" header="Produto" filter filterPlaceholder="Pesquisar por Produto" style={{ minWidth: '12rem' }} />
                                <Column header="Produtor" filterField="producer" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by producer" filterClear={[]} filterApply={[]} />
                                <Column header="Email do Produtor" filterField="producer_email" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by producer" filterClear={[]} filterApply={[]} />
                                <Column header="Comprador" filterField="buyer" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by buyer" filterClear={[]} filterApply={[]} />
                                <Column header="Email do Comprador" filterField="buyer_email" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by buyer" filterClear={[]} filterApply={[]} />
                                <Column field="product_value" header="Valor do produto" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={[]} filter filterElement={[]} />
                                <Column header="Data" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={[]} filter filterElement={[]} />
                                <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={[]} filter filterElement={[]} />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}