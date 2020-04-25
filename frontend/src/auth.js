import { useCookies } from 'react-cookie';

// FIXME Cannot use useCookies out of a component
export const isAuth = () => {
    // const [cookies, setCookie] = useCookies();

    // return !cookies.adminToken;
    return true;
};