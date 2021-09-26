const home = {
    name: 'Home',
    bodyClass: 'home',
    componentPath: 'home/home',
    path: '/'
};

const stream = {
    name: 'Stream',
    bodyClass: 'stream',
    componentPath: 'stream/stream',
    path: '/stream'
};


const routeError = {
    name: 'Route Error',
    componentPath: 'routeError/routeError',
    bodyClass: 'route-error'
};

const pages = {
    home,
    stream,
    routeError
};

const navItems = [
    home,
    stream
];

export {
    pages,
    navItems
}