const APP_SCOPE = '';
const ROOT_SCOPE = '/'
export const ROUTES_APP = {
    RESERVATION : `${APP_SCOPE}/reservation`,
    ONE_SINGLE_PAYMENT: `${APP_SCOPE}/one-single-payment`,
    REPORT: `${APP_SCOPE}/report`,
    SELECT: `${APP_SCOPE}/select`,
    PAYMEN_RESULT: `${APP_SCOPE}/paymentresult/:status/:reason`,
    CHECKOUT: `${APP_SCOPE}/checkout`,
    SIGNIN_SIGNUP :`${APP_SCOPE}/signinsignup`,
    ROOT : ROOT_SCOPE
}