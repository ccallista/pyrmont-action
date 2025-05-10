export const config = {
    target: 'http://localhost:5173/contact',
    phases: [
        {duration: 60, arrivalRate: 125} //contact page can handle 125 users/second
    ]
};
export const scenarios = [
    {
        flow: [
            {get: {url: '/'}}
        ]
    }
];