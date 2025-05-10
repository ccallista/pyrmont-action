export const config = {
    target: 'http://localhost:5173/about',
    phases: [
        { duration: 60, arrivalRate: 100 } // about us page can only handle 100 users/second
    ]
};
export const scenarios = [
    {
        flow: [
            { get: { url: '/' } } // Simulate a GET request to the homepage
        ]
    }
];
