export const config = {
    target: 'http://localhost:5173/login',
    phases: [
        {duration: 60, arrivalRate: 125} //login page can handle 125 users/second
    ]
};
export const scenarios = [
    {
        flow: [
            {get: {url: '/'}}
        ]
    }
];