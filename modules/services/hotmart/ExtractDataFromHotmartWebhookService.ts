const events = {
    purchase: [
        'PURCHASE_APPROVED',
        'PURCHASE_CANCELED',
        'PURCHASE_EXPIRED',
        'PURCHASE_CHARGEBACK',
    ],
    outOfCart: 'PURCHASE_OUT_OF_SHOPPING_CART',
}

class ExtractDataFromHotmartWebhookService {
    public handler(payload: any): any {
        let data = {}

        if(events.purchase.includes(payload?.event)) {
            data = this.getDataFromPurchaseEvents(payload.data)
        }

        if(events.outOfCart === payload?.event) {
            data = this.getDataFromOutOfCartEvents(payload.data)
        }

        return {
            id: payload?.id,
            event: payload?.event,
            ...data
        }
    }

    private getDataFromPurchaseEvents(data: any): any {
        const product = data?.product
        const commissions = data?.commissions
        const producer = data?.producer
        const buyer = data?.buyer
        const order = {
            code: data?.purchase?.offer?.code,
            orderDate: new Date(data?.purchase?.order_date),
            approvedDate: new Date(data?.purchase?.approved_date),
            status: data?.purchase?.status,
            full_price: data?.purchase?.full_price.value,
            price: data?.purchase?.price.value,
        }

        return {
            product,
            commissions,
            producer,
            buyer,
            order,
        }
    }

    private getDataFromOutOfCartEvents(data: any): any {
        const product = data?.product
        const buyer = data?.buyer
        const offer = data?.offer

        return {
            product,
            buyer,
            offer,
        }
    }

}

export default new ExtractDataFromHotmartWebhookService();