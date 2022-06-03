
export const  handlerLogin  = (location, navigate, auth, authStore) => {

    localStorage.setItem('userId', JSON.stringify(authStore.authData));
    auth.logIn();
    //const chatPage = location.state ? location.state.from.pathname : '/';
    navigate('/', { replace: true, state: { from: location.pathname } } )

}