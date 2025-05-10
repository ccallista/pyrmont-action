export const config = {
    target: 'http://localhost:5173/joinus',
    phases: [
        {duration: 60, arrivalRate: 125} //join us page can handle 125 users/second
    ]
};
export const scenarios = [
    {
        flow: [
            {get: {url: '/'}}
        ]
    }
];