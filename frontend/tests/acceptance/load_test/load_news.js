export const config = {
    target: 'http://localhost:5173/news',
    phases: [
        {duration: 60, arrivalRate: 100} //news page can handle 100 users/second
    ]
};
export const scenarios = [
    {
        flow: [
            {get: {url: '/'}}
        ]
    }
];