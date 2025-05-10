export const config = {
    target: 'http://localhost:5173/gallery',
    phases: [
        {duration: 60, arrivalRate: 100} //gallery page can handle 100 users/second
    ]
};
export const scenarios = [
    {
        flow: [
            {get: {url: '/'}}
        ]
    }
];