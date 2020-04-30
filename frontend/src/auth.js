import { useCookies } from 'react-cookie';

// FIXME Cannot use useCookies out of a component
// Redux or Context API could be a solution
export const isAuth = () => {
    // const [cookies, setCookie] = useCookies();

    // return !cookies.adminToken;
    return true;
};